const { findById } = require("../models/game.model");
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

            return res.json(game)
        } 
        catch (error) {
            throw error
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
                price: req.body.price
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