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

var PlayingSongList = (_class = function (_React$Component) {
	_inherits(PlayingSongList, _React$Component);

	function PlayingSongList() {
		_classCallCheck(this, PlayingSongList);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(PlayingSongList).apply(this, arguments));
	}

	_createClass(PlayingSongList, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			PS.initialize(ReactDOM.findDOMNode(this.refs.container));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			PS.destroy(ReactDOM.findDOMNode(this.refs.container));
		}
	}, {
		key: '_onClick',
		value: function _onClick(e) {
			if (!this.props.onChange) {
				return;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props = this.props;
			var title = _props.title;
			var songs = _props.songs;
			var playing = _props.playing;


			var songItems = songs.map(function (song, i) {
				var className = ['item'];
				playing === i && className.push('playing');

				className = className.join(' ');

				var title = song.title;
				var artist = song.artist;


				var content = i + '. ' + title + ' - ' + artist + 'fgdf gd fhk ghdfk hgkdf';

				return React.createElement(
					'li',
					{
						key: i,
						'data-index': i,
						className: className,
						onClick: _this2._onClick },
					React.createElement(
						'span',
						{
							className: 'content' },
						content
					)
				);
			});

			return React.createElement(
				'div',
				{
					className: 'playing-songlist' },
				React.createElement(
					'div',
					{
						ref: 'container',
						className: 'container' },
					React.createElement(
						'h1',
						{
							className: 'title' },
						title
					),
					React.createElement(
						'ol',
						null,
						songItems
					)
				)
			);
		}
	}]);

	return PlayingSongList;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_onClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onClick'), _class.prototype)), _class);


PlayingSongList.propTypes = {
	title: React.PropTypes.string,
	songs: React.PropTypes.array,
	playing: React.PropTypes.number,
	onChange: React.PropTypes.func
};

PlayingSongList.defaultProps = {
	title: '',
	songs: [],
	playing: 0
};

module.exports = PlayingSongList;