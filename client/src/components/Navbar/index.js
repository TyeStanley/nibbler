import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavItem } from 'react-bootstrap';
import SignUpForm from '../SignUpForm';
import LoginForm from '../LoginForm';
import Auth from '../../utils/auth';
import './navbar.scss'

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <>
      <Navbar className='navbar' expand='lg'  variant='dark'>
        <Container fluid>
          <Link className='navbar-brand' to='/'>
            <h1 id='nav-header'>Nibbler</h1>
          </Link>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <NavItem>
                <Link className='nav-link' to='/restaurants'>
                  Restaurants
                </Link>
              </NavItem>
              {Auth.loggedIn() ? (
                <>
                  <NavItem>
                    <Link className='nav-link' to='/profile'>
                      My Profile
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Nav.Link onClick={handleLogout} className='nav-link'>
                      Logout
                    </Nav.Link>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <Nav.Link onClick={() => setShowModal(true)} className='nav-link'>
                    Login/Sign Up
                  </Nav.Link>
                </NavItem>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size='lg'
        show={showModal}
        onHide={handleModalClose}
        aria-labelledby='signup-modal'
        className='modal'
      >
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className='modal-header' closeButton>
            <Modal.Title className='modal-title' id='signup-modal'>
              <Nav variant='pills' className='justify-content-center'>
                <NavItem>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </NavItem>
                <NavItem>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </NavItem>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey
='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />

                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    );
  };
  
  export default AppNavbar;
  