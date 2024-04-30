import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
    <main className="flex justify-center mt-10">
      <div className="max-w-md w-full px-4 mt-20">
        <div className="bg-white shadow-md rounded px-8 py-8">
          <h4 className="text-2xl mb-4 font-bold text-black">SIGN UP</h4>
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
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
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
                REGISTER
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

export default Signup;
