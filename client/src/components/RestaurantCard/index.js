
import './index.scss';
import UserReview from '../UserReview';
import Auth from '../../utils/auth';
import PhotoForm from '../PhotoForm';
import Comments from '../Comments';

const RestaurantCard = ({restaurants}) =>{


  // click handler for when hearts are clicked
  const heartClickHandler = () =>{

    console.log('hello')

  }

  // create loggedIn variable
  const loggedIn = Auth.loggedIn();




  return(
        <>
                {restaurants.map(({restName,restPhotos,heartsCount,comments, _id}) =>(
                  
                    
                        
                        <div className="card m-1 border border-dark " key={_id + Date.now()}>
                         
                              <h5 className="card-header" id='rest-card-header' >{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel'>  
                                    {restPhotos && restPhotos.map(({photoUrl}) => (
                                      
                                      <img src={photoUrl} className='col-8 col-md-4 p-1 card-photo' alt={photoUrl} key={photoUrl + '534'} ></img>
                                        ))}
                                        {loggedIn && <PhotoForm restId={_id} key={restName + "hoah123"}> </PhotoForm>} 
                                    </div>   
                              
                                <div  id='pop-res-bottom' onClick={heartClickHandler}> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-1" key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>
                                {comments && <UserReview comments={comments}  ></UserReview>}
                                {loggedIn && (
                                  
                                  <Comments restId={_id}/>
                                  
                  
                                )}  
                                
    
                              </div>
                          </div>
                        
                      

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
