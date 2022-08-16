import React from 'react';
import Nav from '../Nav';

function Header() {
  
  return (
    <header className="d-flex flex-row">
      <h1 className="col-3">
        <a 
        href="/"
        >
          Project Name
        </a>
      </h1>
      <Nav />
    </header>
  );
}

export default Header;