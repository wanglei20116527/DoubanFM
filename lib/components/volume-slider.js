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

var Decorators = require('core-decorators');
var autobind = Decorators.autobind;

var VolumeSlider = (_class = function (_React$Component) {
	_inherits(VolumeSlider, _React$Component);

	function VolumeSlider() {
		var _Object$getPrototypeO;

		_classCallCheck(this, VolumeSlider);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		return _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VolumeSlider)).call.apply(_Object$getPrototypeO, [this].concat(props)));
	}

	_createClass(VolumeSlider, [{
		key: '_onClick',
		value: function _onClick(e) {
			var onChange = this.props.onChange;


			var $el = ReactDOM.findDOMNode(this.refs.progress);
			var style = window.getComputedStyle($el, null);
			var width = parseInt(style.width);
			var offsetX = e.nativeEvent.offsetX;

			onChange && onChange(offsetX / width);
		}
	}, {
		key: '_getBar',
		value: function _getBar() {
			var volume = this.props.volume;


			var style = {
				width: parseInt(volume * 100) + '%'
			};

			return React.createElement(
				'span',
				{
					className: 'bar' },
				React.createElement('span', {
					className: 'inner-bar',
					style: style })
			);
		}
	}, {
		key: '_getIcon',
		value: function _getIcon() {
			return React.createElement(
				'svg',
				{
					'class': 'volume-icon',
					height: '18px',
					width: '18px',
					viewBox: '0 0 18 18',
					version: '1.1',
					'data-reactid': '.0.0.0.1.1.1.1.3.0.0' },
				React.createElement(
					'g',
					{
						id: 'outbox',
						stroke: 'none',
						'stroke-width': '1',
						fill: 'none',
						'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0' },
					React.createElement(
						'g',
						{
							id: 'inbox',
							transform: 'translate(2.000000, 3.000000)',
							fill: '#8f8e94',
							'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0.0' },
						React.createElement('path', {
							d: 'M4.39035714,1.10464215  L1.5,4 L0.5,4  C0.302857143,4 0,4 0,4.5  L0,7.5  C0,8 0.302857143,8 0.5,8  L1.5,8  L4.39035714,10.8952903  C4.4925,10.9974324 4.64607143,11.0281465 4.77964286,10.9727897  C4.91321429,10.917433 5,10.7874338 5,10.642792  L5,1.35714044  C5,1.2128557 4.91285714,1.08249944 4.77964286,1.02714267  C4.73535714,1.00892851 4.68892857,1 4.64285714,1  C4.55,1 4.45857143,1.03642833 4.39035714,1.10464215  Z',
							id: 'Shape',
							transform: 'translate(2.500000, 6.000000) scale(1, -1) translate(-2.500000, -6.000000) ',
							'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0.0.$1' }),
						React.createElement('path', {
							d: 'M7.12915286,8.59484045  C7.22027735,8.70345348 7.35098117,8.7596009 7.48306566,8.7596009  C7.58707645,8.7596009 7.69154746,8.72462382 7.77806971,8.65282876  C8.50154297,8.04809348 9,6.99999993 9,5.99733213  C9,4.99466434 8.49141802,3.9226391 7.75091645,3.31882427  C7.55394027,3.15774562 7.2639987,3.1890409 7.10338027,3.38509663  C6.94276184,3.58207281 6.97267645,3.87201438 7.16965263,4.03263281  C7.69799061,4.46340315 7.98629522,4.99558479 8,5.99779236  C8.01370478,6.99999993 7.70397353,7.51469303 7.18714117,7.94638382  C6.99200589,8.10930337 6.96669353,8.39970517 7.12915286,8.59484045  Z',
							'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0.0.$2' }),
						React.createElement('path', {
							d: 'M10.2816139,10.0758436  C11.3056139,9.07623551 12,8.00000011 12,5.99779236  C12,3.99558461 11.3056139,2.91888899 10.2816139,1.9192809  C10.0998252,1.74209438 9.80896314,1.74531596 9.63085617,1.92756494  C9.45320943,2.10981393 9.45689123,2.40067596 9.63914022,2.5783227  C10.4864139,3.40534652 10.9724113,4.49650506 11,5.99825258  C11.0275887,7.50000011 10.4859537,8.59069843 9.63914022,9.41772225  C9.45689123,9.59536899 9.45366966,9.88669124 9.63085617,10.06848  C9.72106022,10.1605249 9.84071864,10.2065474 9.96037707,10.2065474  C10.0763537,10.2065474 10.1923303,10.1628261 10.2816139,10.0758436  Z',
							'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0.0.$3' }),
						React.createElement('path', {
							d: 'M12.7930946,11.483671  C14.1056555,10.1089798 14.999885,8.7399225 15,5.99687191  C15.000115,3.25382132 14.1051953,1.88522427 12.7935548,0.510533034  C12.6182092,0.326903371 12.3259665,0.32 12.1427971,0.495345618  C11.9591674,0.671151461 11.9522641,0.962473708 12.1276097,1.14610337  C13.2781715,2.35143191 14.0001151,3.57113359 14,5.99687191  C13.9998849,8.42261023 13.2781715,9.64277213 12.1271494,10.8481007  C11.9518038,11.0317303 11.9587072,11.3230526 12.1423369,11.4988584  C12.2311602,11.5844602 12.3457562,11.6263407 12.4598919,11.6263407  C12.5813912,11.6263407 12.7019701,11.5784773 12.7930946,11.483671  Z',
							'data-reactid': '.0.0.0.1.1.1.1.3.0.0.0.0.$4' })
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var bar = this._getBar(),
			    icon = this._getIcon();

			return React.createElement(
				'div',
				{
					className: 'volume-slider' },
				React.createElement(
					'span',
					{
						ref: 'progress',
						className: 'volume-progress',
						onClick: this._onClick },
					bar
				),
				React.createElement(
					'span',
					{
						className: 'volume-icon' },
					icon
				)
			);
		}
	}]);

	return VolumeSlider;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_onClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getBar', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getBar'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getIcon', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getIcon'), _class.prototype)), _class);


VolumeSlider.propTypes = {
	volume: React.PropTypes.number,
	onChange: React.PropTypes.func
};

VolumeSlider.defaultProps = {
	volume: 0
};

module.exports = VolumeSlider;