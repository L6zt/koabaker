	const {codeConfig} = require( '../config')
	const svgCaptcha = require('svg-captcha')
	const {checkArg} = require('../utils/index')
	const createTokenRouter = (route) => {
		route.get('/createToken/randomCode', async(ctx) => {
			const captcha = svgCaptcha.create(codeConfig)
			ctx.type = 'svg'
			ctx.response.status = 200
			ctx.session.code = captcha.text
			ctx.response.body = captcha.data
		})
	}
	module.exports = createTokenRouter