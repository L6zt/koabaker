    const path = require('path')
	const  uploadDomain = 'http://cdn.jcmark.cn/koa'
    const uploadDir = path.resolve(__dirname, './uploads/temp')
    const keys = ['md5 sha1']
    const codeConfig = {
	    size: 5,
	    noise: 2,
	    height: 44
    }
    module.exports = {
		uploadDomain,
	    uploadDir,
	    keys,
	    codeConfig
    }