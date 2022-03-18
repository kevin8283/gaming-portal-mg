const Joi = require("joi")

const gameMiddlewares = {
    validateGetGameById: (req, res, next) => {
        const idSchema = Joi.string().hex().min(24)

        const result = idSchema.validate(req.params.id)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }

        return next()
    },

    validateGetGamesByPage: (req, res, next) => {
        const pageSchema = Joi.number().min(1).required()

        const result = pageSchema.validate(req.params.page)

        if (result.error) {
            return res.status(400).json(result.error)
        }
        return next()
    },

    validateAddGame: (req, res, next) => {
        const gameSchema = Joi.object({
            title: Joi.string().required(),
            size: Joi.number().required(),
            price: Joi.number().min(1000).required()
        })

        const result = gameSchema.validate(req.body)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }

        return next()
    },

    validateEditGame: (req, res, next) => {
        const gameSchema = Joi.object({
            title: Joi.string(),
            size: Joi.number(),
            price: Joi.number().min(1000),
            clients: Joi.array(),
            number_of_sales: Joi.number()
        })

        const result = gameSchema.validate(req.body)

        if (result.error) {
            return res.status(400).json(result.error.details[0].message)
        }

        return next()
    }
}

module.exports = { gameMiddlewares }