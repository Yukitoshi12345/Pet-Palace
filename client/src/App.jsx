// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import { Outlet } from "react-router-dom"
import Home from './components/Home';
import Header from './components/Header';
import CheckoutForm from './components/CheckoutForm'; // The Stripe Checkout Form component

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
  // Check if authentication token exists in local storage and store it
  const token = localStorage.getItem('id_token');

  // Return the headers to the context so httpLink can read it
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up the client to execute authLink middleware before making request to GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Initialize Stripe with your key
const stripeAPI = process.env.Stripe_API_KEY;
const stripePromise = loadStripe(stripeAPI);

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            {/* Add other routes as needed */}
          </Routes>
        </Elements>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
