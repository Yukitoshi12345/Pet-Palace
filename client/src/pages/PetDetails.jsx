import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, NavLink } from 'react-router-dom';
import { QUERY_SINGLE_PET } from '../utils/queries';

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
    <div className="container mx-auto section">
      <section id="petDetails" className="mx-auto bg-neutral rounded-lg shadow-lg p-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {pet.name}
            {pet.featured && <span className="badge badge-secondary py-3 ml-4 rounded-xl">FEATURED</span>}
            {pet.tame && <span className="badge badge-secondary py-3 ml-4 rounded-xl">TAME</span>}
            {pet.pedigreeKnown && <span className="badge badge-secondary py-3 ml-4 rounded-xl">PEDIGREE KNOWN</span>}
          </h1>
        </div>
        <div className='grid grid-cols-2'>
          <div>
              <img className="rounded-lg" src={`/images/pets/${petType}s/${pet.photo}`} alt={pet.name} style={{ width: '650px', height: 'auto' }} />
          </div>
          <div>
            <p className="text-base-100"><span className="text-base-100 font-bold">Type: </span>{pet.type}</p>
            <p className="text-base-100"><span className="text-base-100 font-bold">Color: </span>{pet.color}</p>
            <p className="text-base-100"><span className="text-base-100 font-bold">Age: </span>{pet.age}</p>
            <p className="text-base-100"><span className="text-base-100 font-bold">Gender: </span>{pet.gender}</p>
            {petType === 'bird' && (
              <div>
                <p className="text-base-100"><span className="text-base-100 font-bold">Species: </span>{pet.species}</p>
              </div>
            )}
            {petType !== 'bird' && (
              <div>
                <p className="text-base-100"><span className="text-base-100 font-bold">Breed: </span>{pet.breed}</p>
              </div>
            )}
            <p className="text-base-100"><span className="text-base-100 font-bold">Location: </span>{pet.location}</p>
            <p className="text-base-100"><span className="text-base-100 font-bold">Description: </span>{pet.description}</p>     

            {(petType === 'bird' || petType === 'hamster') && (
              <div>
                <p className="text-base-100"><span className="text-base-100 font-bold">Health: </span>{pet.health}</p>
              </div>
            )}
            {petType === 'bird' && (
              <div>
                <p className="text-base-100"><span className="text-base-100 font-bold">Special Needs: </span>{pet.specialNeeds}</p>
              </div>
            )}

            {(petType === 'cat' || petType === 'dog' || petType === 'rabbit') && (
              <div>
                <p className="text-base-100"><span className="text-base-100 font-bold">Vaccination History: </span>{pet.vaccinationHistory}</p>
                <p className="text-base-100"><span className="text-base-100 font-bold">Disability: </span>{pet.disability}</p>
              </div>
            )}
          <div className="text-center">
            <NavLink to="/enquiry" className="btn btn-primary rounded btn-block">Enquire Now</NavLink>
          </div>
          </div>
        </div>  
      </section>
    </div>
  );
};

export default PetDetails;
