'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Button = require('./button');

var BrustHeartButton = function (_React$Component) {
	_inherits(BrustHeartButton, _React$Component);

	function BrustHeartButton() {
		var _Object$getPrototypeO;

		_classCallCheck(this, BrustHeartButton);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(BrustHeartButton)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			disable: false,
			className: 'brust-heart-icon inactive'
		};

		['_onClick', '_onAnimationStart', '_onAnimationEnd', '_getClassName'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(BrustHeartButton, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props;
			var active = _props.active;
			var animation = _props.animation;


			this.setState({
				className: this._getClassName(active, animation)
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var active = nextProps.active;
			var animation = nextProps.animation;


			this.setState({
				className: this._getClassName(active, animation)
			});
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return !(nextProps.active === this.props.active && nextProps.className === this.state.className);
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			if (this.state.disable) {
				return;
			}

			this.props.onClick && this.props.onClick(e);
		}
	}, {
		key: '_onAnimationStart',
		value: function _onAnimationStart() {
			this.setState({
				disable: true
			});
		}
	}, {
		key: '_onAnimationEnd',
		value: function _onAnimationEnd() {
			var className = ['brust-heart-icon', 'active'].join(' ');

			this.setState({
				disable: false,
				className: className
			});
		}
	}, {
		key: '_getClassName',
		value: function _getClassName(active, animation) {
			var classNames = ['brust-heart-icon'];

			if (active) {
				if (animation) {
					classNames.push('brust-heart');
				} else {
					classNames.push('active');
				}
			} else {
				classNames.push('inactive');
			}

			return classNames.join(' ');
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				Button,
				{
					className: 'brust-heart-button' },
				React.createElement('div', {
					className: 'mask',
					onClick: this._onClick }),
				React.createElement('div', {
					className: this.state.className,
					onAnimationStart: this._onAnmationStart,
					onAnimationEnd: this._onAnimationEnd })
			);
		}
	}]);

	return BrustHeartButton;
}(React.Component);

BrustHeartButton.defaultProps = {
	active: false,
	animation: false
};

BrustHeartButton.propTypes = {
	active: React.PropTypes.bool,
	animation: React.PropTypes.bool
};

module.exports = BrustHeartButton;