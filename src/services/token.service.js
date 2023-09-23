const jwt = require('jsonwebtoken')

const EXPIRY_HOURS = 6
const SECRET = 'testsecret'

const generateToken = async (userId) => {
    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + EXPIRY_HOURS*3600,
    }

    return jwt.sign(payload, SECRET)
}

const verifyToken = async (token) => {
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            throw new Error('Invalid token')
        }
        const userId = Number(decoded.sub)
        
        return userId
    })
}


module.exports = {
    generateToken,
    verifyToken
}