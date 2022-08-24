// see SignupForm.js for comments
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_RESTAURANT } from '../../utils/mutations';

const RestaurantForm = () => {
  const [restaurantFormData, setRestaurantFormData] = useState({ restName: '', restState: '', restAddress:'', restDescript:'', restCity: ''});
  const [validated] = useState(false);
  const [addRestaurant] = useMutation(ADD_RESTAURANT);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Restaurant Name'
            name='restName'
            onChange={handleInputChange}
            value={restaurantFormData.restName}
            required
          />
          <Form.Control.Feedback type='invalid'>Restaurant name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='state'>State</Form.Label>
          <Form.Control
            type='text'
            placeholder='State'
            name='restState'
            onChange={handleInputChange}
            value={restaurantFormData.restState}
            required
          />
          <Form.Control.Feedback type='invalid'>State is required!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='city'>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            name='restCity'
            onChange={handleInputChange}
            value={restaurantFormData.restCity}
            required
          />
          <Form.Control.Feedback type='invalid'>City is Missing!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor='address'>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            name='restAddress'
            onChange={handleInputChange}
            value={restaurantFormData.restAddress}
            required
          />
          <Form.Control.Feedback type='invalid'>Address is required!</Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor='description'>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Description'
            name='restDescript'
            onChange={handleInputChange}
            value={restaurantFormData.restDescript}
            required
          />
          <Form.Control.Feedback type='invalid'>Description is required!</Form.Control.Feedback>
        </Form.Group>

        
        <Button
          disabled={!(restaurantFormData.restName && restaurantFormData.restAddress && restaurantFormData.restState && restaurantFormData.restDescript )}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default RestaurantForm;