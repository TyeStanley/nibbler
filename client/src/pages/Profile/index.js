import React, { useState, useEffect, useQuery } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Nav, Modal, Tab, Button, Container, CardGroup, Card } from 'react-bootstrap';
import RestaurantCard from '../../components/RestaurantCard';
import Auth from '../../utils/auth';
import AddRestaurant from '../../components/AddRestaurant';
import { Form,  Alert } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_RESTAURANTS } from '../../utils/queries';

const Profile= () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const { data } = useQuery(GET_ME)
  
  const userDataLength = Object.keys(userData).length;
  let restaurantslist =  data?.restaurants;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);
  
    return (

      <main>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="10">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#2C2f31fd', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src="https://ca-times.brightspotcdn.com/dims4/default/46e9fc6/2147483647/strip/true/crop/3500x1969+0+0/resize/840x473!/format/webp/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa3%2Fbc%2F967153f7443ab69d6b182b91b1f4%2Ffo-quickbites-07102022-02.jpg"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">McKinley Wiltz</MDBTypography>
                  <MDBCardText>Food is where the heart is</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


      <section class = 'container d-flex flex-row justify-content-between'>
      <div className='col-12 col-md-8 text-center d-flex flex-wrap' id='recent-uploads-div'>
          <RestaurantCard restaurants={restaurantslist}></RestaurantCard>
        </div>
        <div>
      
      
                <Button  onClick={() => setShowModal(true)} outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Add Restaurant
              </Button>
            </div>
            <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='restaurant-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='addrestaurant'>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='addrestaurant'>
                <AddRestaurant handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
          </Tab.Container>
      </Modal>
      
</section>
</main>


  );
}


export default Profile;