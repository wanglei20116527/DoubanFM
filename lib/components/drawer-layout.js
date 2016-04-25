'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');

var Immutable = require('immutable');

var DrawerLayout = function (_React$Component) {
	_inherits(DrawerLayout, _React$Component);

	function DrawerLayout(props) {
		_classCallCheck(this, DrawerLayout);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DrawerLayout).call(this, props));

		_this.state = {
			showNav: false,

			navClassNames: Immutable.List(['nav', 'hide']),
			maskClassNames: Immutable.List(['mask', 'hide'])
		};
		return _this;
	}

	_createClass(DrawerLayout, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (this.state.showNav === nextProps.showNav) {
				return;
			}

			if (nextProps.showNav) {
				this._openNav();
			} else {
				this._closeNav();
			}
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			var thisState = this.state || {};

			if (thisState.showNav !== nextState.showNav) {
				return true;
			}

			if (!nextState.navClassNames.equals(thisState.navClassNames)) {
				return true;
			}

			if (!nextState.maskClassNames.equals(thisState.maskClassNames)) {
				return true;
			}

			return false;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.showNav && this._openNav();
		}
	}, {
		key: '_transitionEnd',
		value: function _transitionEnd() {
			if (!this.state.showNav) {
				this.setState({
					navClassNames: Immutable.List(['nav', 'hide']),
					maskClassNames: Immutable.List(['mask', 'hide'])
				});
			}

			this.props.onRequestChange && this.props.onRequestChange(this.state.showNav);
		}
	}, {
		key: '_openNav',
		value: function _openNav() {
			var _this2 = this;

			this.setState({
				showNav: true,
				navClassNames: Immutable.List(['nav', 'enter']),
				maskClassNames: Immutable.List(['mask', 'enter'])
			});

			setTimeout(function () {
				_this2.setState({
					navClassNames: Immutable.List(['nav', 'enter', 'enter-active']),
					maskClassNames: Immutable.List(['mask', 'enter', 'enter-active'])
				});
			}, 10);
		}
	}, {
		key: '_closeNav',
		value: function _closeNav() {
			var _this3 = this;

			this.setState({
				showNav: false,
				navClassNames: Immutable.List(['nav', 'leave']),
				maskClassNames: Immutable.List(['mask', 'leave'])
			});

			setTimeout(function () {
				_this3.setState({
					navClassNames: Immutable.List(['nav', 'leave', 'leave-active']),
					maskClassNames: Immutable.List(['mask', 'leave', 'leave-active'])
				});
			}, 10);
		}
	}, {
		key: '_getMaskClassName',
		value: function _getMaskClassName() {
			return this.state.maskClassNames.join(' ');
		}
	}, {
		key: '_getNavClassName',
		value: function _getNavClassName() {
			return this.state.navClassNames.join(' ');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var children = React.Children.toArray(this.props.children);
			return React.createElement(
				'div',
				{ className: 'drawer-layout' },
				React.createElement(
					'div',
					{
						className: 'content-area' },
					children[1]
				),
				React.createElement('div', {
					className: this._getMaskClassName(),
					onClick: function onClick() {
						_this4._closeNav();
					} }),
				React.createElement(
					'div',
					{
						onTransitionEnd: function onTransitionEnd() {
							_this4._transitionEnd();
						},
						className: this._getNavClassName() },
					children[0]
				)
			);
		}
	}]);

	return DrawerLayout;
}(React.Component);

DrawerLayout.propsType = {
	showNav: React.PropTypes.bool,
	onRequestChange: React.PropTypes.func
};

DrawerLayout.defaultProps = {
	showNav: false
};

module.exports = DrawerLayout;