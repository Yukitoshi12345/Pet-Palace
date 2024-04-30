/* eslint-disable react/no-unknown-property */
// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_USER } from '../utils/mutations';
// import Auth from '../utils/auth';

const Signup = () => {
  // const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // const [validated, setValidated] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const [addUser] = useMutation(ADD_USER);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;

  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);

  //   try {
  //     const { data } = await addUser({
  //       variables: { ...userFormData }
  //     });

  //     Auth.login(data.addUser.token);
  //   } catch (err) {
  //     console.error(err);
  //     setErrorMessage(err.message);
  //   }

  //   setUserFormData({ email: '', password: '' });
  // };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black text-center">SIGN UP</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="name">Name</label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            id="name"
            name="name"
            // onChange={handleInputChange}
            // value={userFormData.Name}
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="birthday">Birthday</label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="date"
            id="birthday"
            name="birthday"
            // onChange={handleInputChange}
            // value={userFormData.birthday}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            id="email"
            name="email"
            // onChange={handleInputChange}
            // value={userFormData.email}
            placeholder="Your email address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1" htmlFor="password">Password</label>
          <input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            type="password"
            id="password"
            name="password"
             // onChange={handleInputChange}
            // value={userFormData.password}
            placeholder="Your password"
            required
          />
        </div>

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      </div>
    </div>

  );
};

export default Signup;
