	const fs = require('fs')
	let uuid = 0
	const add = (ag = 'index') => {
		return`${ag}  ${uuid++}`
	}
	const toString = (ag) => {
		return Object.prototype.toString.call(ag)
	}
	const isArray = (ay) => {
		return toString(ay) == '[object Array]'
	}
	const isDef = (ag) => {
		return ag !== null && ag !== undefined
	}
	const checkArg = (args = []) => {
	// arguments 不能直接使用
		if (isArray(args) &&  args.length === 0) {
			return false
		}
		const index = args.findIndex (item => {
			return !isDef(item)
		})
		if (index !== -1) {
			return false
		}
		return true
	}
	const loadRouterMoudles = (router, cbArgs = []) => {
		cbArgs.forEach(cb => {
			cb(router)
		})
	}
	const validateImg = (type) => {
	        const typeList = [
	        	'image/jpeg',
		        'image/jpeg'
	        ]
		  const index = typeList.findIndex(item => item === type)
		  if (index === -1) {
	        return false
		  }
		  return true
	}
	module.exports = {
		add,
		checkArg,
		loadRouterMoudles,
		validateImg
	}
	