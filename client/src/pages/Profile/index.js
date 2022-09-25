import './index.scss'
import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Modal, Tab } from 'react-bootstrap';
// import RestaurantCard from '../../components/RestaurantCard';
import AddRestaurant from '../../components/AddRestaurant';
import EditProfile from '../../components/EditProfile';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import UserReview from '../../components/UserReview';


const Profile= () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const { data } = useQuery(QUERY_ME)


  const userData =  data?.me;

 
  



  
  if(userData){
    return (

      <main>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="12" xl="10">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#2C2f31fd', height: '250px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  {userData.profilePic && <MDBCardImage src= {userData.profilePic}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '200px', zIndex: '1' }} />}
                  <MDBBtn onClick={() => setShowModal2(true)} color="dark"   style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                  <div className='mt-5'>
      <MDBBtn  color= "dark" style={{height: '60px', overflow: 'visible'}} onClick={() => setShowModal(true)}>
                    Add Restaurant
              </MDBBtn>
            </div>
                  <Modal 
                  
                  
              
                  size='lg'
        show={showModal2}
        onHide={() => setShowModal2(false)}
        aria-labelledby='edituser-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='edituser'>
          <Modal.Header closeButton>
            
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='edituser'>
                <EditProfile handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
          </Tab.Container>
      </Modal>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  {userData.username && <MDBTypography tag="h5">{userData.username}</MDBTypography> }
                
                  {userData.tagline && <MDBCardText>{userData.tagline}</MDBCardText>}
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






      <section className="container">
        
        <div className="col-12 col-md-5 top-ten text-center d-flex">
        <h2>Top Friends</h2>
        </div>
        <div className="col friend-container border border-3 border-white rounded-pill d-flex justify-content-evenly">
        <img src="https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="Profile" style={{width: '75px', height: '75px'}}></img>
        <img src="https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="Profile" style={{width: '75px', height: '75px'}}></img>
        <img src="https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="Profile" style={{width: '75px', height: '75px'}}></img>
        <img src="https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="Profile" style={{width: '75px', height: '75px'}}></img>
        <img src="https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg" alt="Profile" style={{width: '75px', height: '75px'}}></img>
        </div>
        
        
        


        
        <div className="col-12 col-md-5 top-ten text-center d-flex mt-5">
          <h2>Favorite Restaurants</h2>
          </div>
          <div className="col friend-container border border-3 border-white grid">
          <img src="https://cdn.dribbble.com/users/104635/screenshots/17458264/media/a5a239cd3d0acce4e4ff8ff689773210.jpg" alt="Restaurant" style={{width: '150px', height: '150px'}}></img>
          <img src="https://cdn.dribbble.com/users/632872/screenshots/14336979/media/2be2afb420a88231305e2c41b82f231f.jpg" alt="Restaurant" style={{width: '150px', height: '150px'}}></img>
          <img src="https://cdn.dribbble.com/users/2214836/screenshots/15234553/media/41bde57ee6525bc76f47283a00c13464.png" alt="Restaurant" style={{width: '150px', height: '150px'}}></img>
            {/* {faveRest && <RestaurantCard faveRest={faveRest}></RestaurantCard>} */}
            </div>
          
            <div className="col-12 col-md-5 top-ten text-center d-flex mt-5">
          <h2>My Reviews</h2>
          </div>
          <div className="col friend-container border border-3 border-white grid">
          <img src="https://cdn.dribbble.com/users/118756/screenshots/16083679/media/b1a9e8aedb357bd9d0f8350a040b1237.png" alt="Review" style={{width: '150px', height: '150px'}}></img>
          <img src="https://cdn.dribbble.com/users/6827497/screenshots/18389829/media/dbfaaa145fa1a42aea1e20a00e7d7655.jpg" alt="Review" style={{width: '150px', height: '150px'}}></img>
            </div>
            


          
         <div className='col-12 col-md-6 m-3 mt-5'>
          <h2>My Comments</h2>
          {userData.comments && <UserReview comments={userData.comments} _id={userData._id} username={userData.username} /> }
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
    return ( <div><h1>Loading.....</h1></div>)
}


export default Profile;