import { combineReducers } from 'redux';
import { QUERY_RESTAURANTS } from './utils/queries';
import { useQuery } from '@apollo/client';

const initialState = {
  restaurants: [],
  currentPage: 0,
  perPage: 10,
};

function restaurantReducer(state = initialState.restaurants, action) {
  switch (action.type) {
    case 'restaurant/setRestaurants':
      return action.payload;
    default:
      return state;
  }
}

function currentPageReducer(state = initialState.currentPage, action) {
  switch (action.type) {
    case 'currentPage/set':
      return action.payload;
    default:
      return state;
  }
}

function perPageReducer(state = initialState.perPage, action) {
  switch (action.type) {
    case 'perPage/set':
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  currentPage: currentPageReducer,
  perPage: perPageReducer,
});

export function setCurrentPage(currentPage) {
  return { type: 'currentPage/set', payload: currentPage };
}

export function useRestaurantQuery() {
  // your implementation here
  const { data } = useQuery(QUERY_RESTAURANTS);
  return data?.restaurants || [];

}

export default rootReducer;
export const selectRestaurants = state => state.restaurants;
export const selectCurrentPage = state => state.currentPage;
export const selectPerPage = state => state.perPage;
