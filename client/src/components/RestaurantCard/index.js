
import './index.scss';
import UserReview from '../UserReview';
import PhotoForm from '../PhotoForm';


const RestaurantCard = ({restaurants}) =>{

  const heartClickHandler = () =>{

    console.log('hello')





  }


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
                                        <PhotoForm restId={_id} key={restName + "hoah123"}> </PhotoForm>
                                    </div>   
                                    {/* {comments && <UserReview comments={comments}></UserReview> } */}
                                <div  id='pop-res-bottom' onClick={heartClickHandler}> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-1" key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>
                                
                              </div>
                          </div>
                        
                      

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
