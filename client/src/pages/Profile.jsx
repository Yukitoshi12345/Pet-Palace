import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER } from '../utils/queries';

const Profile = ()  => {
  const { userId } = useParams();

  // Use the useQuery hook to fetch user data
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: userId }, // Pass the email variable as a query variable
  });
  console.log(userId)
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
          <p className="text-lg mb-2">
            <span className="font-semibold text-base-100">Name:</span> {user.name}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-base-100">Email:</span> {user.email}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-base-100">Birthday:</span> {user.birthday}
          </p>
          <p className="text-lg mb-2">
            <span className="font-semibold text-base-100">Favorite Pet:</span> {user.favoritePet}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
