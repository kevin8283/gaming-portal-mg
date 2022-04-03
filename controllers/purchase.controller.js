const Purchase = require("../models/purchase.model")
const Client = require("../models/client.model")
const Game = require("../models/game.model")

const purchaseController = {
    getAllPurchases: async (req, res) => {
        const sumPrices = (games) => {
            let sum = 0

            games.forEach(game => { sum += game.price})

            return sum
        }

        try {
            const purchases = await Purchase.aggregate([
                {
                    $lookup: {
                        from: "clients",
                        localField: "client_id",
                        foreignField: "_id",
                        as: "client"
                    }
                },
                {
                    $unwind: "$client"
                },
                {
                    $lookup: {
                        from: "games",
                        localField: "games_id",
                        foreignField: "_id",
                        as: "games"
                    }
                }
            ])

            return res.json(purchases)
        }
        catch (error) {
            throw error
        }
    },

    getPurchaseById: async (req, res) => {
        try {
            const purchase = await Purchase.findById(req.params.id)

            if (purchase) {
                return res.json(purchase)
            }
            return res.status(404).json(`No transaction found for the ID ${req.params.id}`)
        }
        catch (error) {

        }
    },

    getDetailedPurchase: async (req, res) => {
        try {
            const purchaseID = req.params.id

            const purchases = await Purchase
                .aggregate([
                    {
                        $lookup: {
                            from: 'games',
                            localField: 'games_id',
                            foreignField: '_id',
                            as: 'games'
                        }
                    },
                    {
                        $lookup: {
                            from: 'clients',
                            localField: 'client_id',
                            foreignField: '_id',
                            as: 'client'
                        }
                    },
                    {
                        $unwind: "$client"
                    }
                ])
                .project({_id: 1, client: 1, games: 1, date: 1})

            const result = purchases.filter(purchase => purchase._id.toString() === purchaseID)

            return res.json({...result[0]})
        }
        catch(e) {

        }
    },

    getClientPurchases: async (req, res) => {
        try {
            const { purchased_games } = await Client.findById(req.params.id, { purchased_games: 1, _id: 0 })

            if (purchased_games.length > 0) {
                const games = await Game.find({ _id: { $in: purchased_games } })

                return res.json(games)
            }
            return res.json(purchased_games)
        }
        catch (error) {
            throw error
        }
    },

    getGamePurchases: async (req, res) => {
        try {
            const clients = await Game.findById(req.params.id, { clients: 1, _id: 0 })

            if (clients === null) {
                return res.status(404).json(`ID ${req.params.id} does not match any game`)
            }

            else {
                const clientsIdList = clients.clients
                if (clientsIdList.length > 0) {
                    const clientWhoPurchased = await Client.find({ _id: { $in: clientsIdList } })

                    return res.json(clientWhoPurchased)
                }

                return res.json([])
            }
        }
        catch (error) {
            throw error
        }
    },

    savePurchase: async (req, res) => {
        try {
            const purchase = new Purchase({
                games_id: req.body.games_id,
                client_id: req.body.client_id,
                date: Date.now()
            })

            const result = await purchase.save()
            const client = await Client.findById(req.body.client_id)

            client.purchased_games.addToSet(...req.body.games_id)
            client.number_of_purchase += req.body.games_id.length
            client.markModified()
            await client.save()

            const games = await Game.find({ _id: { $in: req.body.games_id } })
            games.forEach(async (game) => {
                game.clients.addToSet(req.body.client_id)
                game.number_of_sales += 1
                game.markModified()

                await game.save()
            })


            return res.json(result)
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = { purchaseController }