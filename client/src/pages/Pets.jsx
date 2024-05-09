import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Search from '../components/Pets/Search';
import PetListing from '../components/Pets/PetListing';
import { useQuery, useLazyQuery } from '@apollo/client'; // Import both hooks
import { QUERY_PETS, QUERY_PETS_BY_SEARCH_CRITERIA } from '../utils/queries';

const Pets = () => {
  const petsLimit = 6;

  // Use useQuery for the initial pets query
  const { loading, data: queriedPets, fetchMore } = useQuery(QUERY_PETS, {
    variables: { petsLimit },
  });

  // Initialize searchCriteriaData with an empty object
  const [searchCriteriaData, setSearchCriteriaData] = useState({});

  const handleSearchSubmit = async (location, petType, speciesBreed) => {
    // Use a lazy query for fetching pets based on search criteria
    const [getPetsBySearchCriteria] = useLazyQuery(QUERY_PETS_BY_SEARCH_CRITERIA, {
      onCompleted: (data) => {
        setSearchCriteriaData(data);
      },
    });

    // Fetch pets based on search criteria
    await getPetsBySearchCriteria({
      variables: { location, petType, speciesBreed },
    });
  };

  useEffect(() => {
    // Update pets state based on search criteria data
    setPets(searchCriteriaData?.petsBySearchCriteria || queriedPets);
  }, [searchCriteriaData, queriedPets]);

  // Initialize pets state with queriedPets
  const [pets, setPets] = useState(queriedPets);

  return (
    <section id="pets" className="section flex-col justify-between relative pt-10">
      <div className="container mx-auto">
        <div className="bg-base-200 flex-col lg:flex-row justify-center items-center">
          <div className="flex justify-start">
          <Search handleSearchSubmit={handleSearchSubmit}  />
          </div>
          
          <PetListing
            loading={loading}
            pets={pets}
            fetchMore={fetchMore}
            petsLimit={petsLimit}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pets;
