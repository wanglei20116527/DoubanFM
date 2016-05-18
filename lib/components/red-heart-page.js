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

var Player = require('./red-heart-player');
var LoadingPage = require('./loading-page');
var PlayingSongList = require('./playing-songlist');

var Playlist = require('../stores/playlist');

var RedHeartPage = (_class = function (_React$Component) {
	_inherits(RedHeartPage, _React$Component);

	function RedHeartPage() {
		var _Object$getPrototypeO;

		_classCallCheck(this, RedHeartPage);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RedHeartPage)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this.state = {
			title: '我的红心歌曲',
			loaded: true,
			song: {
				aid: "2997220",
				album: "/subject/2997220/",
				albumtitle: "Kameo: Elements of Power",
				alert_msg: "",
				artist: "Steve Burke",
				file_ext: "mp3",
				kbps: "128",
				length: 198,
				picture: "http://img3.doubanio.com/lpic/s9063317.jpg",
				public_time: "2005",
				sha256: "5c67e4da7b83438283cc6e2f21df6ebbfb4640e107163cd0eaa6e52e22bc1129",
				sid: "1808097",
				ssid: "bf26",
				status: 0,
				subtype: "U",
				title: "Hero's Theme",
				url: "http://mr7.doubanio.com/2b8891ff4f791bb28e1038778fecc24a/0/fm/song/p1808097_128k.mp3",
				lyric: ''
			},
			songs: [{
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}, {
				title: "Hero's Theme",
				artist: "Steve Burke"
			}]
		};
		return _this;
	}

	_createClass(RedHeartPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			// Playlist.fetchRedHeartPlaylist()

			// .then((songs)=>{
			// 	this.setState({
			// 		loaded: true,
			// 		songs: songs,
			// 	});
			// })

			// .catch(console.error);

			Playlist.loadLyric('1808097', 'bf26').then(function (data) {
				var lyric = data.lyric;

				var song = Object.assign({}, _this2.state.song, {
					lyric: lyric
				});

				_this2.setState({
					song: song
				});
			}).catch(console.error);
		}
	}, {
		key: '_getLoadingPage',
		value: function _getLoadingPage() {
			return React.createElement(LoadingPage, null);
		}
	}, {
		key: '_getContent',
		value: function _getContent() {
			var _state = this.state;
			var title = _state.title;
			var songs = _state.songs;
			var song = _state.song;


			return React.createElement(
				'div',
				{
					className: 'content-area' },
				React.createElement('div', { className: 'header' }),
				React.createElement(
					'div',
					{ className: 'body' },
					React.createElement('div', { className: 'playing-songlist-wrapper' }),
					React.createElement(
						'div',
						{
							className: 'player-wrapper' },
						React.createElement('div', {
							className: 'bg' }),
						React.createElement(
							'div',
							{
								className: 'player-inner-wrapper' },
							React.createElement(Player, {
								song: song
							})
						)
					)
				)
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var loaded = this.state.loaded;


			var content = loaded ? this._getContent() : this._getLoadingPage();

			return React.createElement(
				'div',
				{
					className: 'red-heart-page' },
				content
			);
		}
	}]);

	return RedHeartPage;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_getLoadingPage', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getLoadingPage'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getContent', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getContent'), _class.prototype)), _class);


module.exports = RedHeartPage;

// <PlayingSongList
// 		            title={title}
// 		            songs={songs}
// 		            playing={3}
// 		         />