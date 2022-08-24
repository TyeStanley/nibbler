import React, { useState } from 'react';
import './index.scss';
import UserReview from '../UserReview';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { COMMENT_REST } from '../../utils/mutations';


const RestaurantCard = ({restaurants}) =>{

  // create loggedIn variable
  const loggedIn = Auth.loggedIn();
  // set initial restaurant comment text box state
  const [commentText, setRestCommText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  // declare commentRest function and error variable
  const [commentRest, { error }] = useMutation(COMMENT_REST);
  const restId = restaurants[0]._id;
  
  // create handleChange function to capture the restaurant value and characer count from user
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setRestCommText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // create handleFormSubmit function to clear the restaurant comment text box and handle data
  const handleFormSubmit = async event => {
    event.preventDefault();



    try {
      // add restaurant comment from user to database
      await commentRest({
        variables: { commentText, restId }
      });

      console.log(commentText);
      // clear restaurant comment box
      setRestCommText('');
      setCharacterCount(0);
    } catch(e) {
      console.error(e);
    }
  };


  return(
        <>
                {restaurants.map(({restName,restPhotos,heartsCount,comments, _id}) =>(
                  
                    
                        <>
                        <div className="card m-1 border border-dark " key={restName}>
                         
                              <h5 className="card-header" id='rest-card-header'  key={restName}>{restName}</h5>
                                <div className="" id='rest-card-body'>
                                  <div id='card-img-container' className='d-flex carousel slide' data-ride='carousel' key={restName}>  
                                    {restPhotos && restPhotos.map(({photoUrl}) => (
                                      
                                      <img src={photoUrl} className='col-8 col-md-4 p-1 card-photo' alt={photoUrl} key={photoUrl} ></img>
                                        ))}
                                        <PhotoForm restId={_id}></PhotoForm>
                                    </div>   
                                <div className id='pop-res-bottom'> <i id='heart-svg' className="fa-solid fa-heart p-2 mx-1" key={restName}></i><span id='heart-span'>{`${heartsCount}`}</span></div>
                                {loggedIn && (
                                <div> 
                                  <p className={`m=0 ${characterCount === 280 ? 'text-error': ''}`}>
                                    Character Count: {characterCount}/280
                                    {error && <span className="mx-4">Whoops, something went wrong!</span>}
                                  </p>
                                  <form 
                                    className="flex-row justify-center justify-space-between-md align-stretch"
                                    onSubmit={handleFormSubmit}
                                  >
                                    <textarea
                                      placeholder="Share your feedback!"
                                      value={commentText}
                                      className="col-12"
                                      onChange={handleChange}
                                    ></textarea>
                                    <button type="submit">
                                      Submit
                                    </button>                                     
                                  </form>
                                </div>
                                )}  
                                {comments && <UserReview comments={comments}></UserReview> }
    
                              </div>
                          </div>
                        
                       
                       </>

                ))}
        </>
                
              

    );
};



export default RestaurantCard;
