import './index.scss'
import RestaurantCard from '../../components/RestaurantCard';
import CategorySearchBar from '../../components/CategorySearchBar';
import PopResCard from '../../components/PopResCard';
import seeds from '../Home/seeds'

const Restaurants = () =>{

    return(
        <>
        
        <section id='restSection'>
                <div>
                   <CategorySearchBar></CategorySearchBar>
                </div>




            <section className='d-flex justify-content-center'>
                <h1></h1>

               {seeds.map(({imgLinks, name})=>(
                <PopResCard imgLinks={imgLinks} name={name}></PopResCard>
               ))}




            </section>
            
        </section>
        
        
        
        </>
    )
}

export default Restaurants;