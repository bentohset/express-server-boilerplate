const httpStatus = require("http-status");
const { userService, tokenService, authService } = require("../services");


exports.register = async (req, res) => {
    // do some sort of validation
    const { username, password } = req.body;

    try {
        // create user
        const user = await userService.createUser(username, password)
        // create jwt
        const token = await tokenService.generateToken(user.id)

        // return user and token
        return res.status(httpStatus.CREATED).json({user, token})

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // login user
        const user = await userService.getUserByUsername(username)
        const result = await authService.loginWithUsername(user, password)

        // create jwt
        const token = await tokenService.generateToken(result.id)

        // return user and token
        return res.status(httpStatus.OK).json({user, token})

    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}