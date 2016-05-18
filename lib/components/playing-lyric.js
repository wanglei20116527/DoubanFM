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

var PS = require('perfect-scrollbar');

var Lyric = require('../utils/lyric');

var PROMPT = '歌词不支持滚动';

var gcs = window.getComputedStyle;

var setTimeoutId = void 0;

var PlayingLyric = (_class = function (_React$Component) {
	_inherits(PlayingLyric, _React$Component);

	function PlayingLyric() {
		var _Object$getPrototypeO;

		_classCallCheck(this, PlayingLyric);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(PlayingLyric)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			valid: true
		};
		return _this;
	}

	_createClass(PlayingLyric, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return this.state.valid !== nextState.valid || this.props.curtTime !== nextProps.curtTime || this.props.lyric !== nextProps.lyric;
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			this._updateState(nextProps);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._updateState(this.props);

			var $lc = ReactDOM.findDOMNode(this.refs.lc);
			PS.initialize($lc);

			setTimeout(function () {
				PS.update($lc);
			}, 0);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var $lc = ReactDOM.findDOMNode(this.refs.lc);

			if (!this.state.valid) {
				PS.update($lc);
				return;
			}

			var $al = ReactDOM.findDOMNode(this.refs.al);

			var scrollTop = 0;

			if ($al) {

				var lcHHeight = parseInt(gcs($lc, null).height) / 2;
				var lcScrollTop = $lc.scrollTop;

				var alHeight = parseInt(gcs($al, null).height);
				var alOffsetTop = $al.offsetTop;

				var $alp = $al.offsetParent;
				var alpHeight = parseInt(gcs($alp, null).height);

				if (alOffsetTop <= lcHHeight) {
					scrollTop = 0;
				} else if (alOffsetTop > lcHHeight && alpHeight - alOffsetTop > lcHHeight) {
					scrollTop = alOffsetTop - lcHHeight;
				} else {
					scrollTop = alpHeight - lcHHeight;
				}
			};

			var duration = 500;

			var astd = Math.abs($lc.scrollTop - scrollTop);

			if (astd > 800) {
				duration = 1000;
			} else if (astd < 200) {
				duration = 500;
			} else {
				duration = 300;
			}

			if (setTimeoutId) {
				clearTimeout(setTimeoutId);
				setTimeoutId = null;
			}

			if ($lc.scrollTop === scrollTop) {
				PS.update($lc);
			} else {

				setTimeoutId = setTimeout(function () {
					smoothScroll($lc, $lc.scrollTop, scrollTop, 10, new Date().getTime(), duration);
				}, 0);
			}

			function smoothScroll(el, startScrollTop, targetScrollTop, interval, startTime, duration) {
				var args = [].slice.call(arguments),
				    curtTime = new Date().getTime(),
				    passedTime = curtTime - startTime,
				    changedTotal = targetScrollTop - startScrollTop;

				if (passedTime > duration) {
					el.scrollTop = targetScrollTop;
					setTimeoutId = null;

					return;
				}

				var step = Math.ceil(easeInOutQuad(passedTime, startScrollTop, changedTotal, duration));

				el.scrollTop = step;

				PS.update(el);

				args.unshift(interval);
				args.unshift(smoothScroll);
				setTimeoutId = setTimeout.apply(null, args);
			}

			function easeInOutQuad(t, b, c, d) {
				if ((t /= d / 2) < 1) {
					return c / 2 * t * t + b;
				}

				return -c / 2 * (--t * (t - 2) - 1) + b;
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			PS.destroy(ReactDOM.findDOMNode(this.refs.lyric));
		}
	}, {
		key: '_updateState',
		value: function _updateState(props) {
			var lyric = props.lyric;


			this.setState({
				valid: Lyric.isValid(lyric)
			});
		}
	}, {
		key: '_getLyric',
		value: function _getLyric() {
			var valid = this.state.valid;
			var _props = this.props;
			var lyric = _props.lyric;
			var curtTime = _props.curtTime;


			var frags = Lyric.parse(lyric);

			frags = frags.map(function (frag, i) {
				var time = void 0,
				    content = void 0,
				    key = i + 1,
				    active = false,
				    nextFrag = frags[i + 1],
				    ret = void 0;

				if (valid) {
					time = frag[0];
					content = frag[1];
				} else {
					time = -1;
					content = frag;
				}

				if (valid) {
					active = curtTime >= time && (nextFrag && nextFrag[0] > curtTime || !nextFrag);
				}

				if (active) {
					ret = React.createElement(
						'p',
						{
							ref: 'al',
							key: key,
							className: 'active' },
						content
					);
				} else {
					ret = React.createElement(
						'p',
						{
							key: key },
						content
					);
				}

				return ret;
			});

			if (!valid) {
				frags.unshift(React.createElement(
					'p',
					{
						key: 0 },
					PROMPT
				));
			}

			return React.createElement(
				'div',
				{
					ref: 'lc',
					className: 'lyric' },
				React.createElement(
					'div',
					{
						className: 'wrapper' },
					frags
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var lyric = this._getLyric();

			return React.createElement(
				'div',
				{
					className: 'playing-lyric' },
				lyric
			);
		}
	}]);

	return PlayingLyric;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_updateState', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_updateState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getLyric', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getLyric'), _class.prototype)), _class);


PlayingLyric.propTypes = {
	lyric: React.PropTypes.string.isRequired,
	curtTime: React.PropTypes.number.isRequired
};

PlayingLyric.defaultProps = {
	lyric: '',
	curtTime: 0
};

module.exports = PlayingLyric;