import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Congratulations!</h2>
        <p className="text-lg text-gray-700 mb-6">Your donation was successful.</p>
        <Link
          to="/"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default Success;
