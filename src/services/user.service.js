// functions which consists of db queries to prisma
const { User } = require('../models');
const { encryptPassword } = require('../utils/encryption');

const createUser = async (username, password) => {
    const user = await getUserByUsername(username)
    if (user) {
        throw new Error('Username exists')
    }
    return await User.create({
        username: username,
        password: await encryptPassword(password),
        created_at: new Date(),
        updated_at: new Date()
    })
}

const getUserByUsername = async (username) => {
    const user = await User.findOne({
        where: { username: username }
    })

    return user
}

const getUserbyId = async (userId) => {
    const user = await User.findByPk(userId)

    return user
}

const getUsers = async () => {
    const users = await User.findAll()

    return users
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserbyId,
    getUsers
}