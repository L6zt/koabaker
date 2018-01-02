const {fail} = require('../response')
const notFound = (router) => {
	router.all('*',  async ctx => {
		ctx.body = fail({flag: 404})
	})
}
module.exports = notFound