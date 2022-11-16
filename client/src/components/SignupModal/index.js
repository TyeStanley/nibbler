import { Nav, Modal, Tab } from 'react-bootstrap';
import './signupModal.css';
// Components
import SignUpForm from '../SignUpForm';
import LoginForm from '../LoginForm';

export default function SignupModal({showModal, setShowModal}) {

  return (
    <Modal
      size='lg'
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby='signup-modal'>
      {/* tab container to do either signup or login component */}
      <Tab.Container defaultActiveKey='login'>
        <Modal.Header className="modal__header" closeButton>
          <Modal.Title className="modal__title" id='signup-modal'>
            <Nav className="modal__buttons-wrapper" variant='pills'>
              <Nav.Item>
                <Nav.Link className="modal__button-login" eventKey='login'>Login</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="modal__button-signup" eventKey='signup'>Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey='login'>
              <LoginForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
            <Tab.Pane eventKey='signup'>
              <SignUpForm handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  )
}
