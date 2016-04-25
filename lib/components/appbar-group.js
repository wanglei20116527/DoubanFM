'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var AppbarGroup = function (_React$Component) {
	_inherits(AppbarGroup, _React$Component);

	function AppbarGroup(props) {
		_classCallCheck(this, AppbarGroup);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(AppbarGroup).call(this, props));
	}

	_createClass(AppbarGroup, [{
		key: 'render',
		value: function render() {
			var classes = ['appbar-group', this.props.className];

			switch (this.props.float) {
				case AppbarGroup.LEFT:
					classes.push('float-left');
					break;

				case AppbarGroup.RIGHT:
					classes.push('float-right');
					break;
			}

			var className = classes.join(' ');

			return React.createElement(
				'div',
				_extends({}, this.props, {
					className: className }),
				this.props.children
			);
		}
	}]);

	return AppbarGroup;
}(React.Component);

AppbarGroup.NONE = 0;
AppbarGroup.LEFT = 1;
AppbarGroup.RIGHT = 2;

AppbarGroup.defaultProps = {
	float: AppbarGroup.NONE
};

AppbarGroup.propTypes = {
	float: React.PropTypes.oneOf([AppbarGroup.NONE, AppbarGroup.LEFT, AppbarGroup.RIGHT])
};

module.exports = AppbarGroup;