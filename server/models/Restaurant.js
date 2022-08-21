const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const RestSchema = new Schema(
  {
    restName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    restAddress: {
      type: String,
    },
    restCity: {
      type: String,
    },
    restState: {
      type: String,
    },
    restDescript: {
      type: String,
    },
    restPhotos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Photo'
        }
    ],
    restDescript: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dishes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dish",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    hearts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
  }, 
  // Add getter for date formatting and virtual for heartsCount
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// Create the virtual "heartsCount" variable
RestSchema.virtual("heartsCount").get(function () {
  return this.hearts.length;
});

// Create the virtual "commentsCount" variable
RestSchema.virtual("commentsCount").get(function () {
  return this.comments.length;
});

// Create the virtual "restPhotosCount" variable
RestSchema.virtual("restPhotosCount").get(function () {
  return this.restPhotos.length;
});

// Create the virtual "dishesCount" variable
RestSchema.virtual("dishesCount").get(function () {
  return this.dishes.length;
});

// Create the Restaurant model using RestSchema
const Rest = model("Rest", RestSchema);

// Export the Restaurant model
module.exports = Rest;