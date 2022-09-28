
import './index.scss';
import UserReview from '../UserReview';
import Auth from '../../utils/auth';
import PhotoForm from '../PhotoForm';
import Comments from '../Comments';
import { useEffect, useState } from 'react';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_HEART, REMOVE_HEART,UPDATE_FAV_RESTS } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries';

const RestaurantCard = ({restaurants}) =>{

  //setup a state for the current restaurants 
  const [currentRests, setCurrentRests] = useState();
  const [currentUser, setUser] = useState();
  // create loggedIn variable
  const loggedIn = Auth.loggedIn();
  // pull user data
  const { data } = useQuery(QUERY_ME)
  let userData =  data?.me;
  let restState = restaurants;

  const [addHeart] = useMutation(ADD_HEART);
  const [removeHeart] = useMutation(REMOVE_HEART);
  const [addFavoriteRest] = useMutation(UPDATE_FAV_RESTS);
  
  

  
  useEffect(() =>{
    if(restState){

      setCurrentRests(restState);
    }


  },[restState])




  // click handler for when hearts are clicked
  const heartClickHandler = (e) =>{
    let restToSave = e.target.getAttribute("data-id");
    setUser({...userData});
    console.log(currentUser)
    console.log(currentRests)
    // check if heart exists in the users favorite restaurant if it does remove it from the restaurant and the user
      if(currentUser.favRests.map(rest => rest._id === restToSave)){
        console.log('hello true')
          try{
            removeHeart({
              variables: {heartId: restToSave}
            })
          }
            catch(err){
              console.error(err);
            }

            let newFavRests = currentUser.favRests.filter(favRest => favRest._id !== restToSave);
            console.log(newFavRests)

            // setCurrentRests(restState.map(rest=> {
            //   if(rest._id === restToSave){
            //     return {...rest, favRests: newFavRests}
            //   }
            //   else{
            //     return rest
            //   }
            // }))
         return setUser({...currentUser, favRests: newFavRests})
      }
      // if heart does not exists add to users favorite restaurant and hearts 
        try {
        
          addHeart({
          variables:  {restId: restToSave}  }
        );
    
      } catch (err) {
        console.error(err);
      }
      let favRestArray = [...currentUser.favRests, {_id: restToSave}];
      console.log("This is the fav array " + favRestArray);
      
      return setUser({...currentUser, favRests: favRestArray})

    }

const handleTestBtn = (e) =>{
  
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
                              
                                {heartsCount ? <div  id='pop-res-bottom' data-id={_id} onClick={heartClickHandler}> 
                                                  <i id='heart-svg' data-id={_id}  className={`fa-solid fa-heart p-2 mx-1 pink-heart`} key={restName}></i>
                                                  <span id='heart-span'>{`${heartsCount}`}</span></div> 
                                                : 
                                                <div  id='pop-res-bottom' data-id={_id} onClick={heartClickHandler}> 
                                                  <i id='heart-svg' data-id={_id}  className={`fa-solid fa-heart p-2 mx-1`} key={restName}></i>
                                                  <span id='heart-span'>{`${heartsCount}`}</span>
                                               </div>}
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
