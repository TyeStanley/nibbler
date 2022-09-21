
import './index.scss';
import UserReview from '../UserReview';
import Auth from '../../utils/auth';
import PhotoForm from '../PhotoForm';
import Comments from '../Comments';
import { saveFavRestIds, getFavRestIds } from '../../utils/localStorage';
import { useEffect, useState } from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_HEART, REMOVE_HEART } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries';

const RestaurantCard = ({restaurants}) =>{

  //setup a state for the current restaurants 
  const [currentRests, setCurrentRests] = useState();
  const [currentUser, setUser] = useState();
    // create loggedIn variable
    const loggedIn = Auth.loggedIn();

 
      const { data } = useQuery(QUERY_ME)


      let userData =  data?.me;
      

    
  // hold saved favorite restaurants
  const [savedFavRestIds, setFavRestIds ] = useState(getFavRestIds());

  const [addHeart] = useMutation(ADD_HEART);
  const [removeHeart] = useMutation(REMOVE_HEART);
  
  let restState = restaurants;

  
  useEffect(() =>{
    if(restState){

      setCurrentRests(restState);
    }
  

    
  },[restState,userData])

  


  // click handler for when hearts are clicked
  const heartClickHandler = (e) =>{
    let restToSave = e.target.getAttribute("data-id");
    // const existingHeart = savedFavRestIds.filter(item => item === restToSave);
    // logic to remove hearts / check if the post has been hearted
  

        try {
        
          addHeart({
          variables:  {restId: restToSave}  }
        );
        // if book successfully saves to user's account, save restId to state
        setFavRestIds([...savedFavRestIds, restToSave]);
      } catch (err) {
        console.error(err);
      }

    }

const handleTestBtn = (e) =>{
  
    //  if(userData){userData = {...userData, favRests:['hello']};}
    
   
    //  restState[0] = {[{...restState}]}
        setCurrentRests(restState.map(rest=> {
          if(rest.restName=== 'Ramen Tatsu-ya'){
            return {...rest, restName: "Hello"}
          }
          else{
            return rest
          }
        }))

    
}
  
if(currentRests){
  return(
        <>      
                <button id='testbutton'  onClick={handleTestBtn}>testbutton</button>
                {currentRests.map(({restName,restPhotos,heartsCount,comments, _id}) =>(
                        <div className="card m-1 border border-dark " key={_id + Date.now()}>
                              <h5 className="card-header" id='rest-card-header' >{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel'>  
                                    {restPhotos && restPhotos.map(({photoUrl}) => (
                                      <img src={photoUrl} className='col-8 col-md-4 p-1 card-photo' alt={photoUrl} key={photoUrl + '534'} ></img>
                                        ))}
                                        {loggedIn && <PhotoForm restId={_id} key={restName + "hoah123"}> </PhotoForm>} 
                                    </div>   
                              
                                {/* {savedFavRestIds?.some((savedId) =>  savedId === _id) ? <div  id='pop-res-bottom' data-id={_id} onClick={heartClickHandler}> <i id='heart-svg' data-id={_id}  className={`fa-solid fa-heart p-2 mx-1 pink-heart`} key={restName}></i><span id='heart-span'>{`${heartsCount +1}`}</span></div> : <div  id='pop-res-bottom' data-id={_id} onClick={heartClickHandler}> <i id='heart-svg' data-id={_id}  className={`fa-solid fa-heart p-2 mx-1`} key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>} */}
                                {comments && <UserReview comments={comments}  ></UserReview>}
                                {loggedIn && (
                                  
                                  <Comments restId={_id}/>
                                  
                                  
                  
                                )}  
                                
                                
                              </div>
                          </div>
                        
                      

                ))}
        </>
                
              

    );

  }

}



export default RestaurantCard;
