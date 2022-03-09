const router = require("express").Router()
const { getAllClients, getClient, createClient, editClient, deleteClient } = require("../controllers/client.controller").clientController

router.get("/", getAllClients)
router.get("/:id", getClient)

router.post("/add", createClient)

router.put("/edit/:id", editClient)

router.delete("/delete/:id", deleteClient)

module.exports = router