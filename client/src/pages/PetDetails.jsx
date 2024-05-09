import React, { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, NavLink } from 'react-router-dom';
import { QUERY_SINGLE_PET } from '../utils/queries';
import { ADD_FAVORITE } from '../utils/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PetDetails = () => {
  const { petId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const [addFavorite] = useMutation(ADD_FAVORITE);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const fetchPetData = useCallback(async () => {
    await refetch();
  }, [refetch]);

  useEffect(() => {
    fetchPetData();
  }, [fetchPetData]);

  const pet = data?.pet || {};
  const petType = pet.type ? pet.type.toLowerCase() : '';

  useEffect(() => {
    if (data && data.pet) {
      setIsInFavorites(data.pet.isInFavorites);
    }
  }, [data]);

  const handleFavoriteClick = async () => {
    try {
      if (isInFavorites) {
        alert('This pet is already added to favorites!');
        return;
      }

      await addFavorite({
        variables: { petId: pet._id },
      });
      setIsInFavorites(true);
      await fetchPetData();
      alert('Pet added to favorites!');
    } catch (error) {
      console.error('Error adding pet to favorites:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container section">
      <section id="petDetails" className="mx-auto bg-neutral rounded-lg shadow-lg p-8">
        <div>
          <h1 className="text-3xl font-bold mb-1 border-b-2 py-2 text-[40px]">
          < button onClick={handleFavoriteClick} className="btn btn-primary rounded mr-4 mx-1">
              <FontAwesomeIcon icon={faHeart} className={isInFavorites ? 'text-red-500' : 'text-gray-500'} />
            </button>
            {pet.name}
            {pet.featured && <span className="badge badge-secondary py-3 ml-4 rounded-xl ">FEATURED</span>}
            {pet.tame && <span className="badge badge-secondary py-3 ml-4 rounded-xl">TAME</span>}
            {pet.pedigreeKnown && <span className="badge badge-secondary py-3 ml-4 rounded-xl">PEDIGREE KNOWN</span>}
            
          </h1>
        </div>
        <div className='grid grid-cols-3'>
          <div>
            <img className="rounded-lg" src={`/images/pets/${petType}s/${pet.photo}`} alt={pet.name} style={{ width: '650px', height: 'auto' }} />
          </div>
          <div className='ml-20'>
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
          </div>  
          <div>
            <p className="text-base-100"><span className="text-base-100 font-bold">Description: </span>{pet.description}</p> 
            <div className="text-center">
              <NavLink to="/enquiry" className="btn btn-primary rounded btn-block">ENQUIRE NOW</NavLink>
            </div>    
          </div>
        </div>  
      </section>
    </div>
  );
};

export default PetDetails;
