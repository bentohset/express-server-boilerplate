const { isPasswordMatch } = require('../utils/encryption');

const loginWithUsername = async (user, password) => {
    if (!user) {
        throw new Error('Incorrect username')
    }
    if (!(await isPasswordMatch(password, user.password))) {
        throw new Error('Incorrect password')
    }

    delete user[password]

    return user
}

module.exports = {
    loginWithUsername
}