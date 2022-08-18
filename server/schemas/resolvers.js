const { AuthenticationError } = require('apollo-server-express');
const { User, Rest, Dish } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // get all users
    users: async () => {
      return await User.find()
        .select('-__v -password')
        .populate('following')
        .populate('comments');
    },

    // get user by username
    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .select('-__v -password')
        .populate('following')
        .populate('comments');
    },

    // get all restaurants
    restaurants: async () => {
      return await Rest.find().select('-__v').populate('comments');
    },

    // get restaurant by name
    restaurant: async (parent, { restName }) => {
      return await Rest.find({ restName }).select('-__v').populate('comments');
    }
  },

  Mutation: {
    // add new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return user;
    },

    // login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // follow another user
    followUser: async (parent, { userToFollowId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const userToFollow = await User.findById(userToFollowId);

        user.following.push(userToFollow);
        user.save();

        userToFollow.followers.push(user);
        userToFollow.save();

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    // unfollow another user
    unfollowUser: async (parent, { userToUnfollowId }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const userToUnfollow = await User.findById(userToUnfollowId);

        user.following.pull(userToUnfollow);
        user.save();

        userToUnfollow.followers.pull(user);
        userToUnfollow.save();

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },

    // add a new restaurant
    addRest: async (parent, args, context) => {
      if (context.user) {
        const rest = await Rest.create(args);

        return rest;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // delete a restaurant
    deleteRest: async (parent, { restId }, context) => {
      if (context.user) {
        const rest = await Rest.findByIdAndDelete(restId);

        return rest;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    // add a new dish
    addDish: async (parent, args, context) => {
      if (context.user) {
        const dish = await Dish.create(args);

        return dish;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
