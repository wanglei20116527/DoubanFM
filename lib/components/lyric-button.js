'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Button = require('./button');

var LyricButton = function (_React$Component) {
	_inherits(LyricButton, _React$Component);

	function LyricButton() {
		var _Object$getPrototypeO;

		_classCallCheck(this, LyricButton);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(LyricButton)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		['_onClick'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(LyricButton, [{
		key: '_onClick',
		value: function _onClick(e) {
			var onClick = this.props.onClick;


			onClick && onClick(e);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				Button,
				{
					className: 'lyric-button',
					onClick: this._onClick },
				React.createElement('span', { className: 'lyric-icon' })
			);
		}
	}]);

	return LyricButton;
}(React.Component);

LyricButton.propTypes = {
	onClick: React.PropTypes.func
};

module.exports = LyricButton;