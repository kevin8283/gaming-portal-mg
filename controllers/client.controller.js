const Client = require("../models/client.model")

const clientController = {
    getAllClients: async (req, res) => {
        try {
           const clients = await Client.find()
           
           return res.json(clients)
        } 
        catch (error) {
            throw error
        }
    },

    getClient: async (req, res) => {
        try {
            const client = await Client.findById(req.params.id)

            if (client) {
                return res.json(client)
            }

            return res.status(404).json("No client found matching the provided ID")
        } 
        catch (error) {
            throw error
        }
    },

    createClient: async (req, res) => {
        const name = req.body.name
        const phone_number = req.body.phone_number || null

        const clientDatas = phone_number === null ? {name, phone_number} : {name}

        try {
            const client = new Client(clientDatas)
            await client.save()

            return res.json(client)
        } 
        catch (error) {
            throw error
        }
    },

    editClient: async (req, res) => {
        try {
            const clientDatas = req.body
            const client = await Client.findOneAndUpdate({_id: req.params.id}, clientDatas)
    
            await client.save()
    
            return res.json(client)
        } 
        catch (error) {
            throw error
        }
    },

    deleteClient: async (req, res) => {
       try {
            const deletedClient = await Client.findOneAndDelete({_id: req.params.id})

            return res.json(deletedClient)
       } 
       catch (error) {
           throw error
       }
    }
}

module.exports = { clientController }