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
	const isNum = (ag) => {
	// isNuN ?
		return /[1-9][0-9]*$/.test(ag)
	}
	const uniqKey = ({target, key}) => {
		const md = {}
		// 是否为数组
		if (isArray(target)) {
			let result
			target.forEach(item => {
				const id = item[key]
				id && (md[id] = null)
			})
			result = Object.keys(md)
			if (result.length === 0) {
				return null
			} else {
				return result
			}
		} else {
			return null
		}
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
		        'image/jpeg',
		        'image/png'
	        ]
		  const index = typeList.findIndex(item => item === type)
		  if (index === -1) {
	        return false
		  }
		  return true
	}
	const getCookie = (cookie) => {
		const ay =  cookie.replace(/\s/g,'').split(';')
		const result = {}
		ay.forEach(item => {
			const kv = item.split('=')
			result[kv[0]] = kv[1]
		})
		return result
	}
	module.exports = {
		add,
		uniqKey,
		checkArg,
		loadRouterMoudles,
		validateImg,
		isNum,
		getCookie
	}
	