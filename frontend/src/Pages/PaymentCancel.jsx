import { useNavigate, useSearchParams } from 'react-router-dom';
import './CSS/PaymentStatus.css';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tranId = searchParams.get('tranId');

  return (
    <div className='payment-status'>
      <div className="payment-status-container cancel">
        <div className="icon-circle cancel-circle">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1>Payment Cancelled</h1>
        <p>You have cancelled the payment</p>
        <p className="transaction-id">Transaction ID: {tranId}</p>
        <p className="cancel-message">
          Your payment was cancelled. No charges have been made to your account.
        </p>
        <div className="button-group">
          <button onClick={() => navigate('/cart')} className="btn-primary">Return to Cart</button>
          <button onClick={() => navigate('/')} className="btn-secondary">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
