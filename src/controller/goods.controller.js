const path = require('path')
const { PassThrough } = require('stream')
const { flieUploadError } = require('../constant/err.type')
class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        if (file) {
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    img_path: path.basename(file.path),

                }
            }
        } else {
            console.error('文件上传出错')
            return ctx.app.emit('error', flieUploadError, ctx)
        }
    }
}

module.exports = new GoodsController()