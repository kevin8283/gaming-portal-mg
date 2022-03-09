const mongoose = require("mongoose")

class DatabaseConnector {
    constructor(url) {
        this.url = url
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }

    connect(callback) {
        mongoose.connect(this.url, this.options, callback)
    }
}

module.exports = DatabaseConnector