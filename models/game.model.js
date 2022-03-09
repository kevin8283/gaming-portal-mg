const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    number_of_sales: {
        type: Number,
        default: 0
    },
    clients: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
})

module.exports = mongoose.model("Game", gameSchema)