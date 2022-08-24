const { Schema, model } = require('mongoose');

const HeartSchema = new Schema({
  targetId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    enum: ['rest', 'dish', 'comment'],
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create the Heart model using HeartSchema
const Heart = model('Heart', HeartSchema);

// Export the Heart model
module.exports = Heart;
