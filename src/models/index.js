const db = require('./dbConnection')

module.exports = {
    User: db.users,
    Entry: db.entries,
    db
}