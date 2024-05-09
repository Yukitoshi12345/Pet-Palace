import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { QUERY_PETS } from '../../../utils/queries';
import PetCard from './PetCard';
import Pagination from './Pagination';

const PetListing = ({loading, pets, fetchMore, petsLimit}) => {
  // const petsLimit = 6;
  // const { loading, data, fetchMore } = useQuery(QUERY_PETS, {
  //   variables: { petsLimit: petsLimit },
  // });

  // const edges = data?.pets.edges || [];
  // const totalCount = data?.pets.totalCount || 0;
  // const startIndex =  1;
  // const [endIndex, setEndIndex] = useState(petsLimit);
  // const hasNextPage = data?.pets.pageInfo.hasNextPage;
  // const endCursor = data?.pets.pageInfo.endCursor;
  const edges = pets?.pets.edges || [];
  const totalCount = pets?.pets.totalCount || 0;
  const startIndex =  1;
  const [endIndex, setEndIndex] = useState(petsLimit);
  const hasNextPage = pets?.pets.pageInfo.hasNextPage;
  const endCursor = pets?.pets.pageInfo.endCursor;

  const handleMore = () => {

    fetchMore({
      variables: { petsLimit: petsLimit, cursor: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.pets.edges;
        const newPageInfo = fetchMoreResult.pets.pageInfo;
        setEndIndex(prevResult.pets.edges.length + newEdges.length);

          
        return newEdges.length
          ? {
              pets: {
                _typename: prevResult.pets._typename,
                edges: [...prevResult.pets.edges, ...newEdges],
                pageInfo: newPageInfo,
                totalCount: fetchMoreResult.pets.totalCount,
              },
              
            }
          : prevResult;
          
      },
      
    });
  };


  return (
    <main className='flex justify-center items-center flex-col pb-6'>

      <div className=" grid grid-cols-auto-fill gap-4">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          edges.map((edge, index) => (
            <Link
              key={index}
              to={`/pets/${edge.node?._id}`}
              className="no-underline"
            >
              <PetCard index={index} {...edge.node} />
            </Link>

          ))
        )}
      </div>
      <div className="flex justify-center">
       
        <Pagination
          startIndex={startIndex}
          endIndex={endIndex}
          hasNextPage={hasNextPage}
          totalCount={totalCount}
          handleMore={handleMore}
        />
      </div>
    </main>
  );
};

export default PetListing;
