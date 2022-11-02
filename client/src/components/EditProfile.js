import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';


export default function EditProfile() {
  const [userFormData, setUserFormData] = useState({ username: '', tagline: '', profilePic: '' });
  const [validated] = useState(false);
    // set state for alert
    // const [showAlert, setShowAlert] = useState(false);
    // define mutation for adding a user

  const [editUser] = useMutation(EDIT_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
    
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    try {
      await editUser(
        { variables: { ...userFormData } }
      )
    } catch (err) {
      console.error(err);
    }
        
    window.location.reload(true);
    setUserFormData({
      username: '',
      tagline: '',
      profilepic: ''
    })
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='tagline'>Tagline</Form.Label>
          <Form.Control
            type='text'
            placeholder='Tagline'
            name='tagline'
            onChange={handleInputChange}
            value={userFormData.tagline}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='profilepic'>Profile Picture</Form.Label>
          <Form.Control
            type='String'
            placeholder='Profile Picture'
            name='profilePic'
            onChange={handleInputChange}
            value={userFormData.profilePic}
          />
        </Form.Group>

        <Button
          disabled={!(userFormData.username || userFormData.tagline || userFormData.profilepic)}
          type='submit'
          variant='success'
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
