'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Icon = require('./icon');
var Text = require('./text');
var Button = require('./button');
var LoginPane = require('./login-pane');
var LoginIntroPane = require('./login-intro-pane');

var LoginPage = function (_React$Component) {
	_inherits(LoginPage, _React$Component);

	function LoginPage(props) {
		_classCallCheck(this, LoginPage);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginPage).call(this, props));

		[].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(LoginPage, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'login-page clearfix' },
				React.createElement(
					'div',
					{ className: 'login-dialog' },
					React.createElement(
						'div',
						{
							className: 'intro-area float-left' },
						React.createElement(LoginIntroPane, null)
					),
					React.createElement(
						'div',
						{
							className: 'login-area float-left' },
						React.createElement(LoginPane, null)
					)
				)
			);
		}
	}]);

	return LoginPage;
}(React.Component);

module.exports = LoginPage;