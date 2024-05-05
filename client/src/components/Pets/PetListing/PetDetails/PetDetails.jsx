import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PetDetails = () => {
  const { petId } = useParams(); // Get the petId from the URL params
  const [petDetails, setPetDetails] = useState(null); // State to store pet details

  // Function to fetch pet details from the server
  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`/api/pets/${petId}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch pet details');
      }
      const data = await response.json();
      setPetDetails(data); // Set the fetched pet details to state
    } catch (error) {
      console.error('Error fetching pet details:', error);
    }
  };

  // Fetch pet details when the component mounts
  useEffect(() => {
    fetchPetDetails();
  }, [petId]); // Fetch details whenever petId changes

  // Render loading message while fetching pet details
  if (!petDetails) {
    return <div>Loading...</div>;
  }

  // Once pet details are fetched, render the details
  return (
    <div>
      <h2>{petDetails.name}</h2>
      <p>Type: {petDetails.type}</p>
      <p>Variety: {petDetails.variety}</p>
      <p>Gender: {petDetails.gender}</p>
      <p>Age: {petDetails.age}</p>
      <p>Color: {petDetails.color}</p>
      <p>Description: {petDetails.description}</p>
      <p>Location: {petDetails.location}</p>
      <p>Health: {petDetails.health}</p>
      <p>Tame: {petDetails.tame ? 'Yes' : 'No'}</p>
      <p>Special Needs: {petDetails.specialNeeds}</p>
      <p>Vaccination History: {petDetails.vaccinationHistory}</p>
      <p>Disability: {petDetails.disability}</p>
      <p>Pedigree Known: {petDetails.pedigreeKnown ? 'Yes' : 'No'}</p>
      <img src={petDetails.photo} alt={petDetails.name} style={{ maxWidth: '300px' }} />
    </div>
  );
};

export default PetDetails;
