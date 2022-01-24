const User = require("../model/user.model")
const bcrypt = require('bcryptjs')
class UserService {
    async createUser(user_name, password) {
        //写入数据库
        const res = await User.create({ user_name, password })
        return res.dataValues
    }
    async getUserInfo({ ...args }) {
        const whereOpt = { ...args }
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt
        })
        return res ? res.dataValues : null
    }
    async updateUserInfo({ ...args }) {
        const { id, ...whereOpt } = { ...args }
        const res = await User.update(whereOpt, { where: { id } })
        return res[0] > 0 ? true : false
    }
}
module.exports = new UserService()