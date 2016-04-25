'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Text = require('./text');
var Button = require('./button');

var LoginIntroPane = function (_React$Component) {
	_inherits(LoginIntroPane, _React$Component);

	function LoginIntroPane() {
		_classCallCheck(this, LoginIntroPane);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(LoginIntroPane).apply(this, arguments));
	}

	_createClass(LoginIntroPane, [{
		key: 'render',
		value: function render() {
			var className = ['login-intro-pane', this.props.className || ''].join(' ');

			return React.createElement(
				'div',
				_extends({}, this.props, {
					className: className }),
				React.createElement('div', { className: 'bg' }),
				React.createElement(
					'div',
					{
						className: 'content-area' },
					React.createElement(
						'h1',
						{ className: 'title' },
						'欢迎'
					),
					React.createElement(
						'h1',
						{ className: 'logo' },
						'Douban FM'
					),
					React.createElement(
						'p',
						{ className: 'intro' },
						'但是激发科技手段落后方式带来发挥了速度恢复计划的顺利繁华的身份行家里手电话费三大纪律风华绝代时间浪费很多时间恢复健康后打算离开合肥检定考试就浪费很多时间和法律界和电视剧风华绝代路上风景'
					),
					React.createElement(
						Button,
						{
							className: 'register-btn' },
						React.createElement(Text, { text: '注册' })
					)
				)
			);
		}
	}]);

	return LoginIntroPane;
}(React.Component);

module.exports = LoginIntroPane;