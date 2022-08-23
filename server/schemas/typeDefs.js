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
    commentsCount: Int
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Dish {
    _id: ID
    restName: String
    dishRest: Restaurant
    dishName: String
    dishCost: Float
    dishDescript: String
    userId: ID
    username: String
    dishPhotos: [Photo]
    commentsCount: Int
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Comment {
    _id: ID
    targetId: ID
    targetType: String
    commentText: String
    createdAt: String
    user: User
    commentsCount: Int
    comments: [Comment]
    heartsCount: Int
    hearts: [Heart]
  }

  type Heart {
    _id: ID
    targetId: ID
    targetType: String
    user: User
  }

  type Photo {
    _id: ID
    targetId: ID
    targetType: String
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
    dishesByRest(restName: String!): [Dish]
    dishesByName(dishName: String!): [Dish]
    dish(dishId: ID!): Dish
    comment(commentId: ID!): Comment
    viewHearts(targetId: ID!): [Heart]
    favRests(userId: ID!): [Restaurant]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      tagline: String
      profilePic: String
    ): Auth
    login(email: String!, password: String!): Auth


    
    updateUser(username: String, tagline: String, profilePic: String): User



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
      restId: ID!
      dishName: String!
      dishCost: Float!
      dishDescript: String!
    ): Dish
    deleteDish(dishId: ID!): Dish

    commentRest(restId: ID!, commentText: String!): Comment
    commentDish(dishId: ID!, commentText: String!): Comment
    commentComment(commentId: ID!, commentText: String!): Comment

    deleteComment(commentId: ID!): Comment

    addPhoto(photoUrl: String!, restId: ID, dishId: ID): Photo

    deletePhoto(targetId: ID!, photoId: ID!): Photo
    heartRest(restId: ID!): Heart
    heartDish(dishId: ID!): Heart
    heartComment(commentId: ID!): Heart
    unheart(heartId: ID!): Heart

  }
`;

module.exports = typeDefs;