import React from 'react';
import {search} from '../../../data';

const Search = () => {
  console.log(search.petTypes);
  return (
    <form>

      <select className="select select-accent w-full max-w-xs">
        {
          search.petTypes.map((type, index) => (
            <option key={index}  {...( index ===0 && 'disabled selected')}>{type}</option>
          ))
        }
      </select>
    </form>
  );
};

export default Search;
