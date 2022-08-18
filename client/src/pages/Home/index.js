import './index.scss';
import UserReview from '../../components/UserReview';
import RestaurantCard from '../../components/RestaurantCard';


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
         
            <RestaurantCard></RestaurantCard>
              

            </div>
  
            
            <UserReview></UserReview>
            

         </section>

      </>

    );
};



export default Home;
