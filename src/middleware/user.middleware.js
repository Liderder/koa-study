const bcrypt = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')
const { userFormateError,
    userAlreadyExisted,
    userDoesNotExist,
    userLoginError,
    userPasswordError
} = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    if (!user_name || !password) {
        console.error("用户名或密码为空", ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next()
}

const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    // if (await getUserInfo({ user_name })) {
    //     ctx.app.emit('error', userAlreadyExisted, ctx)
    //     return
    // }
    try {
        const res = await getUserInfo({ user_name })
        if (res) {
            console.error('用户名已经存在', { user_name })
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }
    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    // hash保存的是密文
    const hash = bcrypt.hashSync(password, salt)
    ctx.request.body.password = hash
    await next()
}

const verifyLogin = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUserInfo({ user_name })
        // 01.判断用户是否存在
        if (!res) {
            console.error('用户名不存在', { user_name })
            return ctx.app.emit('error', userDoesNotExist, ctx)

        }
        // 02.密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('用户密码错误', { password })
            return ctx.app.emit('error', userPasswordError, ctx)

        }
    } catch (error) {
        console.error(error)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}