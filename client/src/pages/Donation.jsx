import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm/index';
import { Elements } from '@stripe/react-stripe-js';

const publishableKey =
  'pk_test_51P8fzOP8oR1gIlWHcY2SE0w0DUHQfWcrTpjyyRwxvvxmshjHFf7pKFFT22jDQ5uYVOkvM0yQQnDch5AkF7Cj8qOB00HelqLVDV';

const Donation = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('/config').then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      setClientSecret(clientSecret);
      return r;
    });
  }, []);

  return (
    <div className="flex flex-col-2">
      <div className="text-center">
        <h1 className="text-2xl m-5">How much would you like to give?</h1>
        <div>
          <form className="flex flex-col gap-4 ml-6 mb-2 border-gray-200 rounded-lg">
            <div>
              <div className="m-2 block">
                <label htmlFor="donation" value="Donation amount" />
              </div>
              <input
                className="rounded-md border-gray-200"
                id="donation"
                type="number"
                name="price"
                placeholder="$25.00"
                required={true}
              />
            </div>
          </form>
        </div>
      </div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

// const Donation = () => {
//   return <section id="donate">Donate</section>;
// };

export default Donation;
