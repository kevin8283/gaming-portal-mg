const Joi = require("joi")

const purchaseMiddleware = {
    validateId: (req, res, next) => {
        const id = req.params.id
        const idSchema = Joi.string().min(24).hex().required()

        const result = idSchema.validate(id)
        if (result.error) {
            return res.status(400).json(result.error)
        }
        return next()
    },

    validatePurchase: (req, res, next) => {
        const { games_id, client_id } = req.body
        const purchaseSchema = Joi.object({
            games_id: Joi.array().items(Joi.string().min(24).hex()).min(1).required(),
            client_id: Joi.string().min(24).hex().required()
        })

        const result = purchaseSchema.validate({games_id, client_id})
        if (result.error) {
            return res.status(400).json(result.error)
        }
        return next()
    }
}

module.exports = purchaseMiddleware