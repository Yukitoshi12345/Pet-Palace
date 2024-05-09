import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";

const PetCard = ({ index, pet }) => {
  const { type, name, location, age, breed, species, photo, featured, color, description } = pet;
  
  return (

    <motion.div className="card card-compact bg-base-200 shadow-xl"
    initial={{
      opacity: 0,
      y: index % 2 ===0 ? 50 : -50
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.0, ease: 'easeInOut'}
    }}
    viewport= {{once: false}}

    >
      <figure className='rounded-t-2xl my-0'>
        <img 
          src={`/images/pets/${type?.toLowerCase()}s/${photo}`}
          alt={`featured pet ${name}`}
        />
      </figure>
      <div className="card-body pt-0 mt-0">
        <h2 className="card-title my-2 border-b-0 ">
          {name}
          {featured &&<div className="badge badge-secondary py-3  rounded-xl text-neutral">FEATURED</div>}
        </h2>
        <p className='leading-3 my-0'>{location} Rescue Center</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline py-3 rounded-xl">
            {age}
            {age > 1 ? 'years' : 'year'}
          </div>
          <div className="badge badge-outline py-3  rounded-xl">{breed || species}</div>
          <div className="badge badge-outline py-3  rounded-xl">{color}</div>
        </div>
        <p className='line-clamp-1'>{description}</p>
        <NavLink to={`/pets/${pet._id}`} className='btn btn-primary'>More Info</NavLink>
      </div>
    </motion.div>
  );
};

export default PetCard;
