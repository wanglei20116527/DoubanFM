'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var Icon = require('./icon');
var Text = require('./text');
var Button = require('./button');

var UserAction = require('../actions/user');
var CaptchaAction = require('../actions/captcha');

var UserStore = require('../stores/user');
var CaptchaStore = require('../stores/captcha');

var LoginPane = function (_React$Component) {
	_inherits(LoginPane, _React$Component);

	function LoginPane(props) {
		_classCallCheck(this, LoginPane);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginPane).call(this, props));

		_this.state = {
			showErrorMsg: false,
			errMsg: null,
			captcha: null
		};

		_this.init();
		return _this;
	}

	_createClass(LoginPane, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			['initCaptcha', 'refreshCaptcha', 'getCaptchaUrl', 'getCaptchaImg', 'getErrorLabel', 'onLoginListener', 'onCaptchaChangedListener', 'onSubmit'].forEach(function (func) {
				_this2[func] = _this2[func].bind(_this2);
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.errMsg !== nextState.errMsg || this.state.captcha !== nextState.captcha || this.state.showErrorMsg !== nextState.showErrorMsg;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			UserStore.addLoginListener(this.onLoginListener);
			CaptchaStore.addCaptchaChangedListenter(this.onCaptchaChangedListener);

			this.initCaptcha();
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			UserStore.removeLoginListener(this.onLoginListener);
			CaptchaStore.removeCaptchaChangedListenter(this.onCaptchaChangedListener);
		}
	}, {
		key: 'initCaptcha',
		value: function initCaptcha() {
			this.refreshCaptcha();
		}
	}, {
		key: 'refreshCaptcha',
		value: function refreshCaptcha() {
			CaptchaAction.refresh();
		}
	}, {
		key: 'getCaptchaUrl',
		value: function getCaptchaUrl() {
			return CaptchaStore.getCaptchaUrl(this.state.captcha);
		}
	}, {
		key: 'onCaptchaChangedListener',
		value: function onCaptchaChangedListener(err, captcha) {
			if (err) {
				console.error(err);
				return;
			}

			this.setState({
				captcha: captcha
			});
		}
	}, {
		key: 'onLoginListener',
		value: function onLoginListener(err, success, data) {
			if (err || !success) {
				this.setState({
					showErrorMsg: true,
					errMsg: !!err ? err.message : data
				});
			}
		}
	}, {
		key: 'onSubmit',
		value: function onSubmit() {
			var username = ReactDOM.findDOMNode(this.refs.username).value.trim();
			var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
			var captcha = ReactDOM.findDOMNode(this.refs.captcha).value.trim();

			UserAction.login(username, password, captcha);

			this.refreshCaptcha();
		}
	}, {
		key: 'getErrorLabel',
		value: function getErrorLabel() {
			if (!this.state.showErrorMsg) {
				return null;
			}

			return React.createElement(
				'label',
				{
					className: 'error-info' },
				this.state.errMsg
			);
		}
	}, {
		key: 'getCaptchaImg',
		value: function getCaptchaImg(captcha) {
			if (!captcha) {
				return null;
			}

			return React.createElement('img', {
				onClick: this.refreshCaptcha,
				className: 'img',
				src: this.getCaptchaUrl() });
		}
	}, {
		key: 'render',
		value: function render() {
			var className = ['login-pane', this.props.className || ''].join(' ');

			return React.createElement(
				'div',
				_extends({}, this.props, {
					className: className }),
				React.createElement(
					'div',
					{ className: 'content-area' },
					React.createElement(
						'h1',
						{ className: 'title' },
						'登陆'
					),
					React.createElement(
						'div',
						{ className: 'user-avatar' },
						React.createElement('img', {
							className: 'img',
							src: './image/user_avatar_default.png'
						})
					),
					this.getErrorLabel(),
					React.createElement(
						'div',
						{
							className: 'form' },
						React.createElement(
							'div',
							{
								className: 'field username' },
							React.createElement(
								'label',
								{
									className: 'label' },
								'邮箱/用户名'
							),
							React.createElement('input', {
								ref: 'username',
								type: 'text',
								className: 'input'
							}),
							React.createElement(Icon, {
								icon: 'person',
								className: 'icon'
							})
						),
						React.createElement(
							'div',
							{
								className: 'field password' },
							React.createElement(
								'label',
								{
									className: 'label' },
								'密码'
							),
							React.createElement('input', {
								ref: 'password',
								type: 'password',
								className: 'input'
							}),
							React.createElement(Icon, {
								icon: 'lock outline',
								className: 'icon'
							})
						),
						React.createElement(
							'div',
							{
								className: 'field captcha' },
							React.createElement(
								'label',
								{
									className: 'label' },
								'验证码'
							),
							React.createElement('input', {
								ref: 'captcha',
								type: 'text',
								className: 'input'
							}),
							this.getCaptchaImg(this.state.captcha)
						),
						React.createElement(
							Button,
							{
								className: 'login-btn',
								onClick: this.onSubmit },
							React.createElement(Text, { text: '登陆' })
						)
					)
				)
			);
		}
	}]);

	return LoginPane;
}(React.Component);

module.exports = LoginPane;