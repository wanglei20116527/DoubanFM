'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var React = require('react');
var ReactDOM = require('react-dom');

var autobind = require('core-decorators').autobind;

var Progress = (_class = function (_React$Component) {
	_inherits(Progress, _React$Component);

	function Progress() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Progress);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Progress)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			width: 0,
			total: 1,
			curt: 0,
			totalBytes: 1,
			curtBytes: 1
		};
		return _this;
	}

	_createClass(Progress, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this._mergePropsToState(nextProps);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mergePropsToState(this.props);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			var state = this.state;

			for (var key in state) {
				if (state[key] !== nextState[key]) {
					return true;
				}
			}

			return false;
			return true;
		}
	}, {
		key: '_mergePropsToState',
		value: function _mergePropsToState(props) {
			var width = props.width;
			var total = props.total;
			var curt = props.curt;
			var totalBytes = props.totalBytes;
			var curtBytes = props.curtBytes;


			this.setState({
				width: width,
				total: total,
				curt: curt,
				totalBytes: totalBytes,
				curtBytes: curtBytes
			});
		}
	}, {
		key: '_getProgressStyle',
		value: function _getProgressStyle() {
			var width = this.state.width;


			return {
				width: width + 'px'
			};
		}
	}, {
		key: '_getBarStyle',
		value: function _getBarStyle() {
			var _state = this.state;
			var total = _state.total;
			var curt = _state.curt;
			var width = _state.width;


			return {
				width: parseInt(curt / total * width) + 'px'
			};
		}
	}, {
		key: '_getDownloadBarStyle',
		value: function _getDownloadBarStyle() {
			var _state2 = this.state;
			var width = _state2.width;
			var totalBytes = _state2.totalBytes;
			var curtBytes = _state2.curtBytes;


			return {
				width: parseInt(curtBytes / totalBytes * width) + 'px'
			};
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			var _state3 = this.state;
			var width = _state3.width;
			var total = _state3.total;
			var onChange = this.props.onChange;


			var offsetX = e.nativeEvent.offsetX;
			var curt = parseInt(offsetX / width * total);

			this.setState({
				curt: curt
			});

			onChange && onChange(offsetX / width);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{
					className: 'progress',
					style: this._getProgressStyle(),
					onMouseMove: this._onMouseMove,
					onClick: this._onClick },
				React.createElement(
					'div',
					{
						className: 'inner-wrapper',
						style: this._getProgressStyle() },
					React.createElement('div', {
						className: 'download-bar',
						style: this._getDownloadBarStyle() }),
					React.createElement(
						'div',
						{
							className: 'bar',
							style: this._getBarStyle() },
						React.createElement('span', { className: 'indicator' })
					)
				)
			);
		}
	}]);

	return Progress;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_mergePropsToState', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_mergePropsToState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getProgressStyle', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getProgressStyle'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getBarStyle', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getBarStyle'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getDownloadBarStyle', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getDownloadBarStyle'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'render', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'render'), _class.prototype)), _class);


Progress.propTypes = {
	width: React.PropTypes.number.isRequired,
	total: React.PropTypes.number.isRequired,
	curt: React.PropTypes.number,
	totalBytes: React.PropTypes.number,
	curtBytes: React.PropTypes.number,
	onChange: React.PropTypes.func
};

Progress.defaultProps = {
	curt: 0,
	totalBytes: 1,
	curtBytes: 1
};

module.exports = Progress;