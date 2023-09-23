const httpStatus = require("http-status")
const { entryService } = require("../services")
const { pick } = require("../utils/pick")

exports.createEntry = async (req, res) => {
    const { content, userId } = req.body

    try {
        // create entry
        const entry = await entryService.createEntry(content, userId)

        return res.status(httpStatus.CREATED).send(entry)
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}   


exports.getEntry = async (req, res) => {
    const { entryId } = req.params
    console.log(entryId)

    try {
        // get entry by id
        const entry = await entryService.getEntryById(entryId)

        return res.status(httpStatus.OK).send(entry)
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}


exports.getEntries = async (req, res) => {
    const options = pick(req.query, ['limit', 'page'])
    try {
        // get entries
        const entries = await entryService.queryEntries(options)

        return res.status(httpStatus.OK).send(entries)
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

exports.updateEntry = async (req, res) => {
    const { content } = req.body
    const { entryId } = req.params
    try {
        const updatedEntry = await entryService.updateEntryById(entryId, content)
        return res.status(httpStatus.OK).send(updatedEntry)
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}