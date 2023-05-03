import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

const LoginForm = () => {
  // Set up state using the useState hook
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  
  // Set up mutation using the useMutation hook
  const [loginUser] = useMutation(LOGIN_USER);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if form is valid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    // Set form as validated
    setValidated(true);

    try {
      // Call the loginUser mutation with userFormData
      const { data } = await loginUser({
        variables: {...userFormData} 
      });

      // If successful, log user in and redirect to homepage
      Auth.login(data.login.token);
    } catch (err) {
      // If unsuccessful, show error alert and reset form
      console.error(err);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      // Reset form
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }

    // Reset form inputs
    setUserFormData({
      email: '',
      password: '',
    });
  };

  // Render the form using React Bootstrap components
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
