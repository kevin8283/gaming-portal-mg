const Game = require("../models/game.model")

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

            if(game) {
                return res.json(game)
            }
            return res.status(404).json("No game found matching the provided ID")
        } 
        catch (error) {
            throw error
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