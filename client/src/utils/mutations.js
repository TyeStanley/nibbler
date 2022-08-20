import gql from "graphql-tag";

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
      }
    }
  }
`;

export const ADD_RESTAURANT = gql`
mutation AddRestaurant($restName: String!, $restState: String!, $restCity: String!, $restAddress: String!, $restDescript: String!, $restPhotos: [String]!) {
  addRest(restName: $restName, restState: $restState, restCity: $restCity, restAddress: $restAddress, restDescript: $restDescript)
}
`;
