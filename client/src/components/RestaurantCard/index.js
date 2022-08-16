import './index.scss';
import images from '../../pages/Home/seeds'



const RestaurantCard = () =>{

    return(
        <>
                {images.map(({name, imgLinks}) =>(
                    
                        <>
                        <div className="card col-12 col-md-12 m-1 border border-dark ">
                            <h5 className="card-header" id='rest-card-header'>{name}</h5>
                            <div className="" id='restCardBody'>
                              <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel'>  
                              {imgLinks.map((link) => (
                                <img src={link} className='col-8 col-md-4 p-1' alt={name} id='card-img'></img>
                              ))}
                              </div>   
    
                            </div>
                        </div>
                        
                       </>

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
