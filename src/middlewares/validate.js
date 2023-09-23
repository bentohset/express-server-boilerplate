const Joi = require("joi")
const { pick } = require("../utils/pick")
const httpStatus = require("http-status")

exports.validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'body', 'query'])
    const obj = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(obj)

    if (error) {
        const errorMsg = error.details.map((details) => details.message).join(', ')
        return res.status(httpStatus.BAD_REQUEST).json({ error: errorMsg })
    }

    Object.assign(req, value)
    return next()
}

