import React from 'react';


const Search = ({pets, locations, speciesOrBreeds, handleLocationChange}) => {
  return (
    <form>
      <div className="flex justify-end py-7">
      <select className="select select-accent w-full max-w-[200px] cursor-pointer" onChange={handleLocationChange}>
          {locations.map((loc, index) => (
            <option key={index}>
              {loc}
            </option>
          ))}
        </select>
        <select className="select select-accent w-full max-w-[200px] cursor-pointer">
          {pets.map((type, index) => (
            <option key={index}>
              {type}
            </option>
          ))}
        </select>{
          speciesOrBreeds && speciesOrBreeds.length > 0 && (
            <select className="select select-accent w-full max-w-[200px] cursor-pointer">
              {speciesOrBreeds.map((spec, index) => (
                <option key={index} {...(index === 0 && 'disabled selected')}>
                  {spec}
                </option>
              ))}
            </select>
          )
        }
        {/* <select className="select select-accent w-full max-w-[200px] cursor-pointer">
          {speciesOrBreeds?.map((spec, index) => (
            <option key={index} {...(index === 0 && 'disabled selected')}>
              {spec}
            </option>
          ))}
        </select> */}

      </div>
    </form>
  );
};

export default Search;
