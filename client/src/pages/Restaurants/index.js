import './index.scss'
import RestaurantCard from '../../components/RestaurantCard';
import CategorySearchBar from '../../components/CategorySearchBar';
import seeds from '../Home/seeds'

const Restaurants = () =>{

    return(
        <>
        <div>
                   <CategorySearchBar></CategorySearchBar>
        </div>
        <section className='d-flex justify-content-center' id='restSection'>
                




            <section className='d-flex flex-wrap restaurant-containers mx-2'  >

                <h2 className='col-12 text-center mt-5 flex-wrap'>Most Popular</h2>
                
              
               <RestaurantCard></RestaurantCard>




            </section>
            <section className='d-flex flex-wrap restaurant-containers'  >

                <h2 className='col-12 text-center mt-5 flex-wrap'>Most Recent</h2>


                <RestaurantCard></RestaurantCard>




            </section>
            
        </section>
        
        
        
        </>
    )
}

export default Restaurants;