import React from 'react';
import { QUERY_PETS } from '../../../utils/queries';
import { useQuery } from '@apollo/client';
import PetCard from './PetCard';

const PetListing = () => {
  const { loading, data } = useQuery(QUERY_PETS);
  const pets = data?.pets || [];
  return (
    <main>
      <div className="md:grid md:grid-cols-3 md:gap-4 ">
        {
          pets.map((pet, index) => (
            <PetCard key={index} index={index} {...pet} pet={pet} />
          ))
        }
        
      </div>
    </main>
    // <PetCard key={index} {...pet} />
  );
};

export default PetListing;
