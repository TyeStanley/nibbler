
import './App.scss';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Restaurants from './pages/Restaurants';
import Navbar from './components/Navbar';
import Profile from './pages/Profile'
import { ApolloProvider }  from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider  client ={client}>
    <main>
    <Router>
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
                path="/myprofile" 
                element={<Profile/>} 
              />
            
            </Routes>
      
      {/* <Restaurants></Restaurants> */}
      
      </Router>
    </main>
    </ApolloProvider>
  );
}

export default App;
