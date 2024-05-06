import React from 'react';
import Footer from '../components/Footer';
import Search from '../components/Pets/Search';
import PetListing from '../components/Pets/PetListing';

const Pets = () => {
  return (
    <section
      id="pets"
      className="section flex-col justify-between relative pt-10"
    >
      <div className="container mx-auto">
        <div className=" bg-base-200 flex-col lg:flex-row">
          <Search />
          
          <PetListing />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pets;
