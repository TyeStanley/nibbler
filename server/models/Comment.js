const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema(
    {
        commentText: {
            type: String,
            required: 'You need to leave a comment!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)        
        },
        username: {
            type: String,
            required: true
        }
    },
    // Add getter for date formatting
    {
        toJSON: {
            getters: true
        }
    }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;