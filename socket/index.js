const socket = require('socket.io')
module.exports = (server) => {
	const io = socket(server, {
		cookie: true
	})
	io.on('connection', function (socket) {
		console.log(socket.handshake.headers)
		socket.emit('news', {hello: 'world'})
		socket.on('my other event', function (data) {
			console.log(socket.request.headers)
		})
	})
}