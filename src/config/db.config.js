const db = (process.env.NODE_ENV !== 'test' ? "test" : "testdb")

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "281100",
    DB: db,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};