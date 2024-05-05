import React from 'react'
import {donation} from '../../data'

const DonationBtn = () => {
  return (
    <button className="btn btn-accent capitalize">
    {donation.icon}
    {donation.btnTitle}
  </button>
  )
}

export default DonationBtn