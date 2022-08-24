/** @format */

import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      tagline
      profilePic
      followerCount
      followingCount
      comments {
        _id
        targetId
        targetType
        commentText
      }
      favRests {
        _id
        restName
        restState
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
      hearts {
        _id
        user {
          _id
          username
        }
      }
    }
  }
`