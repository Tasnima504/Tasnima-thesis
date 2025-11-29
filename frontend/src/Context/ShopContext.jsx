import { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";

export const ShopContext =  createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    useEffect(()=>{
        // Try to fetch from backend, fallback to local data
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>{
            if(data && data.length > 0) {
                // Backend data available
                console.log("Using backend data");
            }
        })
        .catch((error)=>{
            console.log("Backend not available, using local data");
        });

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
            method: 'POST',
            headers: {
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body: "",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data))
            .catch((error)=>console.log("Cart sync failed:", error));
        }
    },[])
    
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error)=>console.log("Add to cart failed:", error));
        }
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
            .catch((error)=>console.log("Remove from cart failed:", error));
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      }

      const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;