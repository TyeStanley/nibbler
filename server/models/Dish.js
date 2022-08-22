const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DishSchema = new Schema(
  {
    dishName: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    dishCost: {
      type: Number
    },
    dishRest: {
      type: Schema.Types.ObjectId,
      ref: 'Rest'
    },
    restName: {
      type: String
    },
    dishDescript: {
      type: String
    },
<<<<<<< HEAD
    dishPhotos: {
      type: String
    },
    user: {
=======
    dishPhotos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Photo'
      }
    ],
    userId: {
>>>>>>> server
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: {
      type: String
    },
    
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    hearts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Heart'
      }
    ]
  },
  // Add getter for date formatting and virtual for heartsCount
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

// Create the virtual "heartsCount" variable
DishSchema.virtual('heartsCount').get(function () {
  return this.hearts.length;
});

// Create the virtual "commentsCount" variable
DishSchema.virtual('commentsCount').get(function () {
  return this.comments.length;
});

// Create the virtual "dishphotosCount" variable
DishSchema.virtual('dishphotosCount').get(function () {
  return this.dishPhotos.length;
});

// Create the User model using UserSchema
const Dish = model('Dish', DishSchema);

// Export the User mode
module.exports = Dish;
