'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Text = require('./text');
var Button = require('./button');
var Dialog = require('./dialog');
var LoginPane = require('./login-pane');

var LoginBlock = function (_React$Component) {
	_inherits(LoginBlock, _React$Component);

	function LoginBlock() {
		var _Object$getPrototypeO;

		_classCallCheck(this, LoginBlock);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LoginBlock)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			showDialog: false
		};

		['_switchDialog', '_displayDialog', '_hiddenDialog', '_getDialog'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(LoginBlock, [{
		key: '_switchDialog',
		value: function _switchDialog() {
			this.setState({
				showDialog: !this.state.showDialog
			});
		}
	}, {
		key: '_displayDialog',
		value: function _displayDialog() {
			this.setState({
				showDialog: true
			});
		}
	}, {
		key: '_hiddenDialog',
		value: function _hiddenDialog() {
			this.setState({
				showDialog: false
			});
		}
	}, {
		key: '_getDialog',
		value: function _getDialog() {
			if (!this.state.showDialog) {
				return null;
			}

			return React.createElement(
				Dialog,
				{
					className: 'login-dialog',
					onBlur: this._hiddenDialog },
				React.createElement(LoginPane, null)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{
					className: 'login-block' },
				React.createElement(
					Button,
					{
						onClick: this._switchDialog },
					React.createElement(Text, { text: '登陆' })
				),
				this._getDialog()
			);
		}
	}]);

	return LoginBlock;
}(React.Component);

module.exports = LoginBlock;