import React from 'react';
import { motion } from 'framer-motion';
import { FaPaw } from 'react-icons/fa';

const PetCard = ( {index, type, name, location, age, breed, species, photo}) => {
  return (
    <motion.div className="card w-96 h-96 bg-base-200 shadow-x1 flex flex-col"
    initial={{
      opacity: 0,
      y: index % 2 ===0 ? 50 : -50
    }}
    whileInView={{
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, ease: 'easeInOut'}
    }}
    viewport= {{once: false}}
    >
      <figure className='rounded-t-2xl my-0'>
        <img 
          src={`/images/pets/${type.toLowerCase()}s/${photo}`}
          alt={`featured pet ${name}`}
        />
      </figure>
      <div className="card-body pt-0 mt-3">
        <h2 className="card-title my-2 border-b-0">
          {name}
          <div className="badge badge-secondary py-3 text-neutral rounded-xl">FEATURED</div>
        </h2>
        <p className='leading-3 my-0'>{location}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline py-3 rounded-xl">
            {age}
            {age > 1 ? 'years' : 'year'}
          </div>
          <div className="badge badge-outline py-3  rounded-xl">{breed || species}</div>
        </div>
        <button className='btn mt-3 btn-primary flex items-center'>
          <FaPaw /> {/* Adding the icon with some margin */}
          ADOPT ME
        </button>
      </div>
    </motion.div>
  );
};

export default PetCard;
