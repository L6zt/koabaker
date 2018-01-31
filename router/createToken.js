	const {codeConfig} = require( 'config')
	const svgCaptcha = require('svg-captcha')
	const createToekRouter = (route) => {
		route.post('/creteToken/randomCode', async(ctx) => {
			const captcha = svgCaptcha.create(codeConfig)
			ctx.type('svg')
			ctx.response.status = 200
			ctx.response.body = captcha
		})
	}
	module.exports = createToekRouter