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
      <h2>Sign Up</h2>
      <form>
        {/* {(
          <div style={{ color: 'red', marginBottom: '10px' }}>
            {errorMessage}
          </div>
        )} */}

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='Name'>Name</label>
          <input
            type='string'
            placeholder='Your Name'
            name='Name'
            // onChange={handleInputChange}
            // value={userFormData.Name}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            placeholder='Your email address'
            name='email'
            // onChange={handleInputChange}
            // value={userFormData.email}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            name='password'
            // onChange={handleInputChange}
            // value={userFormData.password}
            required
            style={{ width: '100%', padding: '5px' }}
          />
        </div>

        <button type='submit' style={{ width: '100%', padding: '10px', background: 'blue', color: 'white', border: 'none' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
