
import './index.scss';
import UserReview from '../UserReview';
import PhotoForm from '../PhotoForm';

const RestaurantCard = ({restaurants}) =>{

 console.log(restaurants)


  return(
        <>
                {restaurants.map(({restName,restPhotos,heartsCount,comments, _id}) =>(
                  
                    
                        <>
                        <div className="card m-1 border border-dark " key={restName}>
                         
                              <h5 className="card-header" id='rest-card-header'  key={restName}>{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel' key={restName}>  
                                    {restPhotos && restPhotos.map(({photoUrl}) => (
                                      
                                      <img src={photoUrl} className='col-8 col-md-4 p-1 card-photo' alt={photoUrl} key={photoUrl} ></img>
                                        ))}
                                        <PhotoForm restId={_id}></PhotoForm>
                                    </div>   
                                    {/* {comments && <UserReview comments={comments}></UserReview> } */}
                                <div className id='pop-res-bottom'> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-1" key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>
                                
                              </div>
                          </div>
                        
                       
                       </>

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
