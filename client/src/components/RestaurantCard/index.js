// import './index.scss';
import './restaurantCard.css';
import uuid from 'uuid';
// Components
import UserReview from '../UserReview';
import PhotoForm from '../PhotoForm';
import Comments from '../Comments';
// Utils and React Hooks
import { saveFavRestIds, getFavRestIds } from '../../utils/localStorage';
import Auth from '../../utils/auth';
import { useEffect, useState } from 'react';
// GraphQL
import { useMutation, useQuery } from '@apollo/client';
import { ADD_HEART, REMOVE_HEART } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

export default function RestaurantCard({restaurants}) {
  // create loggedIn variable
  const loggedIn = Auth.loggedIn();
  const { data } = useQuery(QUERY_ME)
  const userData =  data?.me;

  // hold saved favorite restaurants
  const [savedFavRestIds, setFavRestIds ] = useState(getFavRestIds());
  const [addHeart] = useMutation(ADD_HEART);
  const [removeHeart] = useMutation(REMOVE_HEART);
  
  useEffect(() =>{
    return () => saveFavRestIds(savedFavRestIds);
  })

  // click handler for when hearts are clicked
  function heartClickHandler(e) {
    let restToSave = e.target.getAttribute("data-id");
    const existingHeart = savedFavRestIds.filter(item => item === restToSave);

    // logic to remove hearts / check if the post has been hearted
    if (existingHeart.length) {
      // filters out the restaurant that was selected
      const restaurantArr = restaurants.filter(restaurant => restaurant._id === restToSave);
      // sets the restaurant
      const restaurant = restaurantArr[0];
      const findHeart = restaurant.hearts.filter(heart => heart.user._id === userData._id);
      const heartToBreak = findHeart[0]._id;

      try {
        removeHeart(
          { variables: { heartId: heartToBreak } }
        );
              
        // setups of a list of new restaruants
        const newFavRests = savedFavRestIds.filter(id => id !== restToSave);
        // if book successfully saves to user's account
        setFavRestIds([...newFavRests]);
              
      } catch (err) {
        console.error(err);
      }

    } else {

      try {
        addHeart(
          { variables: {restId: restToSave} }
        );
        // if book successfully saves to user's account, save restId to state
        setFavRestIds([...savedFavRestIds, restToSave]);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return(
    <>
      {restaurants.map(({ restName, restPhotos, heartsCount, comments, _id }) => (                         
        <div key={_id + Date.now()}>
                          
          <h5>{restName}</h5>

          <div>
            <div data-ride='carousel'>  
              {restPhotos && restPhotos.map(({photoUrl}) => (                      
                <img 
                  src={photoUrl}
                  alt={photoUrl}
                  key={photoUrl + '534'} 
                />
              ))}
              {loggedIn && <PhotoForm restId={_id} key={restName + "hoah123"} />} 
            </div>   
                                
            {savedFavRestIds?.some((savedId) => savedId === _id)
              ? <div data-id={_id} onClick={heartClickHandler}> 
                  <i 
                    data-id={_id} 
                    className={`fa-solid fa-heart p-2 mx-1 pink-heart`}
                    key={restName} 
                  />
                  <span>{`${heartsCount +1}`}</span>
                </div>
              : <div data-id={_id} onClick={heartClickHandler}>
                  <i 
                    data-id={_id}
                    className={`fa-solid fa-heart p-2 mx-1`}
                    key={restName} 
                  />
                  <span id='heart-span'>{`${heartsCount}`}</span>
                </div>}
                {comments && <UserReview comments={comments} />}
                {loggedIn && (<Comments restId={_id} />
            )}  
                                  
          </div>
        </div>
      ))}
    </>             
  );
};
