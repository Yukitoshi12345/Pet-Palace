import React from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_FEATURED_PETS } from '../../../utils/queries';
import PetCard from './PetCard';
import {home} from '../../../data';
import { NavLink } from "react-router-dom";

const FeaturedPets = () => {

  const { loading, data } = useQuery(QUERY_FEATURED_PETS);
  const featuredPets = data?.featuredPets || [];

  return (
    <div className=''>
          <h3 className="text-2xl font-bold  text-center capitalize">{home.featured}</h3>
          <div className="flex flex-wrap items-center justify-center p4 gap-4">
            
            {loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              featuredPets.map((pet, index) => (
                <NavLink key={index} to={`/pets/${pet._id}`} className='no-underline'>
                  <PetCard  index={index} {...pet} />
                </NavLink>
              ))
            )}
          </div>
          <div className="flex justify-center my-5">
            <NavLink to='/pets' className='btn btn-accent'>{home.featuredPets.icon}{home.featuredPets.btn}</NavLink>
          </div>
        </div>
  )
}

export default FeaturedPets