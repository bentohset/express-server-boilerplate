const express = require('express')
const entryRoute = require('./entry.route')
const authRoute = require('./auth.route')

const router = express.Router()

const defaultRoutes = [
    {
      path: '/entry',
      route: entryRoute
    },
    {
        path: '/auth',
        route: authRoute
    }
];


defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router