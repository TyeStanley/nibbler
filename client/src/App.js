import React from 'react';
import './App.scss';
import Header from './components/Header';
import Home from './components/pages/Home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
