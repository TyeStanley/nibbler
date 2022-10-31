import { Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from '../pages/HomePage'
import Profile from '../pages/ProfilePage'
import Restaurants from '../pages/RestaurantsPage';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <main>
      <Navbar/>
      <Routes>
        <Route 
          exact path="/" 
          element={<Home />} 
        />
        <Route 
          path="/restaurants" 
          element={<Restaurants />} 
        />
        <Route 
          path="/profile" 
          element={<Profile />} 
        />
      </Routes>
    </main>
    <Footer />
    </ApolloProvider>
  );
}

export default App;
