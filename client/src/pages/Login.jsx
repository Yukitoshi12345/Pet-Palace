import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex justify-center mt-10 section">
      <div className="max-w-md w-full px-4 mt-20">
        <div className="bg-neutral shadow-md rounded px-8 py-8">
          <h4 className="text-2xl mb-4 font-bold text-center">LOGIN</h4>
          {data ? (
            <p className="text-green-500 mb-4 text-center font-bold">
             Logged in successfully!
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="email" className="block text-base-100 mb-2">Email</label>
              <div className="mb-4">
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
                <label htmlFor="password" className="block text-base-100 mb-2">Password</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="*****"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full py-2 btn btn-accent"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                LOGIN
              </button>
            </form>
          )}
          {error && (
            <div className="text-red-500 mt-4">{error.message}</div>
          )}
        </div>
      </div>
    </main>
  )
};
export default Login;
