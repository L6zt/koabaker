const socket = require('socket.io')
const {getCookie} = require('../utils/index')
module.exports = (server) => {
	const io = socket(server, {
		cookie: true
	})
	const isLogin = () => {
	}
	io.use((socket, next) => {
		const cookie = getCookie(socket.handshake.headers.cookie)
		if (cookie['koa:sess']) {
			const base64 = new Buffer(cookie['koa:sess'], 'base64').toString()
			const user = JSON.parse(base64)
			socket.$userMsg = user
		}
			next()
	})
	io.on('connection', function (socket) {
		console.log(socket.$userMsg)
		socket.emit('news', {hello: Math.random().toString().slice(2)})
		socket.on('my other event', function (data) {
		})
	})
}