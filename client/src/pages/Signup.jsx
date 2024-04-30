import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { data }] = useMutation(ADD_USER);
  const [errorMsg, setErrorMsg] = useState('');

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
      // If passwords don't match, set an error message and return early
      setErrorMsg('Passwords do not match');
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
    <main className="flex justify-center">
      <div className="max-w-md w-full px-4 mt-20">
        <div className="bg-white shadow-md rounded px-8 py-8">
          <h4 className="text-2xl mb-4 font-bold text-black text-center">SIGN UP</h4>
          {data ? (
            <p className="text-green-500 mb-4">
              Success! Your account has been created!
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
               <div className="mb-4">
               <label htmlFor="name" className="block text-black mb-2">Name</label>
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
              <label htmlFor="birthday" className="block text-black mb-2">Birthday</label>
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
              <label htmlFor="email" className="block text-black mb-2">Email</label>
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
              <label htmlFor="password" className="block text-black mb-2">Password</label>
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
              <label htmlFor="confirmPassword" className="block text-black mb-2">Confirm Password</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                type="submit"
              >
                REGISTER
              </button>
            </form>
          )}
          {errorMsg && (
            <div className="text-red-500 mt-4">{errorMsg}</div>
          )}
        </div>
      </div>
    </main>
  )
};  

export default Signup;
