import './index.scss';
import { useEffect, useState } from 'react';



function SmallRestCard ({restaurants}){
    
    

    const [currentRests, setCurrentRests] = useState();


    let restState = restaurants;

    useEffect(() =>{
      if(restState){
  
        setCurrentRests(restState);
      }
   
    },[restState])

if(currentRests){
    return(
        <>



{currentRests.map(({restPhotos}) =>(
                           <div id='smallRestCarBody' key={restPhotos + Date.now()}>
                           {restPhotos[0] ? <img src={restPhotos[0].photoUrl} alt=''></img> : <img src="" alt=''></img> }
    
                            </div>
                        
                ))}
     
     </>

     
    )




}

}

export default SmallRestCard;