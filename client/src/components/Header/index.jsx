import { useState, useEffect } from 'react';
import NavMenu from '../NavMenu';
// import NavMobile from "./UI/Navigation/NavMobile";
import logo from '../../assets/images/logo.gif';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [bg, setBg] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      return window.scrollY > 50 ? setBg(true) : setBg(false);
    });
  });
 
  return (
    <nav className={`${bg ? "bg-tertiary h-20": "h-24" }bg-white dark:bg-gray-900  z-20 top-0 start-0  container mx-auto`}>
     
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        
        <NavLink
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-24 rounded-full" alt="Logo" />
          <span className="self-center bg-clip-text text-4xl text-transparent  whitespace-nowrap font-logo bg-gradient-to-r from-yellow-400 via-orange-300 to-orange-800 pr-3">
            Pet Palace
          </span>
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            Adopt Now
          </button>

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <NavMenu />
        </div>
    </nav>
  );
};

export default Header;
