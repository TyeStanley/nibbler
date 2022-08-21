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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
        },
        comments: [
            {
              type: Schema.Types.ObjectId,
              ref: "Comment",
            },
          ],      
        hearts:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Heart'
            }
        ]
    },
    // Add getter for date formatting as well as virtual for heartsCount
    {
        toJSON: {
            getters: true
        }
    }
);

// Create the virtual "heartsCount" variable 
CommentSchema.virtual('heartsCount').get(function() {
    return this.hearts.length;
});

// Create the virtual "commentsCount" variable 
CommentSchema.virtual('commentsCount').get(function() {
    return this.comments.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;