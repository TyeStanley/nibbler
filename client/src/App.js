// import './App.scss';
import './app.css';
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

export default function App() {
  return (
    <ApolloProvider client={client}>
    <main>
      <Navbar />
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
    <Footer />
    </ApolloProvider>
  );
}
