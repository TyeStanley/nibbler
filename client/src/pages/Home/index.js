import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRestaurants,
  
} from '../../reducers';
import { QUERY_RESTAURANTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import SmallRestCard from '../../components/SmallRestCard';
import './index.scss';

const Home = () => {
    

     // setup state for current page
     const restaurants = useSelector(selectRestaurants);
     // setup dispatch
     const dispatch = useDispatch();
     // This is going to query for initial restaurant data
     const { data } = useQuery(QUERY_RESTAURANTS);
     // If we have data, we will set the restaurants in the store
     useEffect(() => {
         if (data) {
             // sends the new found data to the store in the form of an action
           dispatch({ type: 'restaurant/setRestaurants', payload: data.restaurants });
         }
       }, [data, dispatch]);

    return (
        <>
            <section className='p-5 bg-primary text-white text-center' id='hero-section'></section>
            <section className='text-center pt-3' id='intro-statement'>
                <div className='intro-titles'>
                    <h2 className='pt-2 pb-3' id='intro-h2'>
                        Save your favorite spots | Share them with friends | Find something new
                    </h2>
                </div>
                <h3 className='p-3' id='recentUploads'>PLACEHOLDER FOR FILTER BAR</h3>
            </section>
            <section id='intro-restaurants' className='border-primary d-flex flex-column'>
                <div className='d-flex flex-column' id='recent-uploads-div'>
                    {restaurants && <SmallRestCard  />}
                </div>
            </section>
        </>
    );
};

export default Home;
