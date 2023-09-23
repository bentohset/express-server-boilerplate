const bcrypt = require('bcryptjs')

exports.encryptPassword = async (password) => {
    const encrypted = await bcrypt.hash(password, 8)
    return encrypted
}

exports.isPasswordMatch = async (password, userPassword) => {
    return bcrypt.compare(password, userPassword)
}