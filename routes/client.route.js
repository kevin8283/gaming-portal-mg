const router = require("express").Router()
const { getAllClients, getClient, createClient, editClient, deleteClient } = require("../controllers/client.controller").clientController
const { validateGetClientById, validateAddClient, validateEditClient } = require("../middlewares/client-validation.middleware").clientsMiddleware

router.get("/", getAllClients)
router.get("/:id", validateGetClientById, getClient)

router.post("/add", validateAddClient, createClient)

router.put("/edit/:id", validateGetClientById, validateEditClient, editClient)

router.delete("/delete/:id", validateGetClientById, deleteClient)

module.exports = router