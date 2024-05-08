import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CHANGE_PASSWORD } from '../utils/mutations';
import { ImEnter } from "react-icons/im";

const ChangePassword = () => {
  const [formState, setFormState] = useState({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });
  const [changePassword, { data }] = useMutation(CHANGE_PASSWORD);
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
    
    try {
      const { data } = await changePassword({
        variables: { ...formState },
      });

      
      console.log('Password changed successfully');
    } catch (e) {
      console.error('Password change error:', e);
      setError('Failed to change password. Please try again.');
    }
    
    setFormState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="max-w-md w-full px-4 section">
      <div className="flex flex-col justify-center bg-neutral shadow-md rounded-2xl px-8 py-8 -mt-12 min-h-[550px] ">
        <h4 className="text-2x1 mb-8 mt-1 font-bold text-center text-[34px] border-b py-1">CHANGE PASSWORD</h4>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="currentPassword" className="block text-base-100 mb-2">
              Current Password
            </label>
            <div className="mb-4">
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full px-3 py-2 border rounded text-black"
                placeholder="Enter current password"
                value={formState.currentPassword}
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="mb-4">
              <label htmlFor="newPassword"  className="block text-base-100 mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="w-full px-3 py-2 border rounded text-black"
                placeholder="At least 5 characters"
                value={formState.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-base-100 mb-2">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded text-black"
                placeholder="Confirm Password"
                value={formState.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
        
            <button
              className="w-full py-2 btn btn-accent mt-2 text-[16px]"
              type="submit"
              >
              <ImEnter/>CHANGE PASSWORD
            </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  </div>
  );
};

export default ChangePassword;
