import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PETS } from '../../../utils/queries';
import PetCard from './PetCard';
import Pagination from './Pagination';

const PetListing = () => {
  const petsLimit = 6;
  const { loading, data, fetchMore } = useQuery(QUERY_PETS, {
    variables: { petsLimit: petsLimit },
  });

  const edges = data?.pets.edges || [];
  const totalCount = data?.pets.totalCount || 0;
  const startIndex =  1;
  const [endIndex, setEndIndex] = useState(petsLimit);
  const hasNextPage = data?.pets.pageInfo.hasNextPage;
  const endCursor = data?.pets.pageInfo.endCursor;

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
    <main>
      <div className="md:grid md:grid-cols-3 md:gap-4">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          edges.map((edge, index) => (
            <PetCard key={index} index={index} pet={edge.node} />
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
