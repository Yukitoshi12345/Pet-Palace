import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION } from '../../utils/mutations';
import { donation } from '../../data';

const DonationBtn = () => {
  const [createCheckoutSession, { data, loading, error }] = useMutation(
    CREATE_CHECKOUT_SESSION,
  );

  const handleDonateClick = async () => {
    try {
      // Example: Assuming you're passing the amount and message as fixed values or from state
      const amount = 5000; // $50.00, assuming amount is in cents
      const message = 'Thanks for your support!';
      const { data } = await createCheckoutSession({
        variables: { amount, message },
      });

      // Redirect to Stripe checkout
      if (data.createCheckoutSession.session) {
        window.location.href = `https://checkout.stripe.com/pay/${data.createCheckoutSession.session}`;
      } else {
        console.error('No session ID returned');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <NavLink to="/donate"> {/* Replace 'to' attribute with the donate page route */}
      <button className="btn btn-accent capitalize" onClick={handleDonateClick}>
        {donation.icon}
        {donation.btnTitle}
      </button>
    </NavLink>
  );
};

export default DonationBtn;
