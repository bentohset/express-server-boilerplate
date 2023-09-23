const { db } = require('./models')

const app = require('./app')

const port = process.env.port || 3000

db.sequelize.sync()
    .then(() => {
        console.log('Synced db')
    })
    .catch((error) => {
        console.log('Failed to sync db:' + error.message)
    })

const startServer = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
}

startServer()