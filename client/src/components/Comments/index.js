import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { COMMENT_REST } from '../../utils/mutations';
import './index.scss';



// component for leaving comments
const Comments= () =>{

 // setup use state to take care of the comment text field
  const [message, setMessage] = useState('');
 // Keep track how many characters are being typed 
 const [characterCount, setCharacterCount] = useState(0);

  // create handleChange function to capture the restaurant value and Character count from user
  const handleMessageChange = event => {
    if (event.target.value.length <= 280) {
        setMessage(event.target.value);
        setCharacterCount(event.target.value.length);
    }
  
  };


  const handleFormSubmit = (event) =>{

  }

  return (
    
    <form className="d-flex flex-wrap text-center" onSubmit={handleFormSubmit} id='commentForm'>
      <p className={`m=0 ${characterCount === 280 ? 'text-error': ''} col-3`}>
                                    Character Count: {characterCount}/280
                                    {/* {error && <span className="mx-4">Whoops, something went wrong!</span>} */}
                                  </p>
      <label htmlFor="message" className=' mt-3 col-6' id='commentLabel'>Leave A Comment</label>
      <textarea
        id="message"
        name="message"
        value={message}
        className='col-10 p-2 m-3'
        onChange={handleMessageChange}
      /><br></br>
      <button  disabled={!(message, characterCount > 5)} type='submit' className=' btn btn-primary col-4 mx-4 mb-3 p-2'>Submit</button>
    </form>

  );
};


export default Comments;

