const { AuthenticationError } = require('apollo-server-express');
const { User, Rest, Dish, Comment, Photo, Heart } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get logged in user
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('following')
          .populate('followers')
          .populate({
            path: 'comments',
            populate: {
              path: 'user',
              select: '-__v -password'
            },
            options: { sort: { createdAt: -1 } }
          })
          .populate('favRests');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    // get all users
    users: async () => {
      return await User.find()
        .select('-__v -password')
        .populate('following')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('favRests');
    },

    // get user by username
    user: async (parent, { username }) => {
      return await User.findOne({ username })
        .select('-__v -password')
        .populate('following')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('favRests');
    },

    // get all restaurants
    restaurants: async () => {
      return await Rest.find()
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
        .populate('restPhotos')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
    },

    // get restaurant by name
    restaurant: async (parent, { restName }) => {
      return await Rest.find({ restName })
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('dishes')
        .populate('restPhotos')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
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
        .populate('dishRest')
        .populate('dishPhotos')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
    },

    // get dish by name
    dishesByName: async (parent, { dishName }) => {
      return await Dish.find({ dishName })
        .select('-__v')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('dishRest')
        .populate('dishPhotos')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
    },

    // get dish by id
    dish: async (parent, { dishId }) => {
      return await Dish.findById(dishId)
        .select('-__v')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        })
        .populate('dishRest')
        .populate('dishPhotos')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
    },

    // get comment
    comment: async (parent, { commentId }) => {
      return await Comment.findById(commentId)
        .select('-__v')
        .populate({
          path: 'comments',
          populate: {
            path: 'user',
            select: '-__v -password'
          },
          options: { sort: { createdAt: -1 } }
        })
        .populate('user')
        .populate({
          path: 'hearts',
          populate: {
            path: 'user',
            select: '-__v -password'
          }
        });
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

    // update user
    updateUser: async (parent, { username, tagline, profilePic, favRests }, context) => {
      if (context.user) {
        // grab previous user data for reference
        const user = await User.findById(context.user._id);

        if(favRests){
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
          );
          updatedUser.favRests.push(favRests)
          updatedUser.save();
          return updatedUser;

        }
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          {
            // use original values if no updated value is provided
            username: username ? username : user.username,
            tagline: tagline ? tagline : user.tagline,
            profilePic: profilePic ? profilePic : user.profilePic,
          },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('Not logged in');
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
        const user = await User.findById(context.user._id);
        const comment = await Comment.create({
          targetId: rest._id,
          targetType: 'rest',
          commentText,
          user: user,
          username: context.user.username
        });

        rest.comments.push(comment);
        rest.save();

        user.comments.push(comment);
        user.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // comment on a dish
    commentDish: async (parent, { dishId, commentText }, context) => {
      if (context.user) {
        const dish = await Dish.findById(dishId);
        const user = await User.findById(context.user._id);
        const comment = await Comment.create({
          targetId: dish._id,
          targetType: 'dish',
          commentText,
          user: user,
          username: context.user.username
        });

        dish.comments.push(comment);
        dish.save();

        user.comments.push(comment);
        user.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // comment on a comment
    commentComment: async (parent, { commentId, commentText }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        const user = await User.findById(context.user._id);
        const commentReply = await Comment.create({
          targetId: comment._id,
          targetType: 'comment',
          commentText,
          user: user,
          username: context.user.username
        });

        comment.comments.push(commentReply);
        comment.save();

        user.comments.push(commentReply);
        user.save();

        return commentReply;
      }
    },

    // delete a comment
    deleteComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findByIdAndDelete(commentId);
        const user = await User.findById(context.user._id);

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
            throw new Error('Invalid target type');
        }

        // update target with comment removed
        target.comments.pull(comment);
        target.save();

        user.comments.pull(comment);
        user.save();

        return comment;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    // add a photo to a dish
    addPhoto: async (parent, { dishId, photoUrl, restId }, context) => {
      if (context.user) {
        if (restId) {
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
        } else if (dishId) {
          const dish = await Dish.findById(dishId);
          const photo = await Photo.create({
            targetId: dish._id,
            targetType: 'dish',
            photoUrl,
            userId: context.user._id
          });

          dish.dishPhotos.push(photo);
          dish.save();

          return photo;
        }
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // delete a photo
    deletePhoto: async (parent, { photoId, targetId }, context) => {
      if (context.user) {
        const photo = await Photo.findByIdAndDelete(photoId);

        // assign target to remove photo from and update based on type
        switch (photo.targetType) {
          case 'rest':
            const rest = await Rest.findById(targetId);
            rest.restPhotos.pull(photo);
            rest.save();
            break;

          case 'dish':
            const dish = await Dish.findById(targetId);
            dish.dishPhotos.pull(photo);
            break;

          default: // invalid target type
            throw new Error('Invalid target type');
        }

        return photo;
      }

      throw new AuthenticationError('You need to be logged in');
    },

    // heart a restaurant (add to user's favorites)
    heartRest: async (parent, { restId }, context) => {
      if (context.user) {
        const rest = await Rest.findById(restId);
        const user = await User.findById(context.user._id);
        const heart = await Heart.create({
          targetId: rest._id,
          targetType: 'rest',
          user: user
        });

        rest.hearts.push(heart);
        rest.save();

        user.favRests.push(rest);
        user.save();

        return heart;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // heart a dish
    heartDish: async (parent, { dishId }, context) => {
      if (context.user) {
        const dish = await Dish.findById(dishId);
        const user = await User.findById(context.user._id);
        const heart = await Heart.create({
          targetId: dish._id,
          targetType: 'dish',
          user: user
        });

        dish.hearts.push(heart);
        dish.save();

        return heart;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // heart a comment
    heartComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        const user = await User.findById(context.user._id);
        const heart = await Heart.create({
          targetId: comment._id,
          targetType: 'comment',
          user: user
        });

        comment.hearts.push(heart);
        comment.save();

        return heart;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    // take away heart (remove rest from user's favorites)
    unheart: async (parent, { heartId }, context) => {
      if (context.user) {
        let heart = await Heart.find({targetId:heartId});
        const user = await User.findById(context.user._id);
        heart = heart.filter(hearts => hearts.user.toString() === user._id.toString());
        heart = heart[0]

        // assign target to remove heart from and update based on type
        switch (heart.targetType) {
          case 'rest':
            await Heart.findByIdAndDelete(heart._id)
            const rest = await Rest.findById(heart.targetId);
            rest.hearts.pull(heart);
            rest.save();
            // remove rest from user's favorites
            user.favRests.pull(rest);
            user.save();
            break;

          case 'dish':
            const dish = await Dish.findById(heart.targetId);
            dish.hearts.pull(heart);
            dish.save();
            break;

          case 'comment':
            const comment = await Comment.findById(heart.targetId);
            comment.hearts.pull(heart);
            comment.save();
            break;

          default: // invalid target type
            throw new Error('Invalid target type');
        }

        return heart;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
