import { header } from "../../../data";
import { NavLink } from "react-router-dom";
import Auth from '../../../utils/auth'; // Import Auth utility for handling authentication

const NavMenu = ({bg}) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const { navigation } = header;
  return (
    <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="navbar-sticky">
      <ul className={`${bg ? "lg:bg-base-200  ": "lg:bg-base-100 " } bg-base-300 capitalize flex flex-col p-4 lg:p-0 mt-4 font-medium border rounded-lg  lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0`}>
        {navigation.map((navItem, index) => (
          <li
            key={index}
            className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0"
          >
            <NavLink to={navItem.href} className={navItem.isHidden && 'hidden'}>
              {navItem.name}
            </NavLink>
          </li>
        ))}
        {Auth.loggedIn() ? ( // If user is logged in, render logout button
          <>
          <li className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0">
            <NavLink to="/profiles/:userId">Profile</NavLink>
          </li>
          <li className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0">
            <NavLink to="/petDetails">Pet Details</NavLink>
          </li>
          <li className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0">
            <button onClick={logout}>Logout</button>
          </li>
          </>
        ) : ( // If user is not logged in, render login and signup links
          <>
            <li className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="block py-2 px-3 rounded hover:text-orange-700 lg:p-0">
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavMenu;