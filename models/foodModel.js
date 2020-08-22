const mongoose = require('mongoose');


const foodSchema = mongoose.Schema({
    food: String,
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Food", foodSchema)