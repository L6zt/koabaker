	const {uploadDir, uploadDomain} = require('../config')
	const body = require('koa-body')
	const path = require('path')
	const fs = require('fs')
	const dir = uploadDir
	const {success, fail} = require('../response')
	const {validateImg} = require('../utils/index')
	const eFlag = 101
	const userAuth = (role) => {
		return  async (ctx, next) => {
			const {user} = ctx.session
			if(user === null || user === undefined) {
				ctx.body = fail({flag: 999, errMsg:'未登陆，请登陆'})
			} else  {
				if (parseInt(user.role) <= role) {
					await next()
				}
				else {
					ctx.body = (fail({flag: 0, errMsg: '权限不足'}))
				}}
		}
	}
	const uploadFile = (router) => {
		router.post('/uploadFile/single',userAuth(3), body({
			multipart: true,
			formidable: {
				uploadDir: dir,
				hash: 'sha1'
			},
		}), async (ctx) => {
			const files =  ctx.request.body.files
			const file = files['file']
			if (file) {
				const {path: tmPath, name, hash, type} = file
				if (validateImg(type)) {
					try {
						const extname = path.extname(name) || '.png'
						const eResult = `/uploads/${hash}${extname}`
						const finalFile = path.resolve(__dirname, `..${eResult}`)
						const result = await new Promise((r, j) => {
							fs.rename(tmPath, finalFile, (err) => {
								if(err) {
									j({err: 'file fail'})
									return
								}
								r(eResult)
							})
						})
						ctx.body = success({path:  `${process.env.uploadDomain}stUpload${result.replace(/^\/uploads/, '')}`})
					} catch (e) {
					   ctx.body = fail({flag: 500})
					}
				} else {
					ctx.body =  fail({flag: eFlag, errMsg: '文件类型错误'})
				}
				return
			} else {
				ctx.body = fail({flag: 222})
			}})
	}
	module.exports = uploadFile