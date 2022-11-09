import './index.scss';
import { useEffect, useState } from 'react';
import {useQuery } from '@apollo/client';
import { QUERY_ME} from '../../utils/queries';
import Hearts from '../Hearts';
import Auth from '../../utils/auth';

function SmallRestCard ({restaurants}){
    
    

   //setup a state for the current restaurants 
  const [currentRests, setCurrentRests] = useState();
  const [currentUser, setUser] = useState();
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
                           <div id='smallRestCardBody' key={_id + Date.now()}>
                             <div>
                              <h1>{restName}</h1>
                            <Hearts _id ={_id} currentRests ={currentRests} setCurrentRests={setCurrentRests} currentUser={currentUser} setUser={setUser} heartsCount ={heartsCount} restName={restName}  />
                           </div>
                            {restPhotos[0] ? <img src={restPhotos[0].photoUrl} alt=''></img> : <img src="" alt=''></img> }
                          
                            
                            </div>
                        
                ))}
     
     </>

     
    )




}

}

export default SmallRestCard;