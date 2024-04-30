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
    <main className="flex justify-center mt-10">
      <div className="max-w-md w-full px-4">
        <div className="bg-white shadow-md rounded px-8 py-8">
          <h4 className="text-2xl mb-4 font-bold text-black">LOGIN</h4>
          {data ? (
            <p className="text-green-500 mb-4">
              Success! You may now head{' '}
              <Link to="/" className="text-blue-500 hover:underline">
                back to the homepage.
              </Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
