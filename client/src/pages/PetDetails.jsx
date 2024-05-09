import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { QUERY_SINGLE_PET } from '../utils/queries';
import { TbLocationQuestion } from 'react-icons/tb';
import Footer from '../components/Footer';

const PetDetails = () => {
  // Get the petId from the URL parameters
  const { petId } = useParams();

  // Fetch data for the single pet using the QUERY_SINGLE_PET query
  const { loading, data } = useQuery(QUERY_SINGLE_PET, {
    variables: { petId: petId },
  });

  const pet = data?.pet || {};

  // Check if pet.type is defined before using toLowerCase()
  const petType = pet.type ? pet.type.toLowerCase() : '';

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <section className="section flex-col justify-between relative pt-10">
      <div
        id="petDetails"
        className=" bg-base-300 rounded-lg shadow-lg p-8 container min-h-[80dvh] flex flex-col items-center justify-center mx-auto mt-8"
      >
        <div className="flex justify-start w-full">
          <h1 className="text-3xl font-bold mb-1">
            {pet.name}
            {pet.featured && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral ">
                FEATURED
              </span>
            )}
            {pet.tame && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral ">
                TAME
              </span>
            )}
            {pet.pedigreeKnown && (
              <span className="badge badge-secondary py-3 ml-4 rounded-xl text-neutral ">
                PEDIGREE KNOWN
              </span>
            )}
          </h1>
        </div>
        <div className=" w-full ">
          <img
            className="rounded-lg float-start m-6"
            src={`/images/pets/${petType}s/${pet.photo}`}
            alt={pet.name}
            style={{ width: '650px', height: 'auto' }}
          />
          <div>
            <p className="">
              <span className=" font-bold">Type: </span>
              {pet.type}
            </p>
            <p className="">
              <span className=" font-bold">Color: </span>
              {pet.color}
            </p>
            <p className="">
              <span className=" font-bold">Age: </span>
              {pet.age}
            </p>
            <p className="">
              <span className=" font-bold">Gender: </span>
              {pet.gender}
            </p>
            {petType === 'bird' && (
              <div>
                <p className="">
                  <span className=" font-bold">Species: </span>
                  {pet.species}
                </p>
              </div>
            )}
            {petType !== 'bird' && (
              <div>
                <p className="">
                  <span className=" font-bold">Breed: </span>
                  {pet.breed}
                </p>
              </div>
            )}
            <p className="">
              <span className=" font-bold">Location: </span>
              {pet.location}
            </p>

            {(petType === 'bird' || petType === 'hamster') && (
              <div>
                <p className="">
                  <span className=" font-bold">Health: </span>
                  {pet.health}
                </p>
              </div>
            )}
            {petType === 'bird' && (
              <div>
                <p className="">
                  <span className=" font-bold">Special Needs: </span>
                  {pet.specialNeeds}
                </p>
              </div>
            )}

            {(petType === 'cat' ||
              petType === 'dog' ||
              petType === 'rabbit') && (
              <div>
                <p className="">
                  <span className=" font-bold">Vaccination History: </span>
                  {pet.vaccinationHistory}
                </p>
                <p className="">
                  <span className=" font-bold">Disability: </span>
                  {pet.disability}
                </p>
              </div>
            )}
            <p className="">
              <span className=" font-bold">Description: </span>
              {pet.description}
            </p>
            <div className=" flex justify-center">
              <Link
                to={`/pets/${petId}/enquiry`}
                className="btn btn-accent mt-4"
              >
                <TbLocationQuestion />
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default PetDetails;
