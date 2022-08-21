const { Schema, model } = require('mongoose');

const PhotoSchema = new Schema(
    {
        photoUrl: {
            type: String
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }
);

// Create the Photo model using PhotoSchema
const Photo = model('Photo', PhotoSchema);

// Export the Photo mode
module.exports = Photo;