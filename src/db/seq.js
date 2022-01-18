const { Sequelize } = require('sequelize')
const { MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB } = require('../config/config.default')
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
})

module.exports = seq
// 测试连接是否正确
seq.authenticate().then(res => {
    console.log('数据库连接成功')
}).catch(err => {
    console.log(err + '数据库连接失败')
})