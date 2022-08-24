/** @format */

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
      addUser(username: $username, email: $email, password: $password) {
          token
    user{ 
          _id
          username
         }
      }
    }
  `;

export const ADD_RESTAURANT = gql`
  mutation addRest(
    $restName: String!
    $restState: String!
    $restCity: String!
    $restAddress: String!
    $restDescript: String!
  ) {
    addRest( restName: $restName restState: $restState restCity: $restCity restAddress: $restAddress restDescript: $restDescript) {
      _id
      restName
      restState
      restCity
      restAddress
      restDescript
      
    }
  }

`;

export const ADD_PHOTO =gql`
  mutation addPhoto($photoUrl: String!, $restId: ID, $dishId: ID) {
    addPhoto(photoUrl: $photoUrl, restId: $restId, dishId: $dishId) {
      _id
      photoUrl
    }
  }

`
export const COMMENT_REST = gql`
  mutation commentRest($restId: ID!, $commentText: String!) {
    commentRest(restId: $restId, commentText: $commentText) {
      _id
      commentText
    }
  }
`


export const EDIT_USER = gql`
    mutation updateUser($username: String!, $tagline: String!, $profilePic: String!) {
      updateUser(username: $username, tagline: $tagline, profilePic: $profilePic) {
  
          username
          profilePic

      }
    }
  `;

export const DELETE_COMMENT = gql`
  mutation Mutation($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    commentText
  }
}
`


export const ADD_HEART =gql`
  mutation Mutation($restId: ID!) {
  heartRest(restId: $restId) {
    _id
    targetId
    targetType
    user {
      _id
      username
    }
  }
}
`

export const REMOVE_HEART=gql`
  mutation Mutation($heartId: ID!) {
  unheart(heartId: $heartId) {
    _id
  }
}



`