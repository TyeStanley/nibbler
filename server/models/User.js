const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        followers: [ 
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        restaurants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Restaurant'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

