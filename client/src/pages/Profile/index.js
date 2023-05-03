import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser,selectRestaurants } from '../../reducers';
import SmallRestCard from '../../components/SmallRestCard';
import RestaurantCard from '../../components/RestaurantCard';

const Profile = () => {
  const userData = useSelector(selectUser);
  console.log("this is rest data " + userData.favRests)
  const restData = useSelector(selectRestaurants);
  
  // create a new array of the user's favorite restaurant id's
  const userHearts = userData.favRests.map((rest) => rest._id);
  // Create a new array to filter out the user's favorite restaurants from the global state
  const userFavRests = restData.filter((rest) => userHearts.includes(rest._id));
  console.log(userFavRests);

  //move heart logic to sepearte file to use in here as well to update users favorites

  return (
    <div className="profile-page">
      <img className="avatar" src={userData.profilePic} alt="Profile avatar" />
      <div className="user-info">
        <h2 className='userName'>{userData.username}</h2>
        <p classname='tagline'>{userData.tagline}</p>
        <h3> Hearted Restaurant</h3>
        <div className='likedRests'>
           <SmallRestCard restProps={userFavRests} />
       
        </div>
      </div>
    </div>
  );
};

export default Profile;
