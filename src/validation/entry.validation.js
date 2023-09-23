const Joi = require('joi')

const createEntry = {
    body: Joi.object().keys({
        content: Joi.string().required(),
        userId: Joi.number().required()
    })
};

const getEntries = {
    query: Joi.object().keys({
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getEntry = {
    params: Joi.object().keys({
        entryId: Joi.number().integer().required()
    })
};

const updateEntry = {
    params: Joi.object().keys({
        entryId: Joi.number().integer().required()
    }),
    body: Joi.object().keys({
        content: Joi.string()
    })
};

module.exports = {
    createEntry,
    getEntries,
    getEntry,
    updateEntry
};