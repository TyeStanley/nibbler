
import './index.scss';
import UserReview from '../UserReview';
import Auth from '../../utils/auth';
import PhotoForm from '../PhotoForm';
import Comments from '../Comments';
import { useEffect, useState } from 'react';
import {useQuery } from '@apollo/client';
import { QUERY_ME} from '../../utils/queries';
import Hearts from '../Hearts';

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

  useEffect(() =>{
    if(restState){

      setCurrentRests(restState);
    }
    if(currentUser === undefined){
      setUser(userData);
  
    }
  },[restState])

  
if(currentRests){
  return(
        <>      
               
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
                              
                      
                                            
                                <Hearts _id ={_id} currentRests ={currentRests} setCurrentRests={setCurrentRests} currentUser={currentUser} setUser={setUser} heartsCount ={heartsCount} restName={restName}  />
                                                         
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
