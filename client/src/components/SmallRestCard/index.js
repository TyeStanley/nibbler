import React from 'react';
import { useDispatch } from 'react-redux';
import { selectRestaurants,selectUserHearts } from '../../reducers';
import './index.scss';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Auth from '../../utils/auth';


function SmallRestCard() {
  // initialize dispatch - dispatches actions to the store - this is how we update the store
  const dispatch = useDispatch();
  // create loggedIn variable
  const loggedIn = Auth.loggedIn();
  // setup state for current page - this is how we access the current store state
  const restaurants = useSelector(selectRestaurants);
  // setup up const for userHeart count using selectUserHears from the reducer
  const userHearts = useSelector(selectUserHearts);

  const handleHeartClick = (e,_id) => {
    // Check to see if user has already hearted the restaurant
    const userHearted = userHearts.includes(_id);
    console.log(userHearts)

    let updatedUserHearts;
    
    if(!userHearted){
      console.log("Not hearted yet")
      updatedUserHearts = [...userHearts, _id];
    } else {  
      updatedUserHearts = userHearts.filter((heart) => heart !== _id);
    }
    dispatch({ type: 'userHearts/setUserHearts', payload: updatedUserHearts })

    const updatedRests = restaurants.map((rest) => {
      if (rest._id === _id && !userHearted) {
        return {
          ...rest,
          heartsCount: rest.heartsCount + 1, 
          userHearts: [...userHearts, _id],
        };
      }
      else if (userHearted && userHearts.includes(rest._id)) {
        return {
          ...rest,
          heartsCount: rest.heartsCount - 1,
        };
      }
      else {
        return rest;
      }
    });
    dispatch({ type: 'restaurant/setRestaurants', payload: updatedRests });
    
  };
  
  

  
  if (restaurants) {
    return (
      <div className="rest-card-container">
        {restaurants.map(({ restName, restPhotos, heartsCount, comments, _id }, index) => (
          <div className="rest-card" key={_id}>
            <Carousel>
              {restPhotos.map(({photoUrl}, i) => (
                <Carousel.Item key={i}>
                  <img src={photoUrl} alt="" />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="rest-card-info">
              <h2 className="rest-card-title">{restName}</h2>
              <div className="rest-card-details">
              {Auth.loggedIn() ? (
                        <div className="rest-card-hearts" onClick={(e) => handleHeartClick(e, _id)}>
                          <i className="fas fa-heart"></i> {heartsCount}
                        </div>
                    ) : (
                        <div className="rest-card-hearts">
                          <i className="fas fa-heart"></i> {heartsCount}
                        </div>
                    )}
  
                <div className="rest-card-comments">
                  <i className="fas fa-comment"></i> {comments.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
  
  }

export default SmallRestCard;
