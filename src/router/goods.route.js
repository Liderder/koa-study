const { upload } = require('../controller/goods.controller')

const Router = require('koa-router')

const router = new Router({ prefix: '/goods' })

router.post('/upload', upload)

module.exports = router