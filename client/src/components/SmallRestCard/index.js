import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../reducers';
import { selectRestaurants } from '../../reducers';
import './index.scss';
import { Carousel } from 'react-bootstrap';

function SmallRestCard() {
  const dispatch = useDispatch();
  const restaurants = useSelector(selectRestaurants);

  useEffect(() => {
    dispatch(setCurrentPage(0));
  }, []);

  const handleHeartClick = (e, index) => {
    let updatedRests = [...restaurants];
    updatedRests[index].heartsCount = updatedRests[index].heartsCount + 1;
    dispatch({ type: 'restaurant/setRestaurants', payload: updatedRests });
  }

  if (restaurants) {
    return (
      <div className="rest-card-container">
        {restaurants.map(({ restName, restPhotos, heartsCount, comments, _id }, index) => (
          <div className="rest-card" key={_id}>
            <Carousel>
              {restPhotos.map(({photoUrl}, i) => (
                <Carousel.Item key={i}>
                  <img src={photoUrl} alt="" />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="rest-card-info">
              <h2 className="rest-card-title">{restName}</h2>
              <div className="rest-card-details">
                <div className="rest-card-hearts" onClick={(e) => handleHeartClick(e, index)}>
                  <i className="fas fa-heart"></i> {heartsCount}
                </div>
                <div className="rest-card-comments">
                  <i className="fas fa-comment"></i> {comments.length}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default SmallRestCard;
