import './index.scss';
import { useMutation,useQuery } from '@apollo/client';
import { ADD_HEART, REMOVE_HEART,UPDATE_FAV_RESTS } from '../../utils/mutations';
import { QUERY_ME} from '../../utils/queries';

function Hearts({_id,currentRests,setCurrentRests, currentUser,setUser, heartsCount, restName}) {

    const { data } = useQuery(QUERY_ME)

    let userData =  data?.me;

    const [addHeart] = useMutation(ADD_HEART);
    const [removeHeart] = useMutation(REMOVE_HEART);

    const checkHeartedStatus = (id)=>{

   
        // make sure there is favorited restaurants and if there is check and see if the current restaurant is hearted
        if(currentUser && currentUser.favRests){
          let heartedRest = '';
            heartedRest = currentUser.favRests.find(rest => rest._id === id); 
        
           if(heartedRest !== undefined){
            return true;
    
          }
          else{
            return false
          }
        }
  
      
      }




      // click handler for when hearts are clicked
  const heartClickHandler = (e) =>{
    
    let restToSave = e.target.getAttribute("data-id");

    if(currentUser === undefined){
      setUser({...userData});
    }

    let restExists = '';

    if(currentUser.favRests !== undefined){
       restExists = currentUser.favRests.filter(rest =>{
            if(restToSave  === rest._id){
              console.log(rest)
              return rest
            }
            else{
              return
            }
      })
  }

    
 

    // check if heart exists in the users favorite restaurant if it does remove it from the restaurant and the user
    // Checks to see if the user has any favorite restauarnts and then checks if one of them matches the currently selected ones
      if(restExists.length > 0){
        console.log('hello true')
        // if it does exit remove the heart from the restaurant
          try{
            removeHeart({
              variables: {heartId: restToSave}
            })
          }
            catch(err){
              console.error(err);
            }
            // change this to a splice????? === 
            let newFavRests = currentUser.favRests.filter(favRest => favRest._id !== restToSave);
            let currentSelectedRest = currentRests.filter(rest => rest._id === restToSave );
            let currentHeartsArray = currentSelectedRest[0].hearts.filter(heart => heart.targetId !== restToSave);
            let updateRest = currentRests.map(rest =>{
              
                        if(rest._id === currentSelectedRest[0]._id){
                         
                          return rest = { ...rest, hearts: currentHeartsArray, heartsCount: rest.heartsCount - 1}
                        }
                        else{
                          return rest
                        }
            } );
            setCurrentRests(updateRest)
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
      
      let newFavRests = currentUser.favRests.filter(favRest => favRest._id !== restToSave);
      let currentSelectedRest = currentRests.filter(rest => rest._id === restToSave );
      let currentHeartsArray = currentSelectedRest[0].hearts.filter(heart => heart.targetId !== restToSave);
      let updateRest = currentRests.map(rest =>{
        
                  if(rest._id === currentSelectedRest[0]._id){
                   
                    return rest = { ...rest, hearts: currentHeartsArray, heartsCount: rest.heartsCount + 1}
                  }
                  else{
                    return rest
                  }
      } );
      setCurrentRests(updateRest)
      
      return setUser({...currentUser, favRests: favRestArray})

    }
    
    return (
        <>

        {checkHeartedStatus(_id)
            ? <div  id='pop-res-bottom' data-id={_id} className="d-flex flex-row hearts" onClick={heartClickHandler} >  
              <i id='heart-svg' data-id={_id} className={`fa-solid fa-heart p-2 mx-1 pink-heart `}key={restName}></i>
              <span id='heart-span'>{`${heartsCount}`} </span></div> 
            :
            <div  id='pop-res-bottom' data-id={_id} className="d-flex flex-row hearts" onClick={heartClickHandler} >  
              <i id='heart-svg' data-id={_id} className={`fa-solid fa-heart p-2 mx-1`}key={restName}></i>
              <span id='heart-span'>{`${heartsCount}`} </span></div> 
                            
        }

        </>

        )
    
  } 



export default Hearts;