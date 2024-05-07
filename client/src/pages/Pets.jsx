import React from 'react';
import Footer from '../components/Footer';
import Search from '../components/Pets/Search';
import PetListing from '../components/Pets/PetListing';
import { QUERY_PETS } from '../utils/queries';
import { QUERY_PET_TYPES } from '../utils/queries';
import { QUERY_LOCATIONS } from '../utils/queries';
import { QUERY_PETS_BY_LOCATION } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const Pets = () => {
  // const petsLimit = 6;
  // const {
  //   loading,
  //   data: queriedPets,
  //   fetchMore,
  // } = useQuery(QUERY_PETS, {
  //   variables: { petsLimit: petsLimit },
  // });
  // const [pets, setPets] = useState(queriedPets);
  //get all the unique pet types and locations from database
  // const { data:petTypes } = useQuery(QUERY_PET_TYPES);
  // const { data: locations } = useQuery(QUERY_LOCATIONS);

  //create an array of pet types and locations to pass to the search component
  // console.log(petTypes);
  // const petTypesArr = ['All Pets', ...petTypes.petTypes];
  // const locationsArr = ['All Locations', ...locations.locations];

  const [speciesAndBreedsArr, setSpeciesAndBreedsArr] = useState([]);

  const handleLocationChange = async (e) => {
    const { value } = e.target;
    const { data } = await QUERY_PETS_BY_LOCATION(value);
    setPets(data);
  };

  return (
    <section
      id="pets"
      className="section flex-col justify-between relative pt-10"
    >
      <div className="container mx-auto">
        <div className=" bg-base-200 flex-col lg:flex-row">
          {/* {<Search
            pets={petTypesArr}
            locations={locationsArr}
            speciesOrBreeds={speciesAndBreedsArr}
            handleLocationChange={handleLocationChange}
          /> } */}

          {/* <PetListing
            loading={loading}
            pets={pets}
            fetchMore={fetchMore}
            petsLimit={petsLimit}
          /> */}

          <PetListing />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pets;
