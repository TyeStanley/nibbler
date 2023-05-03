import './App.scss';
import { Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Restaurants from './pages/Restaurants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'
import Profile from './pages/Profile'
import { useDispatch,useSelector  } from 'react-redux';
import { useEffect } from 'react';
import Auth from './utils/auth';
import { QUERY_ME } from './utils/queries';
import { selectUser } from './reducers';

// Create an http link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set the authorization headers for the request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token to the authorization header
    },
  };
});

// Create a new Apollo client instance with the configured http and auth links
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const dispatch = useDispatch();

  // setup use effect to check if user is logged in and if so, query for their data and save to store using dispatch
  useEffect(() => {   
      if (Auth.loggedIn()) {
        const getUserData = async () => {
          try {
            const token = Auth.getToken();
            if (!token) {
              return false;
            }
            const { data } = await client.query({ query: QUERY_ME });
            dispatch({ type: 'user/setUser', payload: data.me });
          } catch (err) {
            console.error(err);
          }
        };
        getUserData();
      }
    }, [dispatch]);

    const userData = useSelector(selectUser);
    console.log(userData)

  return (
    <ApolloProvider  client ={client}>
       <Navbar/> {/* Render the Navbar component */}
    <main>
 
  
      <Routes>
        <Route 
          client = {client}
          exact path="/" 
          element={<Home/>} // Render the Home component for the root URL
        />
        
        {/* <Route 
          path="/restaurants" 
          element={<Restaurants/>} 
        /> */}
        <Route 
          path="/profile" 
          element={<Profile/>} // Render the Profile component for the /profile URL
        />
            
      </Routes>
    </main>
  <Footer /> {/* Render the Footer component */}
    
    
    </ApolloProvider>
  );
}

export default App;
