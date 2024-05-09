import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  QUERY_PET_TYPES,
  QUERY_LOCATIONS,
  QUERY_BREEDS_OR_SPECIES,
} from '../../../utils/queries';


const Search = ({handleSearchSubmit}) => {

  // Get all the unique pet types and locations from the database
  const { data: petTypes } = useQuery(QUERY_PET_TYPES);
  const { data: locations } = useQuery(QUERY_LOCATIONS);

  const petTypesArr = ['All Pet Types', ...(petTypes?.petTypes || [])];
  const locationsArr = ['All Locations', ...(locations?.locations || [])];
  const [speciesBreeds, setSpeciesBreeds] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [selectedSpeciesBreeds, setSelectedSpeciesBreeds] = useState('');

  // Use a lazy query for fetching species/breeds
  const [getSpeciesOrBreeds, { data: speciesOrBreeds }] = useLazyQuery(
    QUERY_BREEDS_OR_SPECIES,
  );

  useEffect(() => {
    // Fetch initial data when the component mounts
    getSpeciesOrBreeds({ variables: { petType: null } });
  }, [getSpeciesOrBreeds]);

  const handlePetTypeChange = (e) => {
    const { value } = e.target;
    setSelectedPetType(value);
    // Fetch species/breeds based on the selected pet type
    getSpeciesOrBreeds({ variables: { petType: value } });
  };

  useEffect(() => {
    // Update speciesBreeds state when speciesOrBreeds data changes
    setSpeciesBreeds(speciesOrBreeds?.breedsOrSpecies || []);
  }, [speciesOrBreeds]);

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setSelectedLocation(value);
  };
  const handleSpeciesBreedsChange = (e) => {
    const { value } = e.target;
    setSelectedSpeciesBreeds(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //get currently selected location value
    handleSearchSubmit( selectedLocation || 'All Locations', selectedPetType || 'All Pet Types', selectedSpeciesBreeds );
    
  }


  return (
    <form className="flex items-center justify-start max-w-2xl " onSubmit={handleSubmit}>
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex justify-end py-7 space-x-2">
          <select
            className="select select-accent w-full max-w-[200px] cursor-pointer"
            onChange={handleLocationChange}
          >
            {locationsArr.map((loc, index) => (
              //always make first one selected
              <option key={index}>{loc}</option>
            ))}
          </select>
         
          <select
            className="select select-accent w-full max-w-[200px] cursor-pointer"
            onChange={handlePetTypeChange}
          >
            {petTypesArr.map((type, index) => (
              <option key={index} >{type}</option>
            ))}
          </select>
          {speciesBreeds && speciesBreeds.length > 0 && (
            <select className="select select-accent w-full max-w-[200px] cursor-pointer"
            onChange={ handleSpeciesBreedsChange}
            >
              {speciesBreeds.map((spec, index) => (
                <option key={index} >
                  {spec}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="p-2.5 ms-2  font-medium btn btn-accent"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default Search;
