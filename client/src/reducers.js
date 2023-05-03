// Import combined is from Redux library to combine reducers into one.
import { combineReducers } from 'redux';
// Import Query Restaurants - this is the query that will be used to get the restaurants from the database.
import { QUERY_RESTAURANTS } from './utils/queries';
// Import useQuery from Apollo Client library to make the query request.
import { useQuery } from '@apollo/client';

// Create initial state for the reducers.
const initialState = {
  restaurants: [],
  currentPage: 0,
  perPage: 10,
  userHearts: [],
  user:[],
};

//Create a reducer to handle user data.
function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case 'user/setUser':
      return action.payload;
    default:
      return state;
  }
}

// Create a reducer to handle user heart data.
function userHeartReducer(state = initialState.userHearts, action) {
  switch (action.type) {
    case 'userHearts/setUserHearts':
      return action.payload;
    default:
      return state;
  }
}

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
  userHearts: userHeartReducer,
  user: userReducer,
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

export const selectUserHearts = state => state.userHearts;
export const selectRestaurants = state => state.restaurants;
export const selectCurrentPage = state => state.currentPage;
export const selectPerPage = state => state.perPage;
export const selectUser = state => state.user;

