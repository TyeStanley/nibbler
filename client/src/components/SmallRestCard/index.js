import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { selectRestaurants } from '../../reducers';
import './index.scss';
import { Carousel } from 'react-bootstrap';

function SmallRestCard({ restaurants }) {
  const dispatch = useDispatch();

  const handleHeartClick = () => {
    const updatedRests = [...selectRestaurants()];
    const index = updatedRests.findIndex(({ _id }) => _id === restaurants._id);
    updatedRests[index].heartsCount += 1;
    dispatch({ type: 'restaurant/setRestaurants', payload: updatedRests });
  };

    console.log("This is the restaurants object: ", restaurants)
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

// SmallRestCard.propTypes = {
//   restaurant: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     restName: PropTypes.string.isRequired,
//     restPhotos: PropTypes.arrayOf(
//       PropTypes.shape({
//         photoUrl: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     heartsCount: PropTypes.number.isRequired,
//     comments: PropTypes.array.isRequired,
//   }).isRequired,
// };

export default SmallRestCard;
