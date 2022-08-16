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

// Set up pre-save middleware to create password
UserSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
// Compare the incoming password with the hashed password
UserSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};
  
// Create the User model using UserSchema
const User = model('User', UserSchema);

// Export the User mode
module.exports = User;