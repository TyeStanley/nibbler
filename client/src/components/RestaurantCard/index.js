
import './index.scss';



const RestaurantCard = ({restaurants}) =>{
  


  return(
        <>
                {restaurants.map(({restName,restPhotos}) =>(
                  
                    
                        <>
                        <div className="card m-1 border border-dark ">
                         
                              <h5 className="card-header" id='rest-card-header'>{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel'>  
                                    {restPhotos && restPhotos.map((photo) => (
                                      <img src={`/${photo + '.jpg'}`} className='col-8 col-md-4 p-1 card-photo' alt={photo} ></img>
                                        ))}
                                    </div>   
                                <div className id='pop-res-bottom'> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-2"></i><span id='heart-span'>34000</span></div>
                              </div>
                          </div>
                        
                       
                       </>

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
