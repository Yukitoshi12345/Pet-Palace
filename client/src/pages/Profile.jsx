import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { QUERY_SINGLE_USER } from '../utils/queries';

const Profile = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    // Important for Query Variables: The useQuery hook is able to take a second argument which is where we will pass the query arguments needed to complete the request for a specific profile
    // The second argument is passed as an object with a variables property
    // The variables object will receive each key matching the query definition in utils/queries.js, and the value we'd like to deliver to the server
    variables: { userId: userId },
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-20 section">
      <section id="profile" className="max-w-lg mx-auto bg-neutral rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <div className="border border-gray-300 rounded p-4">
          <p className='text-base-100'>User ID: {user._id}</p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold text-base-100">Name:</span> {user.name}
          </p>
          <p className="text-lg mb-2">
            {/* <span className="font-semibold text-base-100">Email:</span> {user.email} */}
          </p>
          <p className="text-lg mb-2">
            {/* <span className="font-semibold text-base-100">Birthday:</span> {user.birthday} */}
          </p>
          <p className="text-lg mb-2">
            {/* <span className="font-semibold text-base-100">Favorite Pet:</span> {user.favoritePet} */}
          </p>
          {/* NavLink to the profile */}
          {/* <NavLink to={`/profiles/${user._id}`}>View Profile</NavLink> */}
        </div>
      </section>
    </div>
  );
};

export default Profile;
