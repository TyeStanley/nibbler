import React, { useState } from 'react';
import SmallRestCard from './SmallRestCard';
import Pagination from 'react-paginate';

import { useQuery } from '@apollo/client';
import { QUERY_RESTAURANTS } from '../../utils/queries';
    

function RestaurantList() {

  const { restaurants} = useQuery(QUERY_RESTAURANTS)
  // setup state for current page
  const [currentPage, setCurrentPage] = useState(0);

  // setup how many components per page
  const perPage = 10;

  // calculate the total number of pages
  const totalPages = Math.ceil(restaurants.length / perPage);

  // slice the current restaurants based on the current page
  const currentRests = restaurants.slice(currentPage * perPage, currentPage * perPage + perPage);

  // handle page change
  function handlePageClick({ selected }) {
    setCurrentPage(selected);
  }

  return (
    <>
      <div className="restaurant-list">
        {currentRests.map(restaurant => <SmallRestCard restaurant={restaurant} key={restaurant._id} />)}
      </div>
      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageClick}
        forcePage={currentPage}
      />
    </>
  );
}

export default RestaurantList;
