const Game = require("../models/game.model")
const Client = require("../models/client.model")

const gameController = {

    getAllGames: async (req, res) => {
        try {
            const games = await Game.find()

            return res.json(games)
        }
        catch(error) {
            throw error
        }
    },

    getGameById: async (req, res) => {
        try {
            const game = await Game.findById(req.params.id)

            if (game) {
                return res.json(game)
            }
            return res.status(404).json("No game found matching the provided ID")
        } 
        catch (error) {
            throw error
        }
    },

    getGameByTitle: async (req, res) => {
        try {
            const title = req.body.title
            const filter = req.body.filter
            const regex = new RegExp(`${title}`, 'i')
            let results = []

            if (filter === "all") {
                const games = await Game.find({title: regex})
                const clients = await Client.find({name: regex})

                results = [...games, ...clients]

                if (results.length > 0) {
                    return res.json(results)
                }
                return res.json([])
            }
            else if (filter === "games") {
                const games = await Game.find({title: regex})

                if (games.length > 0) {
                    return res.json(games)
                }
                return res.json([])
            }
            else {
                const clients = await Client.find({name: regex})

                if (clients.length > 0) {
                    return res.json(clients)
                }
                return res.json([])
            }
        }
        catch(e) {
            throw e
        }
    },

    getGamesByPage: async (req, res) => {
        try {
            const page = req.params.page
            const number_of_skips = page === 1 ? 0 : (page - 1) * 50

            const games = await Game.find().skip(number_of_skips).limit(50)

            return res.json(games)
        }
        catch(e) {
            throw e
        }
    },

    addGame: async (req, res) => {
        try {
            const { title, size, price } = req.body
            const newGame = new Game({ title, size, price })

            const game = await newGame.save()
            return res.json(game)
        }
        catch(e) {
            throw e
        }
    },

    editGame: async (req, res) => {
        try {
            const game = await Game.findOneAndUpdate({_id: req.params.id}, {
                title: req.body.title,
                size: req.body.size,
                price: req.body.price,
                clients: req.body.clients,
                number_of_sales: req.body.number_of_sales
            })

            if (game) {
                await game.save()

                return res.json(game)
            }
            return res.status(404).json("No game found")
        }
        catch(e) {
            throw e
        }
    },

    deleteGame: async (req, res) => {
        try {
            const deleted = await Game.findOneAndDelete({_id: req.params.id})

            return res.json(deleted)
        }
        catch(e) {
            throw e
        }
    }
}

module.exports = { gameController }