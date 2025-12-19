import React from 'react';
import './PaymentMethod.css';

const PaymentMethod = ({ selectedMethod, onMethodChange }) => {
  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Credit Card',
      icon: '💳',
      description: 'Pay with Visa, Mastercard, or American Express'
    },
    {
      id: 'debit_card',
      name: 'Debit Card',
      icon: '💳',
      description: 'Pay with your debit card'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: '📱',
      description: 'Pay using UPI apps like Paytm, Google Pay, PhonePe'
    },
    {
      id: 'net_banking',
      name: 'Net Banking',
      icon: '🏦',
      description: 'Pay through your bank account'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: '👛',
      description: 'Pay using digital wallets'
    }
  ];

  return (
    <div className="payment-method">
      <h3>Select Payment Method</h3>
      <div className="payment-options">
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`payment-option ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => onMethodChange(method.id)}
          >
            <div className="payment-icon">{method.icon}</div>
            <div className="payment-details">
              <h4>{method.name}</h4>
              <p>{method.description}</p>
            </div>
            <div className="payment-radio">
              <div className={`radio-circle ${selectedMethod === method.id ? 'checked' : ''}`}>
                {selectedMethod === method.id && <div className="radio-dot"></div>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedMethod && (
        <div className="payment-note">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;