import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { QUERY_PETS } from '../../../utils/queries';
import PetCard from './PetCard';
import Pagination from './Pagination';

const PetListing = () => {
  const petsLimit = 6;
  const [cursor, setCursor] = useState(null);
  const { loading, data, error, fetchMore } = useQuery(QUERY_PETS, {
    variables: { petsLimit: petsLimit, cursor: cursor || null },
  });

  const edges = data?.pets.edges || [];
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(edges.length);
  const hasPreviousPage = data?.pets.pageInfo.hasPreviousPage;
  const hasNextPage = data?.pets.pageInfo.hasNextPage;

  const handleNext = () => {
    // setStartIndex(startIndex + petsLimit);
    // setEndIndex(endIndex + petsLimit);
    const endCursor = data?.pets.pageInfo.endCursor;
    // setCursor(endCursor);
    fetchMore({
      variables: { petsLimit: petsLimit, cursor: endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.pets.edges;
        const newPageInfo = fetchMoreResult.pets.pageInfo;
        return newEdges.length
          ? {
              pets: {
                __typename: prevResult.pets.__typename,
                edges: [...prevResult.pets.edges, ...newEdges],
                pageInfo: newPageInfo,
              },
            }
          : prevResult;
      },
    });
  };

  const handlePrev = () => {
    setStartIndex(startIndex - petsLimit);
    setEndIndex(endIndex - petsLimit);
    const startCursor = data?.pets.pageInfo.startCursor;
    setCursor(startCursor);
  };
  if (error) return <div>error</div>;
  return (
    <main>
      <div className="md:grid md:grid-cols-3 md:gap-4">
        {loading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          edges.map((edge, index) => (
            <NavLink
              key={index}
              to={`/pets/${edge.node?._id}`}
              className="no-underline"
            >
              <PetCard index={index} {...edge.node} />
            </NavLink>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {/* You can remove the console.log statements */}
        <Pagination
          startIndex={startIndex}
          endIndex={endIndex}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          totalCount={data?.pets.totalCount || 0}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </main>
  );
};

export default PetListing;
