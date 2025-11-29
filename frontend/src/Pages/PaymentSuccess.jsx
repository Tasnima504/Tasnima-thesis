import { useNavigate, useSearchParams } from 'react-router-dom';
import './CSS/PaymentStatus.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get('tranId');

  return (
    <div className='payment-status'>
      <div className="payment-status-container success">
        <div className="icon-circle success-circle">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase</p>
        <p className="transaction-id">Transaction ID: {tranId}</p>
        <p className="success-message">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <div className="button-group">
          <button onClick={() => navigate('/')} className="btn-primary">Continue Shopping</button>
          <button onClick={() => navigate('/orders')} className="btn-secondary">View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
