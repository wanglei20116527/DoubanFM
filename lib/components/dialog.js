'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var Electron = require('electron');

var Dialog = function (_React$Component) {
	_inherits(Dialog, _React$Component);

	function Dialog() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Dialog);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Dialog)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		['_onBlurHandler', '_onClickHandler'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(Dialog, [{
		key: '_onBlurHandler',
		value: function _onBlurHandler(e) {
			console.log('_onBlurHandler');
			this.props.onBlur && this.props.onBlur(e);
		}
	}, {
		key: '_onClickHandler',
		value: function _onClickHandler(e) {
			e.nativeEvent.stopImmediatePropagation();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			document.addEventListener('click', this._onBlurHandler, false);

			Electron.ipcRenderer.on('browser-window-blur', this._onBlurHandler);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('click', this._onBlurHandler, false);

			Electron.ipcRenderer.removeListener('browser-window-blur', this._onBlurHandler);
		}
	}, {
		key: 'render',
		value: function render() {
			var className = ['dialog', this.props.className].join(' ');

			return React.createElement(
				'div',
				{
					className: className,
					onClick: this._onClickHandler },
				this.props.children
			);
		}
	}]);

	return Dialog;
}(React.Component);

Dialog.propTypes = {
	onBlur: React.PropTypes.func
};

module.exports = Dialog;