const express = require('express')
const { entryController } = require('../controllers')
const { entryValidation } = require('../validation')
const { validate } = require('../middlewares/validate')

const router = express.Router()

router
    .route('/')
    .post(validate(entryValidation.createEntry), entryController.createEntry)
    .get(validate(entryValidation.getEntries), entryController.getEntries)


router
    .route('/:entryId')
    .get(validate(entryValidation.getEntry), entryController.getEntry)
    .patch(validate(entryValidation.updateEntry), entryController.updateEntry)


module.exports = router