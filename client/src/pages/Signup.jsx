import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import pet from '../assets/images/signup/sad-dog.webp';
import { FaCalendarDay } from 'react-icons/fa6';
import { BiSolidDonateHeart } from 'react-icons/bi';
import { FaNewspaper } from 'react-icons/fa';
import { FaUnlockAlt } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import { GiArchiveRegister } from 'react-icons/gi';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    birthday: '',
    favoritePet: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { data }] = useMutation(ADD_USER);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className=" section">
      <div className="container px-4 mt-20 relative">
        <div className="absolute -right-24 -top-28 hidden lg:block">
          <img
            src={pet}
            alt="sad dog"
            className="mask mask-heart max-h-[800px] opacity-45 -z-30"
          />
        </div>
        <div className="flex flex-col items-center lg:items-stretch lg:justify-start z-10 lg:flex-row">
          <div className="max-w-md w-full ">
            <div className="bg-neutral shadow-md  px-8 py-8 border-r-2 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
              <h4 className="text-2xl mb-4 font-bold text-center">SIGN UP</h4>
              {data ? (
                <p className="text-green-500 mb-4">
                  Success! Your account has been created!
                </p>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-base-100 mb-2">
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter full name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="birthday"
                      className="block text-base-100 mb-2"
                    >
                      Birthday
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter birthday"
                      name="birthday"
                      type="date"
                      value={formState.birthday}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-base-100 mb-2">
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-base-100 mb-2"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Must have at least 5 characters"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-base-100 mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formState.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="w-full py-2 btn btn-accent" type="submit">
                    <GiArchiveRegister />
                    REGISTER
                  </button>
                </form>
              )}
              {errorMsg && <div className="text-red-500 mt-4">{errorMsg}</div>}
            </div>
          </div>
          <div className="max-w-md w-full px-6 bg-neutral text-base-100 lg:min-w-max">
            <h3>Get instant access to our services by joining us today!</h3>
            <ul className="">
              <li className="flex gap-4 items-center">
                <FaUnlockAlt /> Get access to all our exclusive contents
              </li>
              <li className="flex gap-4 items-center">
                <FaSave />
                Save the pets you like to your favourite list
              </li>
              <li className="flex gap-4 items-center">
                <FaNewspaper />
                You can opt in to our quarterly newsletter
              </li>
              <li className="flex gap-4 items-center">
                <FaCalendarDay />
                You can make a booking to visit our shelters
              </li>
              <li className="flex gap-4 items-center">
                <BiSolidDonateHeart />
                When you donate, we send you a free gift pack
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
