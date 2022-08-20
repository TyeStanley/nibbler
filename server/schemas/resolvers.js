const { AuthenticationError } = require('apollo-server-express');
const { User, Rest, Dish, Comment, Photo } = require('../models');
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
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('dishes')
        .populate('restPhotos');
    },

    // get all dishes from a restaurant
    dishesByRest: async (parent, { restName }) => {
      return await Dish.find({ restName })
        .select('-__v')
        .populate({
          path: 'comments',
          populate: [
            {
              path: 'user',
              select: '-__v -password'
            }
          ],
          options: { sort: { createdAt: -1 } }
        })
        .populate('dishRest');
    },

    // get dish by name
    dishesByName: async (parent, { dishName }) => {
      return await Dish.find({ dishName })
        .select('-__v')
        .populate('comments')
        .populate('dishRest');
    },

    // get dish by id
    dish: async (parent, { dishId }) => {
      return await Dish.findById(dishId)
        .select('-__v')
        .populate('comments')
        .populate('dishRest');
    },

    // get comment
    comment: async (parent, { commentId }) => {
      return await Comment.findById(commentId)
        .select('-__v')
        .populate('comments')
        .populate('user');
    }
  },

  Mutation: {
    // add new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
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
        const rest = await Rest.findById(args.restId);
        const dish = await Dish.create({
          restName: rest.restName,
          dishRest: rest,
          ...args, // required input (dishName, dishPrice, dishDescript)
          userId: context.user._id,
          username: context.user.username
        });

        rest.dishes.push(dish);
        rest.save();

        return dish;
      }

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
        const rest = await Rest.findById(restId);
        const comment = await Comment.create({
          targetId: rest._id,
          targetType: 'rest',
          commentText,
          userId: context.user._id,
          username: context.user.username
        });

        rest.comments.push(comment);
        rest.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // comment on a dish
    commentDish: async (parent, { dishId, commentText }, context) => {
      if (context.user) {
        const dish = await Dish.findById(dishId);
        const comment = await Comment.create({
          targetId: dish._id,
          targetType: 'dish',
          commentText,
          userId: context.user._id,
          username: context.user.username
        });

        dish.comments.push(comment);
        dish.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // comment on a comment
    commentComment: async (parent, { commentId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        const commentReply = await Comment.create({
          targetId: comment._id,
          targetType: 'comment',
          commentText,
          userId: context.user._id,
          username: context.user.username
        });

        comment.comments.push(commentReply);
        comment.save();

        return commentReply;
      }
    },

    // delete a comment
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndDelete(commentId);

        // place holder for delete cascade
        let target = null;

        // assign target to remove comment from and update based on type
        switch (comment.targetType) {
          case 'rest':
            target = await Rest.findById(comment.targetId);
            break;

          case 'dish':
            target = await Dish.findById(comment.targetId);
            break;

          case 'comment':
            target = await Comment.findById(comment.targetId);
            break;

          default:
            console.log(comment.targetType);
            break;
        }

        // update target with comment removed
        target.comments.pull(comment);
        target.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    // add a photo to a restaurant
    addPhotoRest: async (parent, { restId, photoUrl }, context) => {
      if (context.user) {
        const rest = await Rest.findById(restId);
        const photo = await Photo.create({
          targetId: rest._id,
          targetType: 'rest',
          photoUrl,
          userId: context.user._id
        });

        rest.restPhotos.push(photo);
        rest.save();

        return photo;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
