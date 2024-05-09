import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment'; 
import { QUERY_SINGLE_USER } from '../utils/queries';
import { REMOVE_FAVORITE } from '../utils/mutations'; 

import DogPic from '../assets/images/favorites/dog.png';
import CatPic from '../assets/images/favorites/cat.png';
import BirdPic from '../assets/images/favorites/bird.png';
import RabbitPic from '../assets/images/favorites/rabbit.png';
import HamsterPic from '../assets/images/favorites/hamster.png';

const Profile = () => {
  const { userId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const [user, setUser] = useState(null);
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
    <div className="container mx-auto mt-20 section">
      <section id="profile" className="flex max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 min-h-[600px] min-w-[800px]">
        <div className="w-1/2 border border-gray-300 rounded p-4 mr-4">
          <h2 className="text-3xl font-bold mb-4">User Profile</h2>
          <p className="text-lg mb-4 text-gray-700">
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p className="text-lg mb-4 text-gray-700">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p className="text-lg mb-4 text-gray-700">
            <span className="font-semibold">Birthday:</span> {moment.unix(userData.birthday / 1000).format('YYYY-MM-DD')}
          </p>
          <p className="text-lg mb-4 text-gray-700">
            <span className="font-semibold">Favorite Pet:</span> {userData.favoritePet}
          </p>
        </div>
        <div className="w-1/2 border border-gray-300 rounded p-4 mr-4">
          <h3 className="text-3xl font-bold mb-4">Favorite Pets</h3>
          {favoritePets.map((pet) => (
            <div key={pet._id} className="border border-gray-300 rounded p-4 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">
                  <Link to={`/pets/${pet._id}`} className="text-blue-600 hover:underline">{pet.name}</Link>
                </p>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleRemoveFavorite(pet._id)}>
                  Remove
                </button>
              </div>
              <p className="text-lg mt-2 text-gray-700">
                {pet.type === 'dog' && <img src={DogPic} alt="Dog" />}
                {pet.type === 'cat' && <img src={CatPic} alt="Cat" />}
                {pet.type === 'bird' && <img src={BirdPic} alt="Bird" />}
                {pet.type === 'rabbit' && <img src={RabbitPic} alt="Rabbit" />}
                {pet.type === 'hamster' && <img src={HamsterPic} alt="Hamster" />}            
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
