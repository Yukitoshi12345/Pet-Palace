import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { donation } from '../../data';

const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession($amount: Int!, $message: String) {
    createCheckoutSession(amount: $amount, message: $message) {
      session
    }
  }
`;

const DonationBtn = () => {
  const [createCheckoutSession, { data, loading, error }] = useMutation(
    CREATE_CHECKOUT_SESSION,
  );

  const handleDonateClick = async () => {
    try {
      // Example: Set a fixed amount or retrieve from user input or context
      const amount = 5000; // amount in cents ($50.00)
      const message = 'Thanks for your support!';
      const response = await createCheckoutSession({
        variables: { amount, message },
      });

      // Redirect to Stripe checkout
      if (response.data.createCheckoutSession.session) {
        window.location.href = `https://checkout.stripe.com/pay/${response.data.createCheckoutSession.session}`;
      } else {
        console.error('No session ID returned');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <button className="btn btn-accent capitalize" onClick={handleDonateClick}>
      {donation.icon}
      {donation.btnTitle}
    </button>
  );
};

export default DonationBtn;
