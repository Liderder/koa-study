const Koa = require('koa')
const KoaBody = require('koa-body')

const errHeadler = require('./errHeadler')

const userRouter = require('../router/user.route')

const app = new Koa()

app.use(KoaBody())
app.use(userRouter.routes())

//统一的错误处理
app.on('error', errHeadler)

module.exports = app