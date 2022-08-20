const { AuthenticationError } = require('apollo-server-express');
const { User, Rest, Dish, Comment } = require('../models');
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
      return await Rest.find()
        .select('-__v')
        .populate('comments')
        .populate('dishes');
    },

    // get restaurant by name
    restaurant: async (parent, { restName }) => {
      return await Rest.find({ restName })
        .select('-__v')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        })
        .populate('dishes');
    }
  },

  Mutation: {
    // add new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
      
        const dish = await Dish.create({ ...args, userId: context.user._id });
        const rest = await Rest.findById(args.restId);

        rest.dishes.push(dish);
        rest.save();

        return dish, rest, context.user;
   

      throw new AuthenticationError('You need to be logged in!');
    },

    // delete a dish
    deleteDish: async (parent, { dishId }, context) => {
      if (context.user) {
        const dish = await Dish.findByIdAndDelete(dishId);

        return dish;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    // comment on a restaurant
    commentRest: async (parent, { restId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          userId: context.user._id,
          username: context.user.username
        });

        const rest = await Rest.findById(restId);
        rest.comments.push(comment);
        rest.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
