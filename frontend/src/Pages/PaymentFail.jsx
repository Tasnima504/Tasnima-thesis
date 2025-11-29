import { useNavigate, useSearchParams } from 'react-router-dom';
import './CSS/PaymentStatus.css';

const PaymentFail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get('tranId');

  return (
    <div className='payment-status'>
      <div className="payment-status-container fail">
        <div className="icon-circle fail-circle">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1>Payment Failed</h1>
        <p>We couldn't process your payment</p>
        <p className="transaction-id">Transaction ID: {tranId}</p>
        <p className="fail-message">
          Your payment was not successful. Please try again or use a different payment method.
        </p>
        <div className="button-group">
          <button onClick={() => navigate('/cart')} className="btn-primary">Return to Cart</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
