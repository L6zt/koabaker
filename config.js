    const path = require('path')
	const  uploadDomain = 'http://cdn.jcmark.cn/koa'
    const uploadDir = path.resolve(__dirname, './uploads/temp')
    const keys = ['md5 sha1']
    module.exports = {
		uploadDomain,
	    uploadDir,
	    keys
    }