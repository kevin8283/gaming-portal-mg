const Joi = require("joi")

const clientsMiddleware = {
    validateGetClientById: (req, res, next) => {
        const idSchema = Joi.string().hex().min(24).required()

        const result = idSchema.validate(req.params.id)

        if(result.error) {
            return res.status(400).json(result.error.details)
        }
        return next()
    },

    validateAddClient: (req, res, next) => {
        const clientSchema = Joi.object({
            name: Joi.string().max(30).required(),
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/, 'numbers')
        })

        const result = clientSchema.validate(req.body)

        if(result.error) {
            return res.status(400).json(result.error.details)
        }
        return next()
    },

    validateEditClient: (req, res, next) => {
        const clientSchema = Joi.object({
            name: Joi.string().max(30),
            phone_number: Joi.string().length(10).pattern(/^[0-9]+$/, 'numbers')
        })

        const result = clientSchema.validate(req.body)

        if(result.error) {
            return res.status(400).json(result.error.details)
        }
        return next()
    }
}

module.exports = { clientsMiddleware }