'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CaptchaStore = require('../stores/captcha');

var Type = require('../constants/action-type');
var Dispatcher = require('../dispatchers/dispatcher');

var CaptchaAction = function () {
	function CaptchaAction() {
		_classCallCheck(this, CaptchaAction);
	}

	_createClass(CaptchaAction, null, [{
		key: 'refresh',
		value: function refresh() {
			Dispatcher.dispatch({
				type: Type.REFRESH_CAPTCHA
			});
		}
	}]);

	return CaptchaAction;
}();

module.exports = CaptchaAction;