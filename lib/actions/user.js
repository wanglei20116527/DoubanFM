'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserStore = require('../stores/user');

var Type = require('../constants/action-type');
var Dispatcher = require('../dispatchers/dispatcher');

var UserAction = function () {
	function UserAction() {
		_classCallCheck(this, UserAction);
	}

	_createClass(UserAction, null, [{
		key: 'login',
		value: function login(username, password, captcha) {
			Dispatcher.dispatch({
				type: Type.LOGIN,
				text: {
					username: username,
					password: password,
					captcha: captcha
				}
			});
		}
	}]);

	return UserAction;
}();

module.exports = UserAction;