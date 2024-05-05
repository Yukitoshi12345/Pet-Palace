import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, NavLink } from 'react-router-dom';
import { QUERY_SINGLE_PET } from '../../../../utils/queries';

const PetDetails = () => {
  // Get the petId from the URL parameters
  const { petId } = useParams();

  // Fetch data for the single pet using the QUERY_SINGLE_PET query
  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  // Check if pet.type is defined before using toLowerCase()
  const petType = pet.type ? pet.type.toLowerCase() : '';

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-20 section">
      <section id="profile" className="max-w-lg mx-auto bg-neutral rounded-lg shadow-lg p-8 mt-20 mb-20">
        <h1 className="text-3xl font-bold mb-4">{pet.name}</h1>
        <img className="rounded-lg mb-4" src={`/images/pets/${petType}s/${pet.photo}`} alt={pet.name} />
          <div className="text-base-100">
            <p className="text-base-100"><span className="font-bold text-base-100">Breed:</span> {pet.breed}</p>
            <p className="text-base-100"><span className="font-bold text-base-100">Species:</span> {pet.species}</p>
            <p className="text-base-100"><span className="font-bold text-base-100">Age:</span> {pet.age}</p>
            <p className="text-base-100"><span className="font-bold text-base-100">Color:</span> {pet.color}</p>
            <p className="text-base-100"><span className="font-bold text-base-100">Description:</span> {pet.description}</p>
            <p className="text-base-100"><span className="font-bold text-base-100">Location:</span> {pet.location}</p>
          </div>
          <div className="text-center mt-8">
             <NavLink to="/enquiry" className="btn btn-primary">Enquire Now</NavLink> 
          </div>
      </section>
    </div>
  );
};

export default PetDetails;
