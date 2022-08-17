const { User, Rest } = require("../models");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find();
    },
    user: async (parent, { username }) => {
      return await User.findOne({ username }).select("-__v -password");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return user;
    },
    addRest: async (parent, args) => {
        const rest = await Rest.create(args);
    
        return rest;
    }
  },
};

module.exports = resolvers;
