const express = require("express")
const dotenv = require("dotenv")
const DatabaseConnector = require("./helpers/DatabaseConnector")

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
dotenv.config()

//Constants declaration
const port = process.env.PORT || 8080
const dbURI = process.env.dbURI

//Connection with database
const db = new DatabaseConnector(dbURI)
db.connect(() => {
    console.log("Application is connected with database")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})