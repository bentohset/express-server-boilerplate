const { Entry } = require('../models');

const createEntry = async (content, userId) => {
    return await Entry.create({
        content: content,
        user_id: userId,
        updated_at: new Date()
    })
}

const getEntryById = async (entryId) => {
    const entry = await Entry.findByPk(entryId)

    return entry
}

const queryEntries = async (options) => {
    const page = options.page ?? 1
    const limit = options.limit ?? 10

    const entries = await Entry.findAll({
        offset: (page-1)*limit,
        limit: limit
    })

    return entries
}

const updateEntryById = async (entryId, content) => {
    const entry = await getEntryById(entryId)
    if (!entry) {
        throw new Error('No such entry found')
    }

    const updatedEntry = await Entry.update({
        content: content,
        updated_at: new Date()
    },{ 
        where: {id: entryId},
        returning: true
    })

    return updatedEntry
}

module.exports = {
    createEntry,
    getEntryById,
    queryEntries,
    updateEntryById
}