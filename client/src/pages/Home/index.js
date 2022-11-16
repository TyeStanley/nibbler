// import './index.scss';
import './home.css';
// Components
import RestaurantCard from '../../components/RestaurantCard';
// GraphQL
import { useQuery } from '@apollo/client';
import { QUERY_RESTAURANTS } from '../../utils/queries';

export default function Home() {
  const { data } = useQuery(QUERY_RESTAURANTS)

  let restaurants = data?.restaurants;

  if (restaurants?.length > 5) {
    const newRest = [...restaurants];  
    restaurants = newRest.splice(-5);
  }

  return (
    <>
      <section className="home__fill"></section>

      <section className="home__hero">
        <div className="home__text-container">
          <h1>Welcome to Nibbler</h1>
          <h2>Save your favorite spots | Share them with friends | Find something new</h2>
        </div>
      </section>

      <section className="home__restaurant-cards">
        <h3>Recent Uploads</h3>
        <div>
          {restaurants && <RestaurantCard restaurants={restaurants} />}
        </div>
      </section>
    </>
  );
};
