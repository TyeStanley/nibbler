const { Schema, model } = require('mongoose');

const RestaurantSchema = new Schema ({
    restName: {
        type: String,
        required: true
    },
    createdBy: {
        type: String
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    },
    dishName: {
        type: String
    },
    



})