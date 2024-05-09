import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment'; 
import { QUERY_SINGLE_USER } from '../utils/queries';
import { REMOVE_FAVORITE } from '../utils/mutations'; 

// import DogPic from '../assets/images/favorites/dog.png';
// import CatPic from '../assets/images/favorites/cat.png';
// import BirdPic from '../assets/images/favorites/bird.png';
// import RabbitPic from '../assets/images/favorites/rabbit.png';
// import HamsterPic from '../assets/images/favorites/hamster.png';

const Profile = () => {
  const { userId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const [removeFavorite] = useMutation(REMOVE_FAVORITE);

  useEffect(() => {
    refetch();
  }, [userId, refetch]); 

  if (loading) {
    return <div>Loading...</div>;
  }
  
  const userData = data?.user || {};
  const favoritePets = userData.favorites || [];

  const handleRemoveFavorite = async (petId) => {
    try {
      await removeFavorite({
        variables: { petId: petId },
        refetchQueries: [{ query: QUERY_SINGLE_USER, variables: { userId: userId } }], 
      });
    
      alert('Pet removed from favorites!');
    } catch (error) {
      console.error('Error removing pet from favorites:', error);
    }
  };

  return (
    <div className="container mx-auto section">
      <section id="profile" className="flex max-w-4xl mx-auto bg-neutral rounded-lg shadow-lg p-8 min-h-[600px] min-w-[800px]">
        <div className="w-1/2 border-2 border-gray-300 rounded p-4 mr-4">
          <h2 className="text-[34px] font-bold mb-4 text-center border-b-2 py-1">USER PROFILE</h2>
          <div className='mt-20'>
            <p className="text-[22px] mb-4 text-base-100">
              <span className="font-semibold">Name:</span> {userData.name}
            </p>
            <p className="text-[22px] mb-4 text-base-100">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p className="text-[22px] mb-4 text-base-100">
              <span className="font-semibold">Birthday:</span> {moment.unix(userData.birthday / 1000).format('YYYY-MM-DD')}
            </p>
            <p className="text-[22px] mb-4 text-base-100">
              <span className="font-semibold">Favorite Pet:</span> {userData.favoritePet}
            </p>
          </div>
        </div>
        
        <div className="w-1/2 border-2 border-gray-300 rounded p-4 mr-4">
          <h3 className="text-[34px] font-bold text-center border-b-2 py-1">FAVORITE PETS</h3>
          {favoritePets.length === 0 ? (
            <p className="text-lg text-center mt-20 text-base-100">No favorite pets found.</p>
          ) : (
            favoritePets.map((pet) => (
              <div key={pet._id} className="border border-gray-300 rounded p-4 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">         
                    <Link to={`/pets/${pet._id}`} className="text-base-100 text-[26px] hover:underline">{pet.name}</Link>
                  <p className='text-base-100'>{pet.type}</p>  
                  </p>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveFavorite(pet._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
