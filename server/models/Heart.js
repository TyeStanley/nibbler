const { Schema, model } = require('mongoose');

const HeartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }

    }

)