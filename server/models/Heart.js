const { Schema, model } = require('mongoose');

const HeartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }

);

// Create the Heart model using HeartSchema
const Heart = model('Heart', HeartSchema);

// Export the Heart model
module.exports = Heart;
