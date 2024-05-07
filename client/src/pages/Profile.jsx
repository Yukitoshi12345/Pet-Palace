import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
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

  const handleAddFavorite = (petId) => {
    // Check if the user is already loaded
    if (user) {
      // Update the user object to add the pet to favorites
      setUser({
        ...user,
        favoritePets: [...user.favoritePets, petId],
      });
    }
  };

  // Assuming data.user contains the user object
  const userData = data?.user || {};
  const favoritePets = userData.favoritePets || [];

  return (
    <div className="container mx-auto mt-20 section">
      <section id="profile" className="max-w-lg mx-auto bg-neutral rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="border border-gray-300 rounded p-4 ">
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
        <div>
          <h3 className="text-lg font-bold mt-8 mb-4">Favorite Pets</h3>
          {favoritePets.map((petId) => (
            <div key={petId} className="border border-gray-300 rounded p-4 mb-4">
              {/* Render the pet details here */}
              <p className="text-lg mb-2 text-base-100">
                Pet ID: {petId}
              </p>
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
