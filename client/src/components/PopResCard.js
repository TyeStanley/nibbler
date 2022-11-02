import React from 'react';

export default function PopResCard({imgLinks,name}) {
  return(
    <>  
      <div id='pop-res-container'>
        <img src={imgLinks} alt={name} id='pop-res-img' />
        <h2 id='pop-res-h2'>{name}</h2> 
        <div id='pop-res-bottom'>
          <i id='heart-svg' className="fa-solid fa-heart p-1 mx-2" />
          <span id='heart-span'>34000</span>
        </div>
      </div>
    </>
  );
};
