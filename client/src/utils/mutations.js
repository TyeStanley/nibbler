import { gql } from '@apollo/client';

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
            user {
                _id
                username
                tagline
                profilePic
            }
        }
    }
`;

export const ADD_REST = gql`
    mutation addRest($restName: String!, $restState: String!, $restCity: String!, $restAddress: String!, $restDescript: String!) {
        addRest(restName: $restName, restState: $restState, restCity: $restCity, restAddress: $restAddress, restDescript: $restDescript) {
        _id
        restName
        restState
        restCity
        restAddress
        restDescript
        restPhotos {
            _id
            photoUrl
            userId
        }
        dishes {
            _id
            dishName
            dishPhotos {
                _id
                photoUrl
                userId
            }
        }
        comments {
            _id
            commentBody
        }
    }
}`

