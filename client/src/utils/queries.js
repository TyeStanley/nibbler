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
      _id
      restName
      restState
      restCity
      restAddress
      restDescript
      restPhotos{
        photoUrl
      } 
      comments {
        _id
        commentText
        createdAt
        user {
          _id
          username
        }
      }
      heartsCount
    }
  }
`