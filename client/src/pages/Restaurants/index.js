// import React, { useEffect} from 'react';
// import SmallRestCard from '../../components/SmallRestCard';
// import Pagination from 'react-paginate';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectRestaurants,
//   selectCurrentPage,
//   setCurrentPage,
//   selectPerPage,
//   rootReducer,
// } from '../../reducers';
// import { QUERY_RESTAURANTS } from '../../utils/queries';
// import { useQuery } from '@apollo/client';

// function RestaurantList() {
//   // setup state for current page
//   const restaurants = useSelector(selectRestaurants);
//   const currentPage = useSelector(selectCurrentPage);
//   const perPage = useSelector(selectPerPage);
// // setup dispatch
//   const dispatch = useDispatch();
//   const { data } = useQuery(QUERY_RESTAURANTS);

//   // const currentRests = restaurants.slice(currentPage * perPage, currentPage * perPage + perPage);
  
  

//   useEffect(() => {
//     if (data) {
//       setLoadedRestaurants(data.restaurants);
//     }
//   }, [data]);

//   function handlePageClick({ selected }) {
//     dispatch(setCurrentPage(selected));
//   }
//   console.log(data)
//   const totalPages = Math.ceil(loadedRestaurants.length / perPage);

//   return (
//     <>
//       <div className="restaurant-list">
//         {currentRests.map((restaurant) => (
//           <SmallRestCard restaurant={restaurant} key={restaurant._id} />
//         ))}
//       </div>
//       <Pagination
//         pageCount={totalPages}
//         onPageChange={handlePageClick}
//         forcePage={currentPage}
//       />
//     </>
//   );
// }

// export default RestaurantList;
