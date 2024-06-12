import React from 'react';

const TeamCard = ({ name, role, pic }) => {
  return (
    <div className="max-w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-xl" src={pic} alt="team member" />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {role}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {name}
        </p>
      </div>
    </div>
  );
};

export default TeamCard;
