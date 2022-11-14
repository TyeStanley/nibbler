// see SignupForm.js for comments
// import './index.scss';
import './photoForm.css';
import { Form, Button } from 'react-bootstrap';
// Utils and React Hooks
import { useState } from 'react';
import Auth from '../../utils/auth';
// GraphQL
import { useMutation } from '@apollo/client';
import { ADD_PHOTO } from '../../utils/mutations';

export default function PhotoForm({ restId, dishId }) {
  const [photoFormData, setPhotoFormData] = useState({ photoUrl: '', restId: restId});
  const [validated] = useState(false);
  const [addPhoto] = useMutation(ADD_PHOTO);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setPhotoFormData({...photoFormData, [name]: value });
  };

  async function handleFormSubmit(event) {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addPhoto(
        { variables: {...photoFormData} }
      );

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    window.location.reload(true);
    setPhotoFormData({ photoUrl: '' });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor='photo'>Add A Link To Your Photo</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add A Photo Link Here'
            name='photoUrl'
            onChange={handleInputChange}
            value={photoFormData.photoUrl}
            required
          />
          <Form.Control.Feedback type='invalid'>Link Required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(photoFormData.photoUrl)}
          type='submit'
          variant='success'
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

// Have to pull restaurant information for the click of the button and add that to the data being set to submission
//https://www.apollographql.com/docs/apollo-server/data/file-uploads/