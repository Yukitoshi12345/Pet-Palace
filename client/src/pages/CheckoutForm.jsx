import React, { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // You would send the paymentMethod.id to your server here!
      console.log(paymentMethod);
      // Handle server response here
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-payment-form">
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        Pay
      </button>
      {error && <div className="card-error">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
