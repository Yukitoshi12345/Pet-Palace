import React from 'react';
import {footer } from '../../data';

const Footer = () => {
    const {copyright, slogan, registration } = footer;
  return (
    <footer className="bg-accent footer mt-10 flex items-center justify-evenly">
      <figure className="flex flex-col gap-0 items-center">
        <img src={registration.pic} alt="logo" className="h-28" />
        <figcaption className="text-white tracking-tight font-bold m-0">
          {registration.registrationBoard}
        </figcaption>
      </figure>
      <p className='font-logo text-4xl text-white'>{slogan}</p>

      <p className=" text-white">
        {copyright}
      </p>
    </footer>
  );
};

export default Footer;
