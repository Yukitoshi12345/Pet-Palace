
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

const Profile = ({ email }) => {
  // Use the useQuery hook to fetch user data
  const { loading, error, data } = useQuery(QUERY_USER, {
    variables: { email: email }, // Pass the email variable as a query variable
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  // Once data is loaded, render the user profile
  const { user } = data;

  return (
    <section id="profile">
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Birthday: {user.birthday}</p>
    </section>
  );
};

export default Profile;
