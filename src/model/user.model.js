const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const User = seq.define('zd-User', {
    //id会被自动创建
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名唯一"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码"
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "管理员权限，0:不是管理员；1:是管理员"
    },
},
    // {
    //     timestamps: false
    // }
)
//强制同步数据库：创建数据表
// User.sync({ force: true })
module.exports = User