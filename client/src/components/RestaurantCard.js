import { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { saveFavRestIds, getFavRestIds } from '../utils/localStorage';
// GraphQL
import { useMutation, useQuery } from '@apollo/client';
import { ADD_HEART, REMOVE_HEART } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
// Components
import PhotoForm from './PhotoForm';
import Comments from './Comments';
import UserReview from './UserReview';

export default function RestaurantCard({restaurants}) {
  // create loggedIn variable
  const loggedIn = Auth.loggedIn();
  const { data } = useQuery(QUERY_ME)
  const userData =  data?.me;

  // hold saved favorite restaurants
  const [savedFavRestIds, setFavRestIds] = useState(getFavRestIds());
  const [addHeart] = useMutation(ADD_HEART);
  const [removeHeart] = useMutation(REMOVE_HEART);
  
  // useEffects
  useEffect(() =>{
    return () => saveFavRestIds(savedFavRestIds);
  })

  // useStates
  const state = useState({
    open: false,
    index: this.index,
  });

  const handleOpen = index => {
    this.setState({ open: true, index})
  }

  const handleClose = () => {
    this.setState({ open: false })
  }

  // click handler for when hearts are clicked
  function heartClickHandler(e) {
    let restToSave = e.target.getAttribute("data-id");
    const existingHeart = savedFavRestIds.filter(item => item === restToSave);

    // logic to remove hearts / check if the post has been hearted
    if (existingHeart.length) {
      // filters out the restaurant that was selected
      const restaurantArr = restaurants.filter(restaurant => restaurant._id === restToSave);
      console.log(restaurantArr)

      // sets the restaurant
      const restaurant = restaurantArr[0];
      console.log(restaurantArr[0])

      const findHeart = restaurant.hearts.filter(heart => heart.user._id === userData._id);
      
      const heartToBreak = findHeart[0]._id;

      try {
        removeHeart(
          { variables:  { heartId: heartToBreak } }
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
        addHeart({ variables: { restId: restToSave } });
        // if book successfully saves to user's account, save restId to state
        setFavRestIds([...savedFavRestIds, restToSave]);
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <>
      <div id="restaurants-image">
        {restaurants.map(({restName, restPhotos, heartsCount, comments, _id}) => (                      
          <div key={_id + Date.now()} className="card m-1 border border-dark">           
            <h5 className="card-header" id="rest-card-header">{restName}</h5>
            <div className="" id="rest-card-body">
              <div id="card-img-container" className="d-flex carousel slide" data-ride="carousel">  
                {restPhotos && restPhotos.map(({photoUrl, index}) => (
                  <img
                    onClick={this.handleOpen(index)}
                    src={photoUrl}
                    className="col-8 col-md-4 p-1 card-photo"
                    alt={photoUrl}
                    key={photoUrl + '534'} 
                  />
                ))}
                {loggedIn && <PhotoForm restId={_id} key={restName + "hoah123"} />} 
              </div>

              {/* Tenary Operator */}              
              {savedFavRestIds?.some(savedId => savedId === _id)
                ? <div
                    id='pop-res-bottom'
                    data-id={_id}
                    onClick={heartClickHandler}
                  > 
                    <i
                      id='heart-svg'
                      data-id={_id}
                      className={`fa-solid fa-heart p-2 mx-1 pink-heart`}
                      key={restName}>
                    </i>
                    <span
                      id='heart-span'
                    >
                      {`${heartsCount +1}`}
                    </span>
                  </div> 
                : <div
                    id='pop-res-bottom'
                    data-id={_id}
                    onClick={heartClickHandler}
                  >
                    <i
                      id='heart-svg'
                      data-id={_id}
                      className={`fa-solid fa-heart p-2 mx-1`}
                      key={restName}>
                    </i>
                    <span
                      id='heart-span'
                    >
                      {`${heartsCount}`}
                    </span>
                  </div>}
              {comments && <UserReview comments={comments} />}
              {loggedIn && (<Comments restId={_id} />)}  
            </div>
          </div>                   
        ))}
      </div>
    </>         
  )
}
