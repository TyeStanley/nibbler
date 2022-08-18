const { User, Rest } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
        .select('-__v -password')
        .populate('following')
        .populate('comments');
    },

    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .select('-__v -password')
        .populate('following')
        .populate('comments');
    },

    restaurants: async () => {
      return await Rest.find().select('-__v').populate('comments');
    },

    restaurant: async (parent, { restName }) => {
      return await Rest.find({ restName }).select('-__v').populate('comments');
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return user;
    },

    followUser: async (parent, { userId, userToFollowId }) => {
      const user = await User.findById(userId);
      const userToFollow = await User.findById(userToFollowId);

      user.following.push(userToFollow);
      user.save();

      userToFollow.followers.push(user);
      userToFollow.save();

      return user;
    },

    addRest: async (parent, args) => {
      const rest = await Rest.create(args);

      return rest;
    },

    deleteRest: async (parent, { restId }) => {
      const rest = await Rest.findByIdAndDelete(restId);

      return rest;
    }
  }
};

module.exports = resolvers;
