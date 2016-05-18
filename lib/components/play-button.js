'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var Button = require('./button');

var PlayButton = function (_React$Component) {
	_inherits(PlayButton, _React$Component);

	function PlayButton() {
		var _Object$getPrototypeO;

		_classCallCheck(this, PlayButton);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PlayButton)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		['_playingIcon', '_pauseIcon', '_onClick'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(PlayButton, [{
		key: '_playingIcon',
		value: function _playingIcon() {
			return React.createElement(
				'svg',
				{
					size: '24',
					viewBox: '-4 -4 23 23',
					color: '#4a4a4a',
					style: { top: "-2px" },
					version: '1.1',
					height: '24',
					width: '24',
					'class': 'icon icon-play',
					'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1' },
				React.createElement(
					'g',
					{
						id: 'box',
						stroke: 'none',
						'stroke-width': '1',
						fill: 'none',
						'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0' },
					React.createElement(
						'g',
						{
							id: 'play',
							transform: 'translate(3.000000, 0.000000)',
							fill: '#4a4a4a',
							'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0.0' },
						React.createElement('path', {
							d: 'M1.73659474,0.223353924  L13.2836758,8.03253432  C14.2387747,8.56461413 14.2387747,9.43530281 13.2836758,9.96741739  L1.73659474,17.7766673  C0.781460601,18.3087471 0,17.8570252 0,16.7728022  L0,1.22721903  C0,0.142961262 0.781460601,-0.308760652 1.73659474,0.223353924  Z',
							id: '-',
							'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0.0.0' })
					)
				)
			);
		}
	}, {
		key: '_pauseIcon',
		value: function _pauseIcon() {
			return React.createElement(
				'svg',
				{
					color: '#4a4a4a',
					size: '24',
					version: '1.1',
					'class': 'icon icon-pause',
					viewBox: '0,0,18,18',
					height: '24', width: '24',
					style: { verticallign: "middle" },
					'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1' },
				React.createElement(
					'g',
					{
						id: 'Page-1',
						stroke: 'none',
						'stroke-width': '1',
						fill: 'none',
						'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0' },
					React.createElement(
						'g',
						{
							id: 'pause',
							transform: 'translate(4.000000, 3.000000)',
							fill: '#4a4a4a',
							'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0.0' },
						React.createElement('path', {
							d: 'M0,0 L3,0 L3,12 L0,12 L0,0 Z M7,0 L10,0 L10,12 L7,12 L7,0 Z',
							id: 'Rectangle-54',
							'data-reactid': '.0.0.0.1.1.1.1.1.1.1.1.0.0.0' })
					)
				)
			);
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			var onClick = this.props.onClick;


			onClick && onClick(e);
		}
	}, {
		key: 'render',
		value: function render() {
			var playing = this.props.playing;


			var icon = playing ? this._pauseIcon() : this._playingIcon();

			return React.createElement(
				Button,
				{
					className: 'play-button',
					onClick: this._onClick },
				icon
			);
		}
	}]);

	return PlayButton;
}(React.Component);

PlayButton.defaultProps = {
	playing: true
};

PlayButton.propTypes = {
	playing: React.PropTypes.bool,
	onClick: React.PropTypes.func
};

module.exports = PlayButton;