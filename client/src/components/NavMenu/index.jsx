import { navigation } from "../../data";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (

    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className=" capitalize flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    {navigation.map((navItem, index) => (
          <li
            key={index}
            className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-700 md:p-0 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          >
            <NavLink to={navItem.href} className={navItem.isHidden && 'hidden'}>
                {navItem.name}
            </NavLink>
          </li>
        ))}

    </ul>
  </div>
  );
};

export default NavMenu;