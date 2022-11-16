import './navbar.css';
import { Link } from 'react-router-dom';
// Components
import SignupModal from '../SignupModal';
// Utils and React Hooks
import { useState } from 'react';
import Auth from '../../utils/auth';

export default function AppNavbar() {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <nav className="nav nav-top">
      <h1 className="nav__logo">
        <Link to="/">Nibbler</Link>
      </h1>
      <ul className="nav__list"> 
        <li><Link to='/restaurants'>Restaurants</Link></li>
        {
          Auth.loggedIn()
          ? (
            <>
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="#">Profiles</Link></li>
              <li><Link onClick={Auth.logout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link onClick={() => setShowModal(true)}>Login/Sign Up</Link></li>
            </>
          )
        }
      </ul>
    </nav>
    {/* set modal data up */}
    <SignupModal 
      showModal={showModal} 
      setShowModal={setShowModal} 
    />
    </>
  );

  // if (false) {
  // return (
  //   <>
  //     <Navbar bg='dark' variant='dark' expand='lg'>
  //       <Container fluid>
  //         <Link  style={{paddingLeft: 13, textDecoration: 'none'}}   to="/">
  //           <h1 id='nav-header'>Nibbler</h1>
  //         </Link>
  //         <Navbar.Toggle aria-controls='navbar' />
  //         <Navbar.Collapse id='navbar'>
  //           <Nav className='ms-auto'>
  //             <Nav.Link as={Link} to='/restaurants'>
  //               Restaurants
  //             </Nav.Link>
  //             {/* if user is logged in show saved books and logout */}
  //             {Auth.loggedIn() 
  //               ? (
  //                 <>
  //                   <Nav.Link as={Link} to='/profile'>
  //                     My Profile
  //                   </Nav.Link>
  //                   {/* <Nav.Link as={Link} to=''>
  //                     Profiles
  //                   </Nav.Link> */}
  //                   <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
  //                 </>
  //               ) : (
  //                 <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
  //               )
  //             }
  //           </Nav>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     {/* set modal data up */}
  //     <Modal
  //       size='lg'
  //       show={showModal}
  //       onHide={() => setShowModal(false)}
  //       aria-labelledby='signup-modal'>
  //       {/* tab container to do either signup or login component */}
  //       <Tab.Container defaultActiveKey='login'>
  //         <Modal.Header closeButton>
  //           <Modal.Title id='signup-modal'>
  //             <Nav variant='pills'>
  //               <Nav.Item>
  //                 <Nav.Link eventKey='login'>Login</Nav.Link>
  //               </Nav.Item>
  //               <Nav.Item>
  //                 <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
  //               </Nav.Item>
  //             </Nav>
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Tab.Content>
  //             <Tab.Pane eventKey='login'>
  //               <LoginForm handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //             <Tab.Pane eventKey='signup'>
  //               <SignUpForm handleModalClose={() => setShowModal(false)} />
  //             </Tab.Pane>
  //           </Tab.Content>
  //         </Modal.Body>
  //       </Tab.Container>
  //     </Modal>
  //   </>
  // );
  // }
};
