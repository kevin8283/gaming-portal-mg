const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String
    },
    purchased_games: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    number_of_purchase: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Client", clientSchema)