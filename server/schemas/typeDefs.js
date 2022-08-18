const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    tagline: String
    profilePic: String
    followerCount: Int
    followingCount: Int
    followers: [User]
    following: [User]
    comments: [Comment]
    favRests: [Restaurant]
  }

  type Restaurant {
    _id: ID
    restName: String
    restState: String
    restCity: String
    restAddress: String
    restDescript: String
    restPhotos: [Photo]
    dishes: [Dish]
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Dish {
    _id: ID
    dishRest: Restaurant
    dishName: String
    dishCost: Int
    dishDescript: String
    dishPhotos: [Photo]
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Comment {
    _id: ID
    commentBody: String
    createdAt: String
    username: String
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Heart {
    _id: ID
    userId: ID
  }

  type Photo {
    _id: ID
    photoUrl: String
    userId: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    followers(username: String!): [User]
    following(username: String!): [User]
    restaurant(restName: String!): [Restaurant]
    restaurants: [Restaurant]
    dishes(restName: String!): [Dish]
    dish(dishName: String!): [Dish]
    favRests(userId: ID!): [Restaurant]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
      tagline: String
      profilePic: String
    ): User
    followUser(userToFollowId: ID!): User
    unfollowUser(userToUnfollowId: ID!): User
    addRest(
      restName: String!
      restState: String!
      restCity: String!
      restAddress: String!
      restDescript: String!
    ): Restaurant
    deleteRest(restId: ID!): Restaurant
    addDish(
      dishRestId: ID!
      dishName: String!
      dishCost: Int!
      dishDescript: String!
    ): Dish
    commentRest(
      userId: ID
      restId: ID
      commentBody: String!
      dishName: String!
    ): Comment
    commentDish(userId: ID, dishId: ID, commentBody: String!): Comment
    commentComment(userId: ID, commentId: ID, commentBody: String!): Comment
    removeComment(commentId: ID!): Comment
    heartRest(userId: ID!, restId: ID!): Restaurant
    heartDish(userId: ID!, dishId: ID!): Dish
    heartComment(userId: ID!, commentId: ID!): Comment
    unheartRest(userId: ID!, restId: ID!): Restaurant
    unheartDish(userId: ID!, dishId: ID!): Dish
    unheartComment(userId: ID!, commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
