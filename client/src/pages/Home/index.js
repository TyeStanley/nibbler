import './index.scss';
import RestaurantCard from '../../components/RestaurantCard';
import { useQuery } from '@apollo/client';
import { QUERY_RESTAURANTS } from '../../utils/queries';
import SmallRestCard from '../../components/SmallRestCard';

const Home = () =>{
    const { data} = useQuery(QUERY_RESTAURANTS)

    let restaurants =  data?.restaurants;

    

    if(restaurants?.length > 5){
        const newRest = [...restaurants];
        
        restaurants = newRest.splice(-5);
    
   }

   

    return(
        <>
        <section  className ='p-5 bg-primary text-white text-center' id='hero-section'></section>

         <section className ='text-center pt-3' id='intro-statement'>
            <div className='intro-titles'>
                <div className='intro-div'><h1 id='intro-h1'> Welcome to Nibbler</h1></div>
                <h2 className= 'pt-2 pb-3' id='intro-h2'> Save your favorite spots | Share them with friends | Find something new</h2>
            </div>
            <h3 className='p-3' id='recentUploads'> Recent Uploads </h3>
         </section>

         <section  id="intro-restaurants" className='border-primary d-flex flex-column'>

            <div className=' d-flex flex-column' id='recent-uploads-div'>
         
             {/* {restaurants && <RestaurantCard restaurants={restaurants} ></RestaurantCard> } */}

             {restaurants && <SmallRestCard restaurants={restaurants}/>}
              

         
  
            </div>
          
         </section>

      </>

    );
};



export default Home;
