const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const DishSchema = new Schema ({
    dishName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    dishCost: {
        type: Number
    },
    dishRest: {

    },
    dishDescript: {
        type: String
    },
    dishPhotos: [],
    restaurants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    ], 
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
  },
  {
    toJSON: {
        getters: true
    }
  }
);

// Create the User model using UserSchema
const Dish = model('Dish', DishSchema);

// Export the User mode
module.exports = Dish;