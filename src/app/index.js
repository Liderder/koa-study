const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const koaStatic = require('koa-static')

const errHeadler = require('./errHeadler')
const router = require('../router/index')

const app = new Koa()

console.log(process.cwd())
app.use(KoaBody({
    multipart: true,
    formidable: {
        // 不推荐使用‘../’的方式写文件上传的路径
        uploadDir: path.join(__dirname, '../uploads'),
        keepExtensions: true
    }
}))
app.use(koaStatic(path.join(__dirname, '../uploads')))
app.use(router.routes()).use(router.allowedMethods())
//统一的错误处理
app.on('error', errHeadler)

module.exports = app