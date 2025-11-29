import { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItems.css'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    const [customerInfo, setCustomerInfo] = useState({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    const [showCheckout, setShowCheckout] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInputChange = (e) => {
      setCustomerInfo({
        ...customerInfo,
        [e.target.name]: e.target.value
      });
    };

    const handleProceedToCheckout = () => {
      if (getTotalCartAmount() === 0) {
        alert('Your cart is empty!');
        return;
      }
      setShowCheckout(true);
    };

    const handlePayment = async () => {
      if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
        alert('Please fill in all required fields!');
        return;
      }

      setIsProcessing(true);

      try {
        const cartProducts = all_product
          .filter(item => cartItems[item.id] > 0)
          .map(item => `${item.name} (x${cartItems[item.id]})`).join(', ');

        const paymentData = {
          total_amount: getTotalCartAmount(),
          cus_name: customerInfo.name,
          cus_email: customerInfo.email,
          cus_phone: customerInfo.phone,
          cus_add1: customerInfo.address || 'Dhaka',
          product_name: cartProducts,
          product_category: 'E-commerce',
        };

        const response = await fetch('http://localhost:4000/init-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        const data = await response.json();

        if (data.status === 'success' && data.url) {
          window.location.href = data.url;
        } else {
          alert('Payment initialization failed. Please try again.');
          setIsProcessing(false);
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('An error occurred. Please try again.');
        setIsProcessing(false);
      }
    };
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
            return <div>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.image} alt="" className='carticon-product-icon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                        </div>
                        <hr />
                    </div>
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>cart Totals</h1>
            <div>
                <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            
            {!showCheckout ? (
              <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
            ) : (
              <div className="checkout-form">
                <h2>Customer Information</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  rows="3"
                />
                <button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="payment-button"
                >
                  {isProcessing ? 'Processing...' : 'PAY WITH SSLCommerz'}
                </button>
                <button onClick={() => setShowCheckout(false)} className="cancel-button">
                  Cancel
                </button>
              </div>
            )}
        </div>
        <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
