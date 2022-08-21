/** @format */

import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me($_id: ID!) {
    me(_id: $id) {
      _id
      username
      tagline
      profilePic
      favRests {
        _id
        restName
        createdAt
        restPhotos {
          _id
          photoUrl
          userId
        }
        comments {
          _id
          commentBody
          createdAt
          heartsCount
        }
        dishes {
          _id
          dishName
          dishCost
          dishPhotos {
            _id
            photoUrl
            userId
          }
        }
      }
    }
  }
`;
export const QUERY_RESTAURANTS = gql `
  {
    restaurants {
      restName
      restState
      restCity
      restAddress
      restDescript
      restPhotos 
      comments {
        username
        commentText
      }
      heartsCount
      hearts {
      _id
      userId
    }
    }
  }
`