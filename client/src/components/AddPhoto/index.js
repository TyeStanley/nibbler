// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT } from '../../utils/mutations';

const RestaurantForm = () => {
  const [restaurantFormData, setRestaurantFormData] = useState({ restName: '', restState: '', restAddress:'', restDescript:'', restCity: ''});
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addRestaurant] = useMutation(ADD_RESTAURANT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name +" "+ value) 
    console.log(event.target)
    
    setRestaurantFormData({...restaurantFormData, [name]: value });
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
      const { data } = await addRestaurant({
        variables: {...restaurantFormData} 
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    
    setRestaurantFormData({
        restName: '', 
        restState: '', 
        restAddress:'', 
        restDescript:''
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      
        <Form.Group>
          <Form.Label htmlFor='photo'>Photo</Form.Label>
          <Form.Control
            type='file'
            placeholder='Restaurant Name'
            name='restName'
            onChange={handleInputChange}
            value={restaurantFormData.restName}
            required
          />
          <Form.Control.Feedback type='invalid'>Restaurant name is required!</Form.Control.Feedback>
        </Form.Group>


        <Button
          disabled={!(restaurantFormData.restName )}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RestaurantForm;


// Have to pull restaurant information for the click of the button and add that to the data being set to submission

//https://www.apollographql.com/docs/apollo-server/data/file-uploads/