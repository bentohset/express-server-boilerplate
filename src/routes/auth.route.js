const express = require('express')
const { authController } = require('../controllers')
const { validate } = require('../middlewares/validate')
const { authValidation } = require('../validation')

const router = express.Router()

// @route /auth
router
    .route('/login')
    .post(validate(authValidation.login),authController.login)

router
    .route('/register')
    .post(validate(authValidation.register), authController.register)

module.exports = router
