const httpStatus = require("http-status");
const { tokenService } = require("../services");

exports.auth = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'missing token. authorization denied'})
    }

    try {
        const userId = tokenService.verifyToken(token)

        if (!userId) {
            res.status(httpStatus.UNAUTHORIZED).json({ message: 'invalid user id'})
        } else {
            next();
        }

    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
    }
}