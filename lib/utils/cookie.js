'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = require('path');

var Fs = require('./fs');
var Type = require('./type');
var Scheduler = require('./scheduler');

var COOKIE_FILE_PATH = Path.resolve(__dirname, '../../data/cookie.json');

var Cookie = function () {
	function Cookie() {
		_classCallCheck(this, Cookie);

		this._cookie = {};
	}

	_createClass(Cookie, [{
		key: 'init',
		value: function init() {
			var task = regeneratorRuntime.mark(function _callee() {
				var isExist, localCookie;
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return Fs.exists(COOKIE_FILE_PATH);

							case 2:
								isExist = _context.sent;

								if (isExist) {
									_context.next = 6;
									break;
								}

								_context.next = 6;
								return this._initCookieFile();

							case 6:
								_context.next = 8;
								return this._restoreFromFile(COOKIE_FILE_PATH);

							case 8:
								localCookie = _context.sent;


								this.merge(localCookie);

							case 10:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}).bind(this)();

			return new Promise(function (resolve, reject) {
				Scheduler(task).then(function () {
					resolve();
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: '_initCookieFile',
		value: function _initCookieFile() {
			var task = regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return Fs.mkFile(COOKIE_FILE_PATH);

							case 2:
								_context2.next = 4;
								return this._persistToFile({}, COOKIE_FILE_PATH);

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}).bind(this)();

			return new Promise(function (resolve, reject) {
				Scheduler(task).then(function () {
					resolve();
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: '_persistToFile',
		value: function _persistToFile(cookie, filePath) {
			return new Promise(function (resolve, reject) {
				try {
					Fs.writeFile(filePath, JSON.stringify(cookie), {
						encoding: 'utf8'
					}).then(function () {
						resolve();
					}).catch(function (e) {
						reject(e);
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: '_restoreFromFile',
		value: function _restoreFromFile(filePath) {
			return new Promise(function (resolve, reject) {
				Fs.readFile(filePath, {
					encoding: 'utf8'
				}).then(function (json) {
					try {
						resolve(JSON.parse(json));
					} catch (e) {
						reject(e);
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'merge',
		value: function merge(cookie) {
			this._cookie = Object.assign(this._cookie || {}, cookie || {});
		}
	}, {
		key: 'mergeWithIncomingMsg',
		value: function mergeWithIncomingMsg(incomingMsg) {
			var setCookies = incomingMsg.headers['set-cookie'];

			if (!Type.isStr(setCookies) && !Type.isArray(setCookies)) {
				console.warn('mergeWithIncomingMsg: ' + setCookies + ' type is not str and array');
				return;
			}

			console.log('set-cookie: ' + setCookies);

			this.merge(this.parse(setCookies));
		}
	}, {
		key: 'get',
		value: function get(name) {
			return this._cookie[name];
		}
	}, {
		key: 'set',
		value: function set(name, value) {
			this._cookie[name] = value;
		}
	}, {
		key: 'delete',
		value: function _delete(name) {
			delete this._cookie[name];
		}
	}, {
		key: 'getCookie',
		value: function getCookie() {
			return this._cookie;
		}
	}, {
		key: 'stringify',
		value: function stringify(cookie) {
			var str = '';

			Object.keys(cookie).forEach(function (key) {
				str += key + '=' + cookie[key] + ';';
			});

			console.log('cookie stringified is ' + str);

			return str;
		}
	}, {
		key: 'parse',
		value: function parse(cookieStrs) {
			if (!Type.isStr(cookieStrs) && !Type.isArray(cookieStrs)) {
				throw new Error('arguments type is invalid');
			}

			if (Type.isStr(cookieStrs)) {
				cookieStrs = [cookieStrs];
			}

			var tmpCookie = {};
			var reg = /;?\s*([^;=]+)=([^;=]*);?/g;

			cookieStrs.forEach(function (cookieStr) {
				var matched = void 0;

				while ((matched = reg.exec(cookieStr)) != null) {
					tmpCookie[matched[1]] = matched[2];
				}
			});

			return tmpCookie;
		}
	}, {
		key: 'persist',
		value: function persist() {
			return this._persistToFile(COOKIE_FILE_PATH);
		}
	}]);

	return Cookie;
}();

window.Cookie = module.exports = new Cookie();