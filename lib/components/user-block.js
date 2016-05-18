'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Text = require('./text');
var Button = require('./button');
var Dialog = require('./dialog');

var UserStore = require('../stores/user');

var DEFAULT_AVATAR = './image/user_avatar_default.png';

var UserBlock = function (_React$Component) {
	_inherits(UserBlock, _React$Component);

	function UserBlock() {
		var _Object$getPrototypeO;

		_classCallCheck(this, UserBlock);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(UserBlock)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			showUserDialog: false,
			user: {}
		};

		['_logout', '_switchUserDialog', '_getUserDialog', '_hideUserDialog'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(UserBlock, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var user = Object.assign({}, UserStore.getUserInfo() || {});

			this.setState({
				user: user
			});
		}
	}, {
		key: '_logout',
		value: function _logout() {}
	}, {
		key: '_switchUserDialog',
		value: function _switchUserDialog() {
			this.setState({
				showUserDialog: !this.state.showUserDialog
			});
		}
	}, {
		key: '_hideUserDialog',
		value: function _hideUserDialog() {
			this.setState({
				showUserDialog: false
			});
		}
	}, {
		key: '_getUserDialog',
		value: function _getUserDialog() {
			if (!this.state.showUserDialog) {
				return null;
			}

			var user = this.state.user || {};
			var playRecord = user.play_record || {};

			return React.createElement(
				Dialog,
				{
					className: 'user-dialog',
					onBlur: this._hideUserDialog },
				React.createElement(
					'div',
					{
						className: 'avatar-img' },
					React.createElement('img', {
						className: 'img',
						src: this.state.user.avatar || DEFAULT_AVATAR
					})
				),
				React.createElement(
					'div',
					{
						className: 'avatar-info' },
					React.createElement(
						'div',
						{
							className: 'username' },
						user.name || ''
					),
					React.createElement(
						'div',
						{
							className: 'play-record' },
						'累计共收听',
						playRecord.played || 0,
						'首 红心',
						playRecord.liked || 0,
						'首'
					),
					React.createElement(
						'div',
						{
							className: 'clearfix' },
						React.createElement(
							Button,
							{
								className: 'logout-btn' },
							React.createElement(Text, {
								className: 'text',
								text: '退出'
							})
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{
					className: 'user-block' },
				React.createElement(
					Button,
					{
						className: 'user-dialog-btn',
						onClick: this._logout },
					React.createElement('img', {
						className: 'img',
						onClick: this._switchUserDialog,
						src: this.state.user.avatar || DEFAULT_AVATAR
					})
				),
				this._getUserDialog()
			);
		}
	}]);

	return UserBlock;
}(React.Component);

module.exports = UserBlock;