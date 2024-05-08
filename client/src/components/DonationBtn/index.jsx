import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { useMutation } from '@apollo/client';

import { donation } from '../../data';

const DonationBtn = () => {
  return (
    <button className="btn btn-accent capitalize">
      {donation.icon}
      {donation.btnTitle}
    </button>
  );
};

export default DonationBtn;
