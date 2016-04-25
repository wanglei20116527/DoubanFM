'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Http = require('http');
var Url = require('url');
var Event = require('events');
var QueryString = require('querystring');

var CaptchaStore = require('./captcha');

var ActionType = require('../constants/action-type');
var Dispatcher = require('../dispatchers/dispatcher');

var Cookie = require('../utils/cookie');
var RequestClient = require('../utils/request-client');

var TIMEOUT = 5000;
var LOGIN_URL = 'http://douban.fm/j/login';
var LOGOUT_BASE_URL = 'http://douban.fm/partner/logout?source=radio&ck=sTAN&no_login=y';

var SOURCE = 'radio';
var TASK = 'sync_channel_list';
var REMEMBER = 'on';

var EVENT = {
	LOGIN: 'login'
};

var User = function (_Event) {
	_inherits(User, _Event);

	function User() {
		var _Object$getPrototypeO;

		_classCallCheck(this, User);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(User)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		['handle', 'addLoginListener', 'removeLoginListener', 'login', 'logout', 'getUserInfo'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});

		_this.userInfo = null;

		_this.dispatchToken = Dispatcher.register(_this.handle);
		return _this;
	}

	_createClass(User, [{
		key: 'handle',
		value: function handle(payload) {
			var _this2 = this;

			switch (payload.type) {

				case ActionType.LOGIN:
					var captcha = payload.text.captcha;
					var username = payload.text.username;
					var password = payload.text.password;
					var captchaId = CaptchaStore.getCaptchaId();

					this.login(username, password, captcha, captchaId).then(function (data) {
						// login success
						if (data.r == 0) {
							_this2.userInfo = data.user_info;
							_this2.emit(EVENT.LOGIN, null, true, data.user_info);

							// login fail	
						} else {
								_this2.userInfo = null;
								_this2.emit(EVENT.LOGIN, null, false, data.err_msg);
							}
					}).catch(function (err) {
						_this2.userInfo = null;
						_this2.emit(EVENT.LOGIN, err);
					});
					break;

				case ActionType.LOGOUT:
					break;
			}
		}
	}, {
		key: 'getUserInfo',
		value: function getUserInfo() {
			return this.userInfo;
		}
	}, {
		key: 'get',
		value: function get(key) {
			return this.userInfo[key] || null;
		}
	}, {
		key: 'addLoginListener',
		value: function addLoginListener(fn) {
			this.addListener(EVENT.LOGIN, fn);
		}
	}, {
		key: 'removeLoginListener',
		value: function removeLoginListener(fn) {
			this.removeLoginListener(EVENT.LOGIN, fn);
		}
	}, {
		key: 'login',
		value: function login(username, password, captcha, captchaId) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var data = {
					task: TASK,
					source: SOURCE,
					remember: REMEMBER,
					alias: username,
					form_password: password,
					captcha_solution: captcha,
					captcha_id: captchaId

				};

				RequestClient.request(LOGIN_URL, data, "POST").then(function (res) {
					var segs = [];

					res.on('error', function (err) {
						reject(err);
					});

					res.on('data', function (data) {
						segs.push(data);
					});

					res.on('end', function () {
						try {
							var buffer = Buffer.concat(segs);
							var result = JSON.parse(buffer.toString('utf8'));

							// 登陆成功保存用户的信息
							if (result.r == 0) {
								_this3.userInfo = result['user_info'] || {};
							}

							resolve(result);
						} catch (e) {
							reject(e);
						}
					});
				}).catch(reject);
			});
		}
	}, {
		key: 'logout',
		value: function logout() {}
	}]);

	return User;
}(Event);

window.User = module.exports = new User();