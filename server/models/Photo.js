const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema({
  targetId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  targetType: {
    type: String,
    enum: ['rest', 'dish'],
    required: true
  },
  photoUrl: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create the Photo model using PhotoSchema
const Photo = model('Photo', PhotoSchema);

// Export the Photo mode
module.exports = Photo;
