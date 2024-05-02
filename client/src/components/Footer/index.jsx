import React from 'react';
import {footer } from '../../data';

const Footer = () => {
    const {copyright, slogan, registration } = footer;
  return (
    <footer className="bg-accent py-5 flex flex-col justify-evenly items-center footer lg:flex-row mt-5">
      <figure className="flex flex-col items-center">
        <img src={registration.pic} alt="logo" className="h-28 rounded-full" />
        <figcaption className="text-white tracking-tight font-bold">
          {registration.registrationBoard}
        </figcaption>
      </figure>
      <q className='font-logo text-4xl text-white'>{slogan}</q>

      <p className=" text-white">
        {copyright}
      </p>
    </footer>
  );
};

export default Footer;
