import { useState, useEffect } from 'react';
import NavMenu from './NavMenu';

import {header} from '../../data';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const{companyLogo, donationIcon} = header;
  const [bg, setBg] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });
 
  return (
    <nav className={`${bg ? "bg-base-200 h-24 opacity-95 shadow-sm shadow-stone-700": "bg-base-100 h-32" } fixed container mx-auto text-[1.2rem] z-20 top-0 left-0 right-0 lg:px-12 xxl:px-24`}>
     
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
        
        <NavLink
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={companyLogo.pic} className="h-24 rounded-full" alt="Logo" />
          <span className="self-center bg-clip-text text-4xl text-transparent  whitespace-nowrap font-logo bg-gradient-to-r from-accent via-secondary to-accent pr-3">
            {companyLogo.name}
          </span>
        </NavLink>
        <div className="flex lg:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="btn btn-accent"
          >
            {donationIcon}Donate Now
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-neutral rounded-lg lg:hidden hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        {/* imbedding the NavMenu component */}
        <NavMenu bg={bg} />
        </div>
    </nav>
  );
};

export default Header;
