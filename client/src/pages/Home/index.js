import './index.scss';
import images from './seeds'
import UserReview from '../../components/UserReview';


const Home = () =>{

    return(
        <>
        <section  className ='p-5 bg-primary text-white text-center' id='hero-section'></section>

         <section className ='text-center pt-3' id='intro-statement'>
            <div className='intro-titles'>
                <div className='intro-div'><h1 id='intro-h1'> Welcome to "PlaceHolder"</h1></div>
                <h2 className= 'pt-2 pb-3' id='intro-h2'> Save your favorite spots | Share them with friends | Find something new</h2>
            </div>
            <h3 className='p-3' id='recentUploads'> Recent Uploads </h3>
         </section>

         <section  id="intro-restaurants" className='border-primary d-flex flex-wrap'>

            <div className=' col-12 col-md-8 text-center d-flex flex-wrap' id='recent-uploads-div'>
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
                
              

            </div>
            {/* <div className='col-12 col-md-4 mt-1 p-3 d-flex flex-wrap ' id='desc-box'>
             {images.map(({userName,userPhoto,review}) =>(
                <>
                    <div className='d-flex p-1 col-12' id='desc-box-title'>
                        <img  src={userPhoto} className='col-2' id='userCommentImg' alt={"avatar image for " + userName} ></img>
                        <p className='col-4 p-3'>{userName}</p>
                    </div>

                    <p id="reviewText" className='col-12'>" {review} "</p>

                </>
             ))}                   
            
            </div> */}
            
            <UserReview></UserReview>
            

         </section>

      </>

    );
};



export default Home;
