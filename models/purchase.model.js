const mongoose = require("mongoose")

const purchaseSchema = new mongoose.Schema({
    games_id: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    client_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Purchase", purchaseSchema)