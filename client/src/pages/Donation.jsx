import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';

// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
// const stripePromise = loadStripe(stripePublicKey);

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [donate] = useMutation(ADD_DONATION);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    const stripe = await stripePromise;

    try {
      const { data } = await donate({ variables: { amount: parsedAmount } });
      window.location = `https://checkout.stripe.com/pay/${data.donate}`;
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('Failed to process donation. Please try again later.');
    }
  };

  return (
    <div className='section'>
      <h2>Donate Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount"
          aria-label="Donation amount"
          required
        />
        <button type="submit">Proceed to Payment</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default DonationPage;
