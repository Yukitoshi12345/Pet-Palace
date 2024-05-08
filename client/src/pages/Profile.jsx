import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom'; // Import Link
import moment from 'moment'; 
import { QUERY_SINGLE_USER } from '../utils/queries';


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
      <section id="profile" className="flex max-w-2xl mx-auto bg-neutral rounded-lg shadow-lg p-8">
        <div className="w-1/2 border border-gray-300 rounded p-4 mr-4">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
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
        <div className="w-1/2">
          <h3 className="text-lg font-bold mb-4">Favorite Pets</h3>
          {favoritePets.map((pet) => (
            <div key={pet._id} className="border border-gray-300 rounded p-4 mb-4">
              <p className="text-lg mb-2 text-base-100">
                <span className="font-semibold">Pet Name:</span> <Link to={`/pets/${pet._id}`}>{pet.name}</Link>
              </p>
              <p className="text-lg mb-2 text-base-100">
                <span className="font-semibold">Pet Type:</span> {pet.type} {/* Display pet type */}
              </p>
              <img src={pet.photo} alt={pet.name} className="w-full rounded-lg mb-2" />
              {/* Assuming there's a button to remove pet from favorites */}
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
