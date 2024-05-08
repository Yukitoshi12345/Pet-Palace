import { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { CHANGE_PASSWORD } from '../utils/mutations';

const ChangePassword = () => {
  // const [formState, setFormState] = useState({ 
  //   currentPassword: '', 
  //   newPassword: '', 
  //   confirmPassword: '' 
  // });
  // const [changePassword, { data }] = useMutation(CHANGE_PASSWORD);
  // const [error, setError] = useState('');

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  // const handleFormSubmit = async (event) => {
  //   event.preventDefault();
    
  //   try {
  //     const { data } = await changePassword({
  //       variables: { ...formState },
  //     });

  //     // Handle success
  //     console.log('Password changed successfully');
  //   } catch (e) {
  //     // Handle error
  //     console.error('Password change error:', e);
  //     setError('Failed to change password. Please try again.');
  //   }
    
  //   // Reset form
  //   setFormState({
  //     currentPassword: '',
  //     newPassword: '',
  //     confirmPassword: ''
  //   });
  // };

  return (
    <div>
      <h2>Password Change</h2>
      {/* <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formState.currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formState.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {error && <div>{error}</div>} */}
    </div>
  );
};

export default ChangePassword;
