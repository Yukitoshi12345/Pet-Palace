// import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe has not loaded yet!');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
      alert(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      // Call your backend to process the payment
      processPayment(paymentMethod.id);
    }
  };

  const processPayment = async (paymentMethodId) => {
    const response = await fetch('/api/create-charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId,
        amount: 2000, // Example amount in cents ($20.00)
      }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      console.log('Payment successful:', responseData);
      alert('Payment successful!');
    } else {
      console.error('Payment failed:', responseData.message);
      alert('Payment failed: ' + responseData.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
