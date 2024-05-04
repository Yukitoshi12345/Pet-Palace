import React from 'react';
import {footer } from '../../data';

const Footer = () => {
    const {projectMembers, copyright, slogan, logo } = footer;
  return (
    <footer className="bg-accent footer mt-10 flex items-center justify-evenly">
      <figure className="flex flex-col gap-0 items-center">
        <img src={logo.pic} alt="logo" className="h-28 rounded-full" />
        <figcaption className="text-white text-xl tracking-tight font-bold m-0">
          {logo.brand}
        </figcaption>
      </figure>
      <p className='font-logo text-4xl text-white'>{slogan}</p>

      <div className=" text-white flex flex-col justify-center items-center">
        <div>{copyright}</div>
        <div className='divide-x-2 divide-dotted'>
          {
            projectMembers.map((member, index) => {
              return <span key={index} className='px-3 italic'>{member}</span>;
            })
          }
        </div>
      </div>
    </footer>
  );
};

export default Footer;
