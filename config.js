    const path = require('path')
	const  uploadDomain = 'http://cdn.jcmark.cn/koa'
    const uploadDir = path.resolve(__dirname, './uploads/temp')
    const keys = ['md5 sha1']
    const codeConfig = {
	    size: 4,
	    noise: 2,
	    fontSize: 45,
	    color: true,
	    height: 32,
	    background: '#909399'
    }
    module.exports = {
		uploadDomain,
	    uploadDir,
	    keys,
	    codeConfig
    }