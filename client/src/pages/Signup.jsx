import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

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
    <main className="flex justify-center section">
      <div className="max-w-xl w-full px-4 mt-20">
        <div className="bg-neutral shadow-md rounded-lg px-8 py-8">
          <h4 className="text-2x1 mb-8 mt-1 font-bold text-center text-[34px] border-b py-1">SIGN UP</h4>
          {data ? (
            <p className="text-green-500 mb-4">
              Success! Your account has been created!
            </p>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-base-100 mb-2">Name</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter full name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="birthday" className="block text-base-100 mb-2">Birthday</label>
                <input
                  className="w-full px-3 py-2 border rounded uppercase"
                  placeholder="Enter birthday"
                  name="birthday"
                  type="date"
                  value={formState.birthday}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="favoritePet" className="block text-base-100 mb-2">Favorite Pet</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  name="favoritePet"
                  value={formState.favoritePet}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a pet</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-base-100 mb-2">Email</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-base-100 mb-2">Password</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="At least 5 characters"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="confirmPassword" className="block text-base-100 mb-2">Confirm Password</label>
                <input
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                className="col-span-2 w-full py-2 btn btn-accent mt-2 text-[16px]"
                type="submit"
              >
                REGISTER
              </button>
            </form>
          )}
          {error && (
            <div className="text-red-500 mt-4 text-center">{error}</div>
          )}
        </div>
      </div>
    </main>
  )
};  

export default Signup;
