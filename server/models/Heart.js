const { Schema, model } = require('mongoose');

const HeartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }

);

// Create the Restaurant model using RestSchema
const Heart = model('Heart', HeartSchema);

// Export the Restaurnt model
module.exports = Heart;
