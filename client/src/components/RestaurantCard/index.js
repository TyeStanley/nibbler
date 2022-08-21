
import './index.scss';
import UserReview from '../UserReview';


const RestaurantCard = ({restaurants}) =>{

 


  return(
        <>
                {restaurants.map(({restName,restPhotos,heartsCount,comments}) =>(
                  
                    
                        <>
                        <div className="card m-1 border border-dark " key={restName}>
                         
                              <h5 className="card-header" id='rest-card-header'  key={restName}>{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel' key={restName}>  
                                    {restPhotos && restPhotos.map((photo) => (
                                      <img src={`/${photo + '.jpg'}`} className='col-8 col-md-4 p-1 card-photo' alt={photo} key={photo} ></img>
                                        ))}
                                    </div>   
                                    {comments && <UserReview comments={comments}></UserReview> }
                                <div className id='pop-res-bottom'> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-1" key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>
                                
                              </div>
                          </div>
                        
                       
                       </>

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
