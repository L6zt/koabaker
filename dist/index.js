(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(3);
let uuid = 0;
const add = (ag = 'index') => {
	return `${ag}  ${uuid++}`;
};
const toString = ag => {
	return Object.prototype.toString.call(ag);
};
const isArray = ay => {
	return toString(ay) == '[object Array]';
};
const isDef = ag => {
	return ag !== null && ag !== undefined;
};
const isNum = ag => {
	// isNuN ?
	return (/[1-9][0-9]*$/.test(ag)
	);
};
const uniqKey = ({ target, key }) => {
	const md = {};
	// 是否为数组
	if (isArray(target)) {
		let result;
		target.forEach(item => {
			const id = item[key];
			id && (md[id] = null);
		});
		result = Object.keys(md);
		if (result.length === 0) {
			return null;
		} else {
			return result;
		}
	} else {
		return null;
	}
};
const checkArg = (args = []) => {
	// arguments 不能直接使用
	if (isArray(args) && args.length === 0) {
		return false;
	}
	const index = args.findIndex(item => {
		return !isDef(item);
	});
	if (index !== -1) {
		return false;
	}
	return true;
};
const loadRouterMoudles = (router, cbArgs = []) => {
	cbArgs.forEach(cb => {
		cb(router);
	});
};
const validateImg = type => {
	const typeList = ['image/jpeg', 'image/jpeg', 'image/png'];
	const index = typeList.findIndex(item => item === type);
	if (index === -1) {
		return false;
	}
	return true;
};
module.exports = {
	add,
	uniqKey,
	checkArg,
	loadRouterMoudles,
	validateImg,
	isNum
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.success = data => {
	return JSON.stringify({
		flag: 1,
		data
	});
};
exports.fail = ({ flag = 0, errMsg }) => {
	let response = {};
	switch (flag) {
		case 222:
			{
				response = {
					flag: 0,
					errMsg: '参数错误'
				};
				break;
			}
		case 404:
			{
				response = {
					flag: 0,
					errMsg: '找不到此接口'
				};
				break;
			}
		case 999:
			{
				response = {
					flag: 999,
					errMsg: '未登录'
				};
				break;
			}
		case 500:
			{
				response = {
					flag: 500,
					errMsg: '服务器错误'
				};
			}
		default:
			{
				response = {
					flag,
					errMsg
				};
			}
	}
	return JSON.stringify(response);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const path = __webpack_require__(6);
const uploadDomain = 'http://cdn.jcmark.cn/koa';
const uploadDir = path.resolve(__dirname, './uploads/temp');
const keys = ['md5 sha1'];
const codeConfig = {
			size: 4,
			noise: 2,
			fontSize: 45,
			color: true,
			height: 32,
			background: '#909399'
};
module.exports = {
			uploadDomain,
			uploadDir,
			keys,
			codeConfig
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const Sequelize = __webpack_require__(5);
const sequelize = new Sequelize('koa', 'root', '97019jiao', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});
const User = sequelize.import(`${__dirname}/model/user`);
const Event = sequelize.import(`${__dirname}/model/event`);
const PeventResult = sequelize.import(`${__dirname}/model/p_event_result`);
const SeventResult = sequelize.import(`${__dirname}/model/s_event_result`);
module.exports = {
	sequelize,
	User,
	Event,
	PeventResult,
	SeventResult
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("blueimp-md5");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

__webpack_require__(10);
const { URL } = __webpack_require__(12);
const Koa = __webpack_require__(13);
const serve = __webpack_require__(14);
const session = __webpack_require__(15);
const body = __webpack_require__(7);
const app = new Koa();
const router = __webpack_require__(16);
const socket = __webpack_require__(25);
const http = __webpack_require__(27);
let server;
app.keys = ['some secret hurr'];
const CONFIG = {
	key: 'koa:sess',
	maxAge: 86400000,
	overwrite: true,
	httpOnly: true,
	signed: true,
	rolling: false
};
app.use(session(CONFIG, app));
app.use(body());
//app.use(router)
app.use((() => {
	var _ref = _asyncToGenerator(function* (ctx, next) {
		if (/^\/stUpload/.test(ctx.request.url)) {
			yield serve('./uploads/', '/stUpload')(ctx);
		} else {
			yield next();
		}
	});

	return function (_x, _x2) {
		return _ref.apply(this, arguments);
	};
})());
app.use(router.routes());
server = http.createServer(app.callback());
server.listen(process.env.port);
socket(server);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { uploadDir } = __webpack_require__(2);
const fs = __webpack_require__(3);
const makeDir = __webpack_require__(11);
fs.existsSync(uploadDir) || makeDir.sync(uploadDir);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("make-dir");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("koa-better-serve");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const koaRouter = __webpack_require__(17);
const { loadRouterMoudles } = __webpack_require__(0);
const router = koaRouter();
const authRouter = __webpack_require__(18);
const notFoundRouter = __webpack_require__(19);
const userRouter = __webpack_require__(20);
const eventRouter = __webpack_require__(21);
const uploadFile = __webpack_require__(22);
const createTokenRouter = __webpack_require__(23);
// login in api
loadRouterMoudles(router, [authRouter, userRouter, eventRouter, uploadFile, createTokenRouter, notFoundRouter]);
module.exports = router;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { sequelize, User } = __webpack_require__(4);
const { success, fail } = __webpack_require__(1);
const { checkArg } = __webpack_require__(0);
const md5 = __webpack_require__(8);
const userAuth = (() => {
	var _ref = _asyncToGenerator(function* (ctx, next) {
		// undefined null
		if (!ctx.session.user) {
			ctx.body = fail({ flag: 999 });
		} else {
			yield next();
		}
	});

	return function userAuth(_x, _x2) {
		return _ref.apply(this, arguments);
	};
})();
// 获取用户信息
const getLoginMsg = (name, password) => {
	return User.findOne({
		attributes: ['name', 'role', 'uuid', 'pic', 'nick_name'],
		where: {
			name: name,
			password: md5(password)
		}
	}).then(data => {
		return data;
	});
};
const changePwd = (name, oPwd, nPwd) => {
	return User.update({
		password: md5(nPwd)
	}, {
		where: {
			name,
			password: md5(oPwd)
		}
	}).then(data => {
		return data;
	});
};
const modifyUserMsg = (name, uObj) => {
	return User.update(uObj, {
		where: {
			name
		}
	}).then(data => {
		return data;
	});
};
const authRouter = router => {
	// router.use('/auth',userAuth)
	router.post('/auth/getUserMsg', userAuth, (() => {
		var _ref2 = _asyncToGenerator(function* (ctx) {
			const { user: { role, uuid, name, pic, nick_name } } = ctx.session;
			ctx.body = success({ role, uuid, name, pic, nick_name });
		});

		return function (_x3) {
			return _ref2.apply(this, arguments);
		};
	})());
	router.post('/auth/login', (() => {
		var _ref3 = _asyncToGenerator(function* (ctx) {
			const { name, password, code } = ctx.request.body;
			const { code: nCode } = ctx.session || {};
			if (checkArg([name, password, code])) {
				// code === nCode 验证码
				console.log(code, nCode);
				if (code !== nCode) {
					if (!nCode) {
						ctx.body = fail({ fail: 0, errMsg: '验证码过期,请重新刷新验证码' });
						return;
					}
					ctx.body = fail({ fail: 0, errMsg: '验证码错误,请重新刷新验证码' });
					ctx.session && (ctx.session.code = null);
					return;
				}
				try {
					const result = yield getLoginMsg(name, password);
					if (result === null) {
						ctx.body = fail({ flag: 0, errMsg: '用户名或密码错误' });
						// ctx.session.code = null
						return;
					} else {
						result.role && (ctx.session.user = { name, role: result.role, uuid: result.uuid, pic: result.pic, nick_name: result.nick_name });
					}
					ctx.session && (ctx.session.code = null);
					// 前端登陆鉴权
					ctx.cookies.set('auth_koa', md5(`${ctx.session.user.name}_koa_`), { maxAge: 86400000, signed: false, httpOnly: false });
					ctx.body = success(result);
				} catch (e) {
					// ctx.session && (ctx.session.code = null)
					ctx.body = fail({
						errMsg: e
					});
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x4) {
			return _ref3.apply(this, arguments);
		};
	})());
	router.post('/auth/changePwd', userAuth, (() => {
		var _ref4 = _asyncToGenerator(function* (ctx) {
			const { user: { name } } = ctx.session;
			const { oPwd, nPwd } = ctx.request.body;
			if (checkArg([oPwd, nPwd])) {
				const result = yield changePwd(name, oPwd, nPwd);
				ctx.session = null;
				ctx.cookies.set('auth_koa', null, { maxAge: 0, signed: false, httpOnly: false, expires: new Date() });
				ctx.body = success({ data: '修改成功, 请重新登陆' });
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x5) {
			return _ref4.apply(this, arguments);
		};
	})());
	router.post('/auth/modifyUserMsg', userAuth, (() => {
		var _ref5 = _asyncToGenerator(function* (ctx) {
			const { user: { name, role } } = ctx.session;
			const { nick_name, pic } = ctx.request.body;
			if (nick_name || pic) {
				let result;
				if (nick_name && pic) {
					result = yield modifyUserMsg(name, { nick_name, pic });
				} else if (nick_name) {
					result = yield modifyUserMsg(name, { nick_name });
				} else {
					result = yield modifyUserMsg(name, { pic });
				}
				ctx.body = success(result);
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x6) {
			return _ref5.apply(this, arguments);
		};
	})());
	router.post('/auth/quit', (() => {
		var _ref6 = _asyncToGenerator(function* (ctx) {
			ctx.session = null;
			ctx.cookies.set('auth_koa', null, { maxAge: 0, signed: false, httpOnly: false, expires: new Date() });
			ctx.body = success('已退出');
		});

		return function (_x7) {
			return _ref6.apply(this, arguments);
		};
	})());
};
module.exports = authRouter;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { fail } = __webpack_require__(1);
const notFoundRouter = router => {
	router.all('*', (() => {
		var _ref = _asyncToGenerator(function* (ctx) {
			ctx.body = fail({ flag: 404 });
		});

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	})());
};
module.exports = notFoundRouter;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Sequelize = __webpack_require__(5);
const { sequelize, User } = __webpack_require__(4);
const { Op } = Sequelize;
const { success, fail } = __webpack_require__(1);
const { checkArg, isNum } = __webpack_require__(0);
const md5 = __webpack_require__(8);
// 中间件 鉴权
const userAuth = role => {
	return (() => {
		var _ref = _asyncToGenerator(function* (ctx, next) {
			const { user } = ctx.session;
			if (user === null || user === undefined) {
				ctx.body = fail({ flag: 999, errMsg: '未登陆，请登陆' });
			} else {
				if (parseInt(user.role) <= role) {
					yield next();
				} else {
					ctx.body = fail({ flag: 0, errMsg: '权限不足' });
				}
			}
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})();
};
// 获取用户信息
const checkExist = name => {
	return User.findOne({
		where: {
			name
		}
	}).then(data => {
		if (data === null) {
			return data;
		}
		return Promise.reject({ flag: 909, errMsg: '该用户已存在' });
	});
};
// 获取下级用户
const getAllUser = (pageIndex, pageSize, role, name, sort = false) => {
	const where = {};
	if (sort && sort < role) {
		where['role'] = {
			[Op.gt]: role
		};
	} else if (!sort) {
		where['role'] = {
			[Op.gt]: role
		};
	} else {
		where['role'] = sort;
	}
	name && (where['name'] = {
		[Op.like]: [`%${name}%`]
	});
	return User.findAndCountAll({
		attributes: ['name', 'role', 'uuid', 'pic', 'nick_name'],
		where,
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	}).then(data => {
		return data;
	});
};
// 查找维修员工
const getWorkUser = () => {
	return User.findAndCountAll({
		attributes: ['name', 'role', 'uuid', 'pic', 'nick_name'],
		where: {
			role: 3
		},
		order: [['uuid', 'DESC']]
	}).then(data => {
		return data;
	});
};
// 查找管理员工
const getManagerUser = (pageIndex, pageSize) => {
	return User.findAndCountAll({
		attributes: ['name', 'role', 'uuid'],
		where: {
			role: 2
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	}).then(data => data);
};
const deleteUser = (name, role) => {
	return User.destroy({
		where: {
			name,
			role: {
				[Op.gt]: role
			}
		}
	}).then(data => {
		return data;
	});
};
const createUser = (name, password, role) => {
	// 强制 role > 2 create upsert
	parseInt(role) < 2 && (role = 2);
	return User.upsert({
		name,
		password: md5(password),
		role
	}).then(data => {
		return data;
	});
};
const editorUser = (name, password, role) => {
	return User.update({
		name,
		password: md5(password),
		role
	}, {
		where: {
			name
		}
	}).then(data => data);
};
const userRouter = router => {
	// 生成用户
	router.post('/user/create', userAuth(2), (() => {
		var _ref2 = _asyncToGenerator(function* (ctx) {
			const { name, password, role } = ctx.request.body;
			if (checkArg([name, password, role])) {
				try {
					const check = yield checkExist(name, password, role);
					const result = yield createUser(name, password, role);
					ctx.body = success(result);
				} catch (e) {
					if (e && e.flag === 909) {
						ctx.body = fail({
							errMsg: e.errMsg
						});
					} else {
						ctx.body = fail({ errMsg: e });
					}
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x3) {
			return _ref2.apply(this, arguments);
		};
	})());
	// 获取全部用户
	router.post('/user/getAllList', userAuth(2), (() => {
		var _ref3 = _asyncToGenerator(function* (ctx) {
			const { pageIndex, pageSize, sort, name } = ctx.request.body;
			const { user: { role } } = ctx.session;
			if (checkArg([pageIndex, pageSize]) && isNum(pageIndex) && isNum(pageIndex)) {
				try {
					const allUser = yield getAllUser(parseInt(pageIndex), parseInt(pageSize), role, name, sort);
					ctx.body = success(allUser);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x4) {
			return _ref3.apply(this, arguments);
		};
	})());
	// 获取维修员工
	router.post('/user/getWorkList', userAuth(2), (() => {
		var _ref4 = _asyncToGenerator(function* (ctx) {
			try {
				const result = yield getWorkUser();
				ctx.body = success(result);
			} catch (e) {
				ctx.body = fail({ errMsg: e });
			}
		});

		return function (_x5) {
			return _ref4.apply(this, arguments);
		};
	})());
	router.post('/user/editor', userAuth(2), (() => {
		var _ref5 = _asyncToGenerator(function* (ctx) {
			const { name, password, role } = ctx.request.body;
			const { role: mRole } = ctx.session.user || {};
			if (checkArg([name, password, role])) {
				if (mRole >= role) {
					ctx.body = fail({ errMsg: '权限不足' });
					return;
				}
				try {
					const result = yield editorUser(name, password, role);
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x6) {
			return _ref5.apply(this, arguments);
		};
	})());
	// 删除用户
	router.post('/user/delete', userAuth(1), (() => {
		var _ref6 = _asyncToGenerator(function* (ctx) {
			const { name } = ctx.request.body;
			const { role } = ctx.session.user;
			if (checkArg([name])) {
				try {
					const result = yield deleteUser(name, role);
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x7) {
			return _ref6.apply(this, arguments);
		};
	})());
};
module.exports = userRouter;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Sequelize = __webpack_require__(5);
const { Op } = Sequelize;
const { sequelize, Event, User, PeventResult, SeventResult } = __webpack_require__(4);
const { success, fail } = __webpack_require__(1);
const { checkArg, isNum, uniqKey } = __webpack_require__(0);
// 获取用户信息
// User.hasMany( Event, {
// 	foreignKey: 'postid',
// 	targetKey: 'uuid',
// 	as: 'post'
// })
// User.hasMany( Event, {
// 	foreignKey: 'solveid',
// 	targetKey: 'uuid',
// 	as: 'solve'
// })
// Event.belongsTo(User)
// 鉴权函数是否公用
const userAuth = role => {
	return (() => {
		var _ref = _asyncToGenerator(function* (ctx, next) {
			const { user } = ctx.session;
			if (user === null || user === undefined) {
				ctx.body = fail({ flag: 999, errMsg: '未登陆，请登陆' });
			} else {
				if (parseInt(user.role) <= role) {
					yield next();
				} else {
					ctx.body = fail({ flag: 0, errMsg: '权限不足' });
				}
			}
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})();
};
///
const createEvent = ({ title, solveid, content, uuid }) => {
	return Event.create({
		title, solveid, content, postid: uuid
	}).then(data => {
		return data;
	});
};
const deleteEvent = ({ uuid, postid, role }) => {
	const where = role === 1 ? { uuid } : { uuid, postid };
	return Event.destroy({
		where
	}).then(data => {
		return data;
	});
};
/*
 select user.name as pname, p.sname as sname, p.solveid as solveid,
 p.postid as postid from user join (select user.name as sname, event.solveid as solveid ,
 event.postid as postid from user right join event on user.uuid = event.solveid) as p on user.uuid = p.postid;
*/
// const getList = (postid) => {
//
// 	return User.findAll({
// 		order: [
// 			['name', 'ASC'],
// 			[{model: Event, as: 'post'}, 'create_time', 'DESC']
// 		],
// 		include: [
// 			{
// 				model: Event,
// 				as: 'post'
// 			}
// 		]
// 	})
// }
// 逻辑 --- 事件查找 （role 1 2 3） 人物信息 m s ; 对应 事件; 只能查看自己的对应的 （事件 role 1 除外）
// 操作 m s 对 event 事件操作 commit event 提出事件 处理事件 m 对事件有结束 权限 （1）
// 难点 怎么做到 1...2...3 好的联表查询 分页  count(*) ...
// 拆分 获取 事件 列表 获取用户信息 
// const getList = (postid) => {
// 	let str = 'select p.uuid as uuid, s.name as p_name, p.s_name as s_name, p.solve_id as solve_id,' +
// 		' p.post_id as post_id, p.s_status as s_status, p.p_status as p_status, p.create_time as create_time from user as s join ' +
// 		'(select s.name as s_name, e.uuid as uuid, e.create_time as create_time,  e.solveid as solve_id ,e.sstatus as s_status, e. pstatus as p_status, e.postid as post_id from user as s ' +
// 		'right join event as e on s.uuid = e.solveid) as p on s.uuid = p.post_id'
// 	postid && (str = `${str} where p.post_id  = ${postid}`)
// 	return sequelize.query( str,{type: sequelize.QueryTypes.SELECT})
// 		.then(data => {
// 			return data
// 		})
// }
const allEventList = ({ pageIndex, pageSize }) => {
	console.log(pageIndex, pageSize);
	return Event.findAndCountAll({
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	});
};
const mgEventList = ({ postid, pageIndex, pageSize }) => {
	return Event.findAndCountAll({
		where: {
			postid
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	});
};
const slEventList = ({ solveid, pageIndex, pageSize }) => {
	return Event.findAndCountAll({
		where: {
			solveid
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	});
};
// 查找信息
const getUserMsg = uuid => {
	return User.findOne({
		attributes: ['name', 'uuid', 'role', 'pic'],
		where: {
			uuid
		}
	}).then(data => data);
};
// 获取列表
const getUserListMsg = arg => {
	return User.findAll({
		attributes: ['name', 'role', 'uuid', 'pic'],
		where: {
			uuid: {
				[Op.in]: arg
			}
		}
	}).then(data => data);
};

// 查看事件是否存在
const getThisEvent = ({ uuid, postid, solveid }) => {
	const where = { uuid };
	if (postid) {
		Object.assign(where, { postid });
	} else {
		Object.assign(where, { solveid });
	}

	return Event.findOne({
		where
	}).then(data => data);
};
// 查看 该事件所有 对话
const getEventAllComment = event_id => {
	return sequelize.query('select * from (select * from p_event_result where event_id = :event_id union select * from s_event_result where event_id = :event_id) as al order by al.create_time asc;', { replacements: { event_id }, type: sequelize.QueryTypes.SELECT }).then(data => data);
};

const mgEventComment = ({ event_id, comment, user_id }) => {
	return PeventResult.upsert({
		event_id,
		comment,
		user_id
	}).then(data => data);
};

const slEventComment = ({ event_id, comment, user_id }) => {
	return SeventResult.upsert({
		event_id,
		comment,
		user_id
	}).then(data => data);
};
const mgEventHanleStatus = ({ uuid, postid, status }) => {
	return Event.update({
		pstatus: status
	}, {
		where: {
			uuid,
			postid
		}
	});
};
const slEventHanleStatus = ({ uuid, sloveid, status }) => {
	return Event.update({
		sstatus: status
	}, {
		where: {
			uuid,
			solveid
		}
	});
};
const eventRouter = router => {
	// router.use('/auth',userAuth)
	// 事件生成
	router.post('/event/create', userAuth(2), (() => {
		var _ref2 = _asyncToGenerator(function* (ctx) {
			const { title, solveid, content } = ctx.request.body;
			const { user: { uuid } } = ctx.session;
			if (checkArg([title, solveid, content])) {
				try {
					const result = yield createEvent({ title, solveid, content, uuid });
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x3) {
			return _ref2.apply(this, arguments);
		};
	})());
	// 事件删除
	router.post('/event/delete', userAuth(2), (() => {
		var _ref3 = _asyncToGenerator(function* (ctx) {
			const { uuid } = ctx.request.body;
			const { user: { uuid: postid, role } } = ctx.session;
			if (checkArg([uuid])) {
				try {
					// 逻辑判断放在哪里
					const result = yield deleteEvent({ uuid, postid, role });
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x4) {
			return _ref3.apply(this, arguments);
		};
	})());

	// 事件列表  状态 未派遣 进行中 已完成
	router.post('/event/getList', userAuth(3), (() => {
		var _ref4 = _asyncToGenerator(function* (ctx) {
			const { user: { uuid: ownid, role } } = ctx.session;
			let { pageIndex, pageSize, postid, solveid } = ctx.request.body;
			let result;
			if (checkArg([pageSize, pageIndex]) && isNum(pageIndex) && isNum(pageSize)) {
				pageSize = parseInt(pageSize);
				pageIndex = parseInt(pageIndex);
			} else {
				ctx.body = fail({ flag: 222 });
				return;
			}
			try {
				switch (role) {
					case 1:
						{
							let rows, sidList, pidList, sUser, pUser;
							result = yield allEventList({ pageIndex, pageSize });
							rows = result.rows;
							if (rows) {
								sidList = uniqKey({ target: rows, key: 'solveid' });
								pidList = uniqKey({ target: rows, key: 'postid' });
								if (sidList) {
									// 用户列表
									sUser = yield getUserListMsg(sidList.map(function (item) {
										return parseInt(item);
									}));
								}
								if (pidList) {
									pUser = yield getUserListMsg(pidList.map(function (item) {
										return parseInt(item);
									}));
								}
								ctx.body = success({
									sUser: sUser || [],
									pUser: pUser || [],
									eventList: result
								});
								return;
							}
							return;
						}
					case 2:
						{
							let rows, sidList, pidList, sUser, pUser;
							if (checkArg([postid])) {
								result = yield mgEventList({ postid, pageIndex, pageSize });
								rows = result.rows;
								if (rows) {
									sidList = uniqKey({ target: rows, key: 'solveid' });
									pidList = uniqKey({ target: rows, key: 'postid' });
								}
								if (sidList) {
									sUser = yield getUserListMsg(sidList);
								}
								if (pidList) {
									pUser = yield getUserListMsg(pidList.map(function (item) {
										return parseInt(item);
									}));
								}
								ctx.body = success({
									sUser: sUser || [],
									pUser,
									eventList: result
								});
								return;
							} else {
								ctx.body = fail({ flag: 222 });
								return;
							}
						}
					default:
						{
							let rows, pidList, pUser, sidList, sUser;
							if (checkArg([solveid])) {
								result = yield slEventList({ solveid, pageIndex, pageSize });
								rows = result.rows;
								if (rows) {
									sidList = uniqKey({ target: rows, key: 'solveid' });
									pidList = uniqKey({ target: rows, key: 'postid' });
								}
								if (sidList) {
									sUser = yield getUserListMsg(sidList);
								}
								if (pidList) {
									pUser = yield getUserListMsg(pidList.map(function (item) {
										return parseInt(item);
									}));
								}
								ctx.body = success({
									sUser: sUser || [],
									pUser: pUser || [],
									eventList: result
								});
								return;
							} else {
								ctx.body = fail({ flag: 222 });
								return;
							}
						}
				}
			} catch (e) {
				ctx.body = fail({ errMsg: e });
			}
		});

		return function (_x5) {
			return _ref4.apply(this, arguments);
		};
	})());
	// 事件详情
	router.post('/event/getEventComment', userAuth(3), (() => {
		var _ref5 = _asyncToGenerator(function* (ctx) {
			let { uuid } = ctx.request.body;
			const { user: { name, role, uuid: ownid } } = ctx.session;
			let comments, userIdList, userList;
			uuid = parseInt(uuid);
			if (checkArg([uuid]) && !isNaN(uuid)) {
				try {
					switch (role) {
						case 1:
							{
								comments = yield getEventAllComment(uuid);
								break;
							}
						case 2:
							{
								const isHas = yield getThisEvent({ uuid, postid: ownid });
								if (!isHas) {
									ctx.body = fail({ errMsg: '无查看权限' });
									return;
								}
								comments = yield getEventAllComment(uuid);
								break;
							}
						default:
							{
								const isHas = yield getThisEvent({ uuid, solveid: ownid });
								if (!isHas) {
									ctx.body = fail({ errMsg: '无查看权限' });
									return;
								}
								comments = yield getEventAllComment(uuid);
								break;
							}
					}
					if (comments && comments.length) {
						userIdList = uniqKey({ target: comments, key: 'user_id' });
						userList = yield getUserListMsg(userIdList);
					}
					ctx.body = success({ commentList: comments || [], userList: userList || [] });
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x6) {
			return _ref5.apply(this, arguments);
		};
	})());
	router.post('/event/post/comment', userAuth(3), (() => {
		var _ref6 = _asyncToGenerator(function* (ctx) {
			let { uuid, comment } = ctx.request.body;
			const { user: { role, uuid: ownid } } = ctx.session;
			let result;
			uuid = parseInt(uuid);
			if (checkArg([uuid, comment]) && !isNaN(uuid)) {
				try {
					switch (role) {
						case 1:
							{}
						case 2:
							{
								result = yield mgEventComment({ event_id: uuid, comment, user_id: ownid });
								break;
							}
						case 3:
							{
								result = yield slEventComment({ event_id: uuid, comment, user_id: ownid });
								break;
							}
					}
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x7) {
			return _ref6.apply(this, arguments);
		};
	})());
	router.post('/event/change/mg/status', userAuth(8), (() => {
		var _ref7 = _asyncToGenerator(function* (ctx) {
			const { uuid, status } = ctx.request.body;
			const { uuid: postid } = ctx.session.user;
			if (checkArg([uuid, status])) {
				try {
					const result = yield mgEventHanleStatus({ uuid, status, postid });
					ctx.body = success(result);
				} catch (e) {
					ctx.body = fail({ errMsg: e });
				}
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x8) {
			return _ref7.apply(this, arguments);
		};
	})());
};
module.exports = eventRouter;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { uploadDir, uploadDomain } = __webpack_require__(2);
const body = __webpack_require__(7);
const path = __webpack_require__(6);
const fs = __webpack_require__(3);
const dir = uploadDir;
const { success, fail } = __webpack_require__(1);
const { validateImg } = __webpack_require__(0);
const eFlag = 101;
const userAuth = role => {
	return (() => {
		var _ref = _asyncToGenerator(function* (ctx, next) {
			const { user } = ctx.session;
			if (user === null || user === undefined) {
				ctx.body = fail({ flag: 999, errMsg: '未登陆，请登陆' });
			} else {
				if (parseInt(user.role) <= role) {
					yield next();
				} else {
					ctx.body = fail({ flag: 0, errMsg: '权限不足' });
				}
			}
		});

		return function (_x, _x2) {
			return _ref.apply(this, arguments);
		};
	})();
};
const uploadFile = router => {
	router.post('/uploadFile/single', userAuth(3), body({
		multipart: true,
		formidable: {
			uploadDir: dir,
			hash: 'sha1'
		}
	}), (() => {
		var _ref2 = _asyncToGenerator(function* (ctx) {
			const files = ctx.request.body.files;
			const file = files['file'];
			if (file) {
				const { path: tmPath, name, hash, type } = file;
				if (validateImg(type)) {
					try {
						const extname = path.extname(name) || '.png';
						const eResult = `/uploads/${hash}${extname}`;
						const finalFile = path.resolve(__dirname, `..${eResult}`);
						const result = yield new Promise(function (r, j) {
							fs.rename(tmPath, finalFile, function (err) {
								if (err) {
									j({ err: 'file fail' });
									return;
								}
								r(eResult);
							});
						});
						ctx.body = success({ path: `${process.env.uploadDomain}stUpload${result.replace(/^\/uploads/, '')}` });
					} catch (e) {
						ctx.body = fail({ flag: 500 });
					}
				} else {
					ctx.body = fail({ flag: eFlag, errMsg: '文件类型错误' });
				}
				return;
			} else {
				ctx.body = fail({ flag: 222 });
			}
		});

		return function (_x3) {
			return _ref2.apply(this, arguments);
		};
	})());
};
module.exports = uploadFile;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { codeConfig } = __webpack_require__(2);
const svgCaptcha = __webpack_require__(24);
const createTokenRouter = route => {
	route.get('/createToken/randomCode', (() => {
		var _ref = _asyncToGenerator(function* (ctx) {
			const captcha = svgCaptcha.create(codeConfig);
			ctx.type = 'svg';
			ctx.response.status = 200;
			ctx.session.code = captcha.text;
			ctx.response.body = captcha.data;
		});

		return function (_x) {
			return _ref.apply(this, arguments);
		};
	})());
};
module.exports = createTokenRouter;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("svg-captcha");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const socket = __webpack_require__(26);
module.exports = server => {
	const io = socket(server, {
		cookie: true
	});
	io.on('connection', function (socket) {
		console.log(socket.handshake.headers);
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(socket.request.headers);
		});
	});
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ])));