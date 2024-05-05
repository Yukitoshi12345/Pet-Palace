import React from 'react';
import Footer from '../components/Footer';
import Search from '../components/Pets/Search';
import PetListing from '../components/Pets/PetListing';

const Pets = () => {
  return (
    <section id="pets" className="section flex-col justify-between relative">
      <div>
        <div className="container mx-auto">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              {/* <Search /> */}
              <div>
                <PetListing />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Pets;
