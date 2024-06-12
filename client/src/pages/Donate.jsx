import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { DONATE_AMOUNT } from '../utils/mutations';

const STRIPE_KEY = import.meta.env.PUBLISHABLE_KEY_STRIPE;

const Donate = () => {
  const [donateAmount, { error }] = useMutation(DONATE_AMOUNT);

  const handleDonate = async (amount) => {
    if (amount) {
      try {
        const stripe = await loadStripe(STRIPE_KEY);
        const { data } = await donateAmount({
          variables: {
            amount: '' + amount,
          },
        });
        await stripe.redirectToCheckout({
          sessionId: data?.donateAmount?.id,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-6">Donate Amount</h2>
        {error && (
          <p className="text-red-500 text-center mb-4">Error during donation. Please try again later.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-6 border rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold mb-4">Donation Amount</h3>
            <p className="text-lg mb-4 text-black">Donate $5</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleDonate(5)}
            >
              Donate
            </button>
          </div>
          <div className="card p-6 border rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold mb-4">Donation Amount</h3>
            <p className="text-lg mb-4 text-black">Donate $10</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleDonate(10)}
            >
              Donate
            </button>
          </div>
          <div className="card p-6 border rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold mb-4">Donation Amount</h3>
            <p className="text-lg mb-4 text-black">Donate $15</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleDonate(15)}
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
