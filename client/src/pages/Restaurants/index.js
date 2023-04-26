import React from 'react';
import SmallRestCard from '../../components/SmallRestCard';
import Pagination from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRestaurants,
  selectCurrentPage,
  setCurrentPage,
  selectPerPage,
  useRestaurantQuery,
} from '../../reducers';

function RestaurantList() {
  const restaurants = useSelector(selectRestaurants);
  const currentPage = useSelector(selectCurrentPage);
  const perPage = useSelector(selectPerPage);
  const dispatch = useDispatch();
  const currentRests = restaurants.slice(currentPage * perPage, currentPage * perPage + perPage);

  function handlePageClick({ selected }) {
    dispatch(setCurrentPage(selected));
  }

  const data = useRestaurantQuery();
  dispatch({ type: 'restaurant/setRestaurants', payload: data });

  const totalPages = Math.ceil(restaurants.length / perPage);

  return (
    <>
      <div className="restaurant-list">
        {currentRests.map((restaurant) => (
          <SmallRestCard restaurant={restaurant} key={restaurant._id} />
        ))}
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
