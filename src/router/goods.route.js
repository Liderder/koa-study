const { upload } = require('../controller/goods.controller')
const { auth, hadAminPermission } = require('../middleware/auth.middleware')
const Router = require('koa-router')

const router = new Router({ prefix: '/goods' })

router.post('/upload', auth, hadAminPermission, upload)

module.exports = router