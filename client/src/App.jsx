// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home';
import ThemeController from './components/ThemeController';
import Footer from './components/Footer';
import BackToTopBtn from './components/BackToTopBtn';
import Contact from './pages/Contact';
import Donation from './pages/Donation'; // The Stripe Checkout Form component

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

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeController />
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <BackToTopBtn />
    </ApolloProvider>
  );
}

export default App;
