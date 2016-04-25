'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = require('url');
var Http = require('http');
var Event = require('events');

var Cookie = require('../utils/cookie');

var ActionType = require('../constants/action-type');
var Dispatcher = require('../dispatchers/dispatcher');

var TIMEOUT = 5000;
var CAPTCHA_BASE_URL = 'http://douban.fm/misc/captcha?size=m&id=';
var CAPTCHA_ID_URL = 'http://douban.fm/j/new_captcha';

var Events = {
	CAPTCHA_CHANGE: 'newCaptcha'
};

var Captcha = function (_Event) {
	_inherits(Captcha, _Event);

	function Captcha() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Captcha);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Captcha)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.captcha = null;

		_this.init();

		_this.dispatchToken = Dispatcher.register(_this.handle);
		return _this;
	}

	_createClass(Captcha, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			['handle', 'getCaptchaId', 'getCaptchaUrl', 'refreshCaptcha', 'getCaptchaFromServer', 'addCaptchaChangedListenter', 'removeCaptchaChangedListenter'].forEach(function (func) {
				_this2[func] = _this2[func].bind(_this2);
			});
		}
	}, {
		key: 'handle',
		value: function handle(payload) {
			switch (payload.type) {

				case ActionType.REFRESH_CAPTCHA:
					this.refreshCaptcha();
					break;
			}
		}
	}, {
		key: 'addCaptchaChangedListenter',
		value: function addCaptchaChangedListenter(fn) {
			this.addListener(Events.CAPTCHA_CHANGE, fn);
		}
	}, {
		key: 'removeCaptchaChangedListenter',
		value: function removeCaptchaChangedListenter(fn) {
			this.removeListener(Events.CAPTCHA_CHANGE, fn);
		}
	}, {
		key: 'getCaptchaId',
		value: function getCaptchaId() {
			return this.captcha;
		}
	}, {
		key: 'getCaptchaUrl',
		value: function getCaptchaUrl(captchaId) {
			return !!captchaId ? '' + CAPTCHA_BASE_URL + captchaId : null;
		}
	}, {
		key: 'refreshCaptcha',
		value: function refreshCaptcha() {
			var _this3 = this;

			this.getCaptchaFromServer().then(function (captcha) {
				_this3.captcha = captcha;
				_this3.emit(Events.CAPTCHA_CHANGE, void 0, captcha);
			}).catch(function (err) {
				_this3.captcha = null;
				_this3.emit(Events.CAPTCHA_CHANGE, err);
			});
		}
	}, {
		key: 'getCaptchaFromServer',
		value: function getCaptchaFromServer() {
			return new Promise(function (resolve, reject) {
				var options = Object.assign({}, Url.parse(CAPTCHA_ID_URL), {
					'Cookie': Cookie.stringify(Cookie.getCookie())
				});

				var req = Http.get(options);

				req.on('response', function (res) {
					Cookie.mergeWithIncomingMsg(res);

					var segments = [];

					res.on('error', function (err) {
						reject(err);
					});

					res.on('data', function (data) {
						segments.push(data);
					});

					res.on('end', function () {
						resolve(JSON.parse(Buffer.concat(segments).toString('utf8')));
					});
				});

				req.on('error', function (err) {
					reject(err);
				});

				req.setTimeout(TIMEOUT, function () {
					reject(new Error('request captcha code timeout'));
				});
			});
		}
	}]);

	return Captcha;
}(Event);

window.Captcha = module.exports = new Captcha();