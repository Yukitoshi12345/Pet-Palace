import React from 'react';

const Pagination = ({
  startIndex,
  endIndex,
  totalCount,
  hasPreviousPage,
  hasNextPage,
  handlePrev,
  handleNext,
  fetchMore,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* <!-- Help text --> */}
      <span className="text-sm ">
        Showing <span className="font-semibold  text-neutral">{startIndex}</span> to{' '}
        <span className="font-semibold  text-neutral">{endIndex}</span> of{' '}
        <span className="font-semibold text-neutralte">{totalCount}</span> Pets
      </span>
      {/* <!-- Buttons --> */}
      <div className="inline-flex mt-2 xs:mt-0">
        {hasPreviousPage && (
          <button className="flex items-center justify-center px-3 h-8 text-sm font-medium  rounded-s :bg-base-200 border-base-100 hover:bg-secondary hover:text-neutral" onClick={handlePrev}>
            Prev
          </button>
        )}
        {hasNextPage && (
          <button className="flex items-center justify-center px-3 h-8 text-sm font-medium  border-0 border-s rounded-e bg-base-200 border-base-100 hover:bg-secondary hover:text-neutral" onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
