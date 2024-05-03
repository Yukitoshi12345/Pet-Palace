import React from 'react';
import Hero from '../components/Hero';
import { home } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { QUERY_FEATURED_PETS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_FEATURED_PETS);
  const featuredPets = data?.featuredPets || [];

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        staggerChildren: 0.03,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <section id="home" className="section">
      <div className="container mx-auto">
        <div className="relative">
          <img
            src={home.hero}
            alt="big animal adoption photo"
            className="h-[40dvh] w-full object-cover object-top -z-10"
          />
          <div className="max-w-[350px] text-xl text-justify text-white font-semibold absolute right-12 top-10 z-10 leading-10">
            <motion.div variants={sentence} initial="hidden" animate="visible">
              {home.plea.split('').map((char, index) => (
                <motion.span key={index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
            <AnimatePresence>
              <motion.div
                key="donationButton"
                className="flex justify-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 4.0, ease: 'easeInOut' }}
              >
                <button className="btn btn-accent capitalize">
                  {home.donationIcon}
                  {home.donation}
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* about section */}
        <div className="md:join divide-y-2 md:divide-y-0 md:divide-x-2 divide-dotted">
          {home.about.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4"
            >
              <h2 className="text-4xl font-bold text-accent">{item.heading}</h2>
              <p className="text-lg text-center ">{item.paragraph}</p>
            </div>
          ))}
        </div>

        {/* charity registration section  */}
        <div className='bg-base-200 py-5 my-4'>
          <h3 className="text-2xl font-bold  text-center">
            {home.registrationHeading}
          </h3>
          <div className="flex flex-col md:flex-row justify-around items-center">
            {home.regos.map((rego, index) => (
              <div key={index}>
                <img src={rego} alt="registration" className="h-36" />
              </div>
            ))}
          </div>
        </div>

        {/* feature pets section  */}
        <div className=''>
          <h3 className="text-2xl font-bold  text-center">{home.featured}</h3>
          <div className="flex flex-wrap items-center justify-center p4 gap-4">
            
            {loading ? (
              <span className="loading loading-bars loading-lg"></span>
            ) : (
              featuredPets.map((pet, index) => (
                console.log(`../assets/images/pets/${pet.type}s/${pet.photo}`),
                
                <div key={index} className="card w-96 bg-base-200 shadow-xl">
                  <figure>
                    <img src={`../assets/images/pets/${pet.type.toLowerCase()}s/${pet.photo}`} alt="featured pet" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {pet.name}
                      <div className="badge badge-secondary">FEATURED</div>
                    </h2>
                    <p>{pet.location}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">{pet.age}years</div>
                      <div className="badge badge-outline">{pet.breed || pet.species}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Home;
