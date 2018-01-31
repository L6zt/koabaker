	const {uploadDir} = require('./config')
	const fs = require('fs')
	const makeDir = require('make-dir')
	fs.existsSync(uploadDir) ||  makeDir.sync(uploadDir)