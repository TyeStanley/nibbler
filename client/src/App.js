import './App.scss';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

import Profile from './pages/Profile'


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider  client ={client}>
    <main>
 
      <Navbar/>
      <Routes>
              <Route 
                exact path="/" 
                element={<Home/>} 
              />

              <Route 
                path="/restaurants" 
                element={<Restaurants/>} 
              />
            <Route 
                path="/profile" 
                element={<Profile/>} 
             />
            
            </Routes>
</main>
    </ApolloProvider>
  );
}

export default App;
