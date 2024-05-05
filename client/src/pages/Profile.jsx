import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import moment from 'moment'; 
import { QUERY_SINGLE_USER } from '../utils/queries';

const Profile = () => {
  const { userId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
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
        <div className="border border-gray-300 rounded p-4 ">
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Birthday:</span> {moment.unix(user.birthday / 1000).format('YYYY-MM-DD')}
          </p>
          <p className="text-lg mb-2 text-base-100">
            <span className="font-semibold">Favorite Pet:</span> {user.favoritePet}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
