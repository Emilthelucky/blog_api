import { userModel } from '../../models/user/userModel.js'
import { responseError } from '../../utils/responseError.js'
import { responseSuccess } from '../../utils/responseSuccess.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email, password)

    if (!username) {
        return responseError(res, 'Username daxil et')
    }

    if (!email) {
        return responseError(res, 'Email daxil et')
    }

    if (!password) {
        return responseError(res, 'Password daxil et')
    }

    if (password.length < 8) {
        return responseError(res, 'Password en az 8 simvoldan ibaret olmali')
    }

    const user = await userModel.findOne({ username })
    if (user) {
        return responseError(res, 'Username kayitli')
    }

    const newUser = await userModel.create({ username, email, password })
    await newUser.save()
    return responseSuccess(res, 'User qeydiyyatdan kecdi')
}

export const login = async (req, res) => {
    const { username, password } = req.body

    if (!username) {
        return responseError(res, 'Username daxil et')
    }

    if (!password) {
        return responseError(res, 'Password daxil et')
    }

    const user = await userModel.findOne({ username })
    if (!user) {
        return responseError(res, 'User yoxdur')
    }

    if (password == user.password) {
        return responseSuccess(res, user)
    }

    return responseError(res, 'Parol yanlisdir')
}
