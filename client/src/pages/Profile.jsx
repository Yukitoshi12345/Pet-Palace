import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom'; // Import Link
import moment from 'moment'; 
import { QUERY_SINGLE_USER } from '../utils/queries';
import DogPic from '../assets/images/favorites/dog.png';
import CatPic from '../assets/images/favorites/cat.png';
import BirdPic from '../assets/images/favorites/bird.png';
import RabbitPic from '../assets/images/favorites/rabbit.png';
import HamsterPic from '../assets/images/favorites/hamster.png';




const Profile = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { userId: userId },
  });

  const [user, setUser] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(data);
  
  const userData = data?.user || {};
  const favoritePets = userData.favorites || [];

  return (
    <div className="container mx-auto mt-20 section">
      <section id="profile" className="flex max-w-2xl mx-auto bg-neutral rounded-lg shadow-lg p-8 min-h-[600px] min-w-[900px]">
        <div className="w-1/2 border border-gray-300 rounded p-4 mr-4">
          <h2 className="text-2xl font-bold mb-4 text-center">USER PROFILE</h2>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Birthday:</span> {moment.unix(userData.birthday / 1000).format('YYYY-MM-DD')}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Favorite Pet:</span> {userData.favoritePet}
          </p>
        </div>
        <div className="w-1/2 border border-gray-300 rounded p-4 mr-4">
          <h2 className="text-2xl font-bold mb-4 text-center">FAVORITE PETS</h2>
          {favoritePets.map((pet) => (
            <div key={pet._id} className="border border-gray-300 rounded p-4 mb-4">
              <p className="text-lg mb-2 text-base-100">
                <span className="font-semibold">Pet Name:</span> <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
              </p>
                {pet.type === 'dog' && <img src={DogPic} alt="Dog" />}
                {pet.type === 'cat' && <img src={CatPic} alt="Cat" />}
                {pet.type === 'bird' && <img src={BirdPic} alt="Bird" />}
                {pet.type === 'rabbit' && <img src={RabbitPic} alt="Rabbit" />}
                {pet.type === 'hamster' && <img src={HamsterPic} alt="Hamster" />}            
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
               REMOVE
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
