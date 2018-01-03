const {fail} = require('../response')
const notFoundRouter = (router) => {
	router.all('*',  async ctx => {
		ctx.body = fail({flag: 404})
	})
}
module.exports = notFoundRouter