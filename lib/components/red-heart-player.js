'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var PlayButton = require('./play-button');
var LyricButton = require('./lyric-button');
var DownloadButton = require('./download-button');
var PrevButton = require('./previous-button');
var NextButton = require('./next-button');
var PlayModeButton = require('./play-mode-button');
var Progress = require('./progress');
var VolumeSlider = require('./volume-slider');
var BrustHeartButton = require('./brust-heart-button');
var PlayingLyric = require('./playing-lyric');

var autobind = require('core-decorators').autobind;

var PLAY_STATE = {
	PLAYING: 0,
	PAUSE: 1
};

var DefaultProgress = {
	width: 440,
	total: 1,
	curt: 0,
	totalBytes: 1,
	curtBytes: 0
};

var RedHeartPlayer = (_class = function (_React$Component) {
	_inherits(RedHeartPlayer, _React$Component);

	function RedHeartPlayer() {
		var _Object$getPrototypeO;

		_classCallCheck(this, RedHeartPlayer);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(RedHeartPlayer)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this._updatePlayerCurtTime = false;

		_this.state = {
			volume: 1,
			curtTime: 0,
			totalBytes: 1,
			curtBytes: 0,
			playState: PLAY_STATE.PAUSE
		};
		return _this;
	}

	_createClass(RedHeartPlayer, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var song = nextProps.song;
			var playButton = nextProps.playButton;
			var playState = playButton.playState;


			var curtSong = this._getSong();

			if (curtSong.sid === song.sid) {
				return;
			}

			var totalBytes = song.length || 1;

			this.setState({
				playState: playState,
				totalBytes: totalBytes
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._updatePlayer();

			var _props = this.props;
			var song = _props.song;
			var playButton = _props.playButton;
			var playState = playButton.playState;


			var totalBytes = song.length || 1;

			this.setState({
				totalBytes: totalBytes,
				playState: playState
			});
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(prevProps, prevState) {
			this._updatePlayer();

			this._updatePlayerCurtTime = false;
		}
	}, {
		key: '_updatePlayer',
		value: function _updatePlayer() {
			var _state = this.state;
			var volume = _state.volume;
			var curtTime = _state.curtTime;


			var updatePlayerCurtTime = this._updatePlayerCurtTime;

			var isAudioFile = this._isAudioFile(),
			    isPlaying = this._isPlaying(),
			    $player = this._getCurtPlayer();

			isAudioFile ? this._resetVideoPlayer() : this._resetAudioPlayer();

			$player.volume = volume;

			isPlaying ? $player.play() : $player.pause();

			updatePlayerCurtTime && ($player.currentTime = curtTime);
		}
	}, {
		key: '_getCurtPlayer',
		value: function _getCurtPlayer() {
			return this._isAudioFile() ? this._getAudioPlayer() : this._getVideoPlayer();
		}
	}, {
		key: '_getAudioPlayer',
		value: function _getAudioPlayer() {
			return ReactDOM.findDOMNode(this.refs.audio);
		}
	}, {
		key: '_getVideoPlayer',
		value: function _getVideoPlayer() {
			return ReactDOM.findDOMNode(this.refs.video);
		}
	}, {
		key: '_resetAudioPlayer',
		value: function _resetAudioPlayer() {
			this._getAudioPlayer().removeAttribute('src');
		}
	}, {
		key: '_resetVideoPlayer',
		value: function _resetVideoPlayer() {
			this._getVideoPlayer().removeAttribute('src');
		}
	}, {
		key: '_isAudioFile',
		value: function _isAudioFile() {
			var _getSong2 = this._getSong();

			var file_ext = _getSong2.file_ext;


			return !! ~['mp3'].indexOf(file_ext);
		}
	}, {
		key: '_getTitle',
		value: function _getTitle() {
			var title = this.props.title || '';

			return React.createElement(
				'h1',
				{
					className: 'title' },
				title
			);
		}
	}, {
		key: '_onPictureMetaDataLoaded',
		value: function _onPictureMetaDataLoaded() {
			var $img = ReactDOM.findDOMNode(this.refs.picture);

			var width = $img.width;
			var height = $img.height;

			if (width > height) {
				$img.style.maxHeight = '100%';
			} else {
				$img.style.maxWidth = '100%';
			}
		}
	}, {
		key: '_getPicture',
		value: function _getPicture() {
			var _getSong3 = this._getSong();

			var picture = _getSong3.picture;
			var showLyric = this.props.showLyric;


			var className = ['img'];
			if (showLyric) {
				className.push('blur');
			}
			className = className.join(' ');

			return React.createElement(
				'div',
				{
					className: 'picture' },
				React.createElement('img', {
					ref: 'picture',
					className: className,
					src: picture,
					onLoad: this._onPictureMetaDataLoaded
				})
			);
		}
	}, {
		key: '_getSong',
		value: function _getSong() {
			return this.props.song || {};
		}
	}, {
		key: '_getSongTitle',
		value: function _getSongTitle() {
			var title = this._getSong()['title'] || '';

			return React.createElement(
				'h2',
				{
					className: 'song-title' },
				title
			);
		}
	}, {
		key: '_getArtist',
		value: function _getArtist() {
			var artist = this._getSong()['artist'] || '';

			return React.createElement(
				'span',
				{
					className: 'artist' },
				artist
			);
		}
	}, {
		key: '_getCurtTime',
		value: function _getCurtTime() {
			return this.state.curtTime || 0;
		}
	}, {
		key: '_getTotalTime',
		value: function _getTotalTime() {
			return this._getSong()['length'] || 1;
		}
	}, {
		key: '_getLeftTime',
		value: function _getLeftTime() {
			var song = this._getSong(),
			    totalTime = this._getTotalTime(),
			    curtTime = this._getCurtTime();

			var leftTime = totalTime - curtTime;

			return leftTime < 0 ? 0 : leftTime;
		}
	}, {
		key: '_formatTime',
		value: function _formatTime(time) {
			var date = new Date(time * 1000);

			var mins = date.getMinutes();
			var secs = date.getSeconds();

			var str = '-';
			str += mins >= 10 ? mins : '0' + mins;
			str += ":";
			str += secs >= 10 ? secs : '0' + secs;

			return str;
		}
	}, {
		key: '_getTime',
		value: function _getTime() {
			var leftTime = this._getLeftTime();
			var formatedTime = this._formatTime(leftTime);

			return React.createElement(
				'span',
				{
					className: 'time' },
				formatedTime
			);
		}
	}, {
		key: '_getPlayButtonParams',
		value: function _getPlayButtonParams() {
			var playButton = this.props.playButton;


			var playState = this._getPlayState();

			return Object.assign({}, playButton, {
				playState: playState
			});
		}
	}, {
		key: '_getPlayState',
		value: function _getPlayState() {
			return this.state.playState;
		}
	}, {
		key: '_isPlaying',
		value: function _isPlaying() {
			return this._getPlayState() === PLAY_STATE.PLAYING;
		}
	}, {
		key: '_onPlayStateChange',
		value: function _onPlayStateChange() {
			var _getPlayButtonParams2 = this._getPlayButtonParams();

			var onClick = _getPlayButtonParams2.onClick;
			var PAUSE = PLAY_STATE.PAUSE;
			var PLAYING = PLAY_STATE.PLAYING;


			var curtState = this._getPlayState();

			var nextState = curtState === PAUSE ? PLAYING : PAUSE;

			this.setState({
				playState: nextState
			});

			onClick && onClick(nextState);

			console.log('_onPlayStateChange');
		}
	}, {
		key: '_getPlayButton',
		value: function _getPlayButton() {
			var isPlaying = this._isPlaying();

			return React.createElement(PlayButton, {
				playing: isPlaying,
				onClick: this._onPlayStateChange });
		}
	}, {
		key: '_onProgressChange',
		value: function _onProgressChange(percent) {
			var totalTime = this._getTotalTime();
			var curtTime = totalTime * percent;

			this.setState({
				curtTime: curtTime
			});

			this._updatePlayerCurtTime = true;

			console.log('_onProgressChange');
		}
	}, {
		key: '_getProgress',
		value: function _getProgress() {
			var _state2 = this.state;
			var curtTime = _state2.curtTime;
			var totalBytes = _state2.totalBytes;
			var curtBytes = _state2.curtBytes;


			var totalTime = this._getTotalTime();
			var onChange = this._onProgressChange;

			var params = Object.assign({}, DefaultProgress, {
				total: totalTime,
				curt: curtTime,
				totalBytes: totalBytes,
				curtBytes: curtBytes,
				onChange: onChange
			});

			return React.createElement(Progress, params);
		}
	}, {
		key: '_getVolume',
		value: function _getVolume() {
			return this.state.volume;
		}
	}, {
		key: '_onVolumeChange',
		value: function _onVolumeChange(percent) {
			var volume = percent;

			this.setState({
				volume: volume
			});

			console.log('_onVolumeChange');
		}
	}, {
		key: '_getVolumeSlider',
		value: function _getVolumeSlider() {
			var volume = this.state.volume;


			var onChange = this._onVolumeChange;

			var params = {
				volume: volume,
				onChange: onChange
			};

			return React.createElement(VolumeSlider, params);
		}
	}, {
		key: '_onLyricButtonClick',
		value: function _onLyricButtonClick(e) {
			var _ref = this.props.lyricButton || {};

			var onClick = _ref.onClick;


			onClick && onClick(e);

			console.log('_onLyricButtonClick');
		}
	}, {
		key: '_getLyricButton',
		value: function _getLyricButton() {
			return React.createElement(LyricButton, {
				onClick: this._onLyricButtonClick });
		}
	}, {
		key: '_onDownloadButtonClick',
		value: function _onDownloadButtonClick(e) {
			var _ref2 = this.props.downloadButton || {};

			var onClick = _ref2.onClick;


			onClick && onClick(e);

			console.log('_onDownloadButtonClick');
		}
	}, {
		key: '_getDownloadButton',
		value: function _getDownloadButton() {
			return React.createElement(DownloadButton, {
				onClick: this._onDownloadButtonClick });
		}
	}, {
		key: '_getBrustHeartButtonParams',
		value: function _getBrustHeartButtonParams() {
			return this.props.brustHeartButton || {};
		}
	}, {
		key: '_onBrustHeartButtonClick',
		value: function _onBrustHeartButtonClick(e) {
			console.log(this);

			var _getBrustHeartButtonP = this._getBrustHeartButtonParams();

			var onClick = _getBrustHeartButtonP.onClick;


			onClick && onClick(e);

			console.log('_onBrustHeartButtonClick');
		}
	}, {
		key: '_getBrustHeartButton',
		value: function _getBrustHeartButton() {
			var params = this._getBrustHeartButtonParams();

			return React.createElement(BrustHeartButton, _extends({}, params, {
				onClick: this._onBrustHeartButtonClick }));
		}
	}, {
		key: '_onPrevButtonClick',
		value: function _onPrevButtonClick(e) {
			var _ref3 = this.props.prevButton || {};

			var onClick = _ref3.onClick;


			onClick && onClick(e);

			console.log('_onPrevButtonClick');
		}
	}, {
		key: '_getPrevButton',
		value: function _getPrevButton() {
			return React.createElement(PrevButton, {
				onClick: this._onPrevButtonClick });
		}
	}, {
		key: '_onNextButtonClick',
		value: function _onNextButtonClick(e) {
			var _ref4 = this.props.nextButton || {};

			var onClick = _ref4.onClick;


			onClick && onClick(e);

			console.log('_getNextButtonClick');
		}
	}, {
		key: '_getNextButton',
		value: function _getNextButton() {
			return React.createElement(NextButton, {
				onClick: this._onNextButtonClick });
		}
	}, {
		key: '_getPlayModeButtonParams',
		value: function _getPlayModeButtonParams() {
			return this.props.playModeButton || {};
		}
	}, {
		key: '_onPlayModeButtonClick',
		value: function _onPlayModeButtonClick(e) {
			var _getPlayModeButtonPar = this._getPlayModeButtonParams();

			var onClick = _getPlayModeButtonPar.onClick;


			onClick && onClick(e);

			console.log('_onPlayModeButtonClick');
		}
	}, {
		key: '_getPlayModeButton',
		value: function _getPlayModeButton() {
			var params = this._getPlayModeButtonParams();

			return React.createElement(PlayModeButton, _extends({}, params, {
				onClick: this._onPlayModeButtonClick }));
		}
	}, {
		key: '_getPlayingLyric',
		value: function _getPlayingLyric() {
			var showLyric = this.props.showLyric;


			if (!showLyric) {
				return null;
			}

			var _getSong4 = this._getSong();

			var lyric = _getSong4.lyric;


			var curtTime = this._getCurtTime();

			var params = {
				lyric: lyric,
				curtTime: curtTime
			};

			return React.createElement(PlayingLyric, params);
		}
	}, {
		key: '_onProgress',
		value: function _onProgress() {
			var $player = this._getCurtPlayer();

			var buffered = $player.buffered;
			var len = buffered.length;

			var curtBytes = buffered.end(len - 1);

			this.setState({
				curtBytes: curtBytes
			});
		}
	}, {
		key: '_onEnded',
		value: function _onEnded() {
			var onEnd = this.props.onEnd;


			var playState = PLAY_STATE.PAUSE;

			this.setState({
				playState: playState
			});

			onEnd && onEnd();

			console.log('_onEnded');
		}
	}, {
		key: '_onTimeUpdate',
		value: function _onTimeUpdate() {
			var $player = this._getCurtPlayer();

			var curtTime = $player.currentTime;

			this.setState({
				curtTime: curtTime
			});

			this._updatePlayerCurtTime = false;
		}
	}, {
		key: 'render',
		value: function render() {

			var title = this._getTitle();
			var songTitle = this._getSongTitle();
			var artist = this._getArtist();
			var time = this._getTime();
			var PlayButton = this._getPlayButton();
			var progress = this._getProgress();
			var volumeSlider = this._getVolumeSlider();
			var lyricBtn = this._getLyricButton();
			var downloadBtn = this._getDownloadButton();
			var brustHeartBtn = this._getBrustHeartButton();
			var prevBtn = this._getPrevButton();
			var nextBtn = this._getNextButton();
			var playModeBtn = this._getPlayModeButton();
			var picture = this._getPicture();
			var playingLyric = this._getPlayingLyric();

			return React.createElement(
				'div',
				{ className: 'red-heart-player clearfix' },
				React.createElement(
					'div',
					{ className: 'float-left playing-info' },
					title,
					songTitle,
					React.createElement(
						'div',
						{ className: 'song-subtitle clearfix' },
						artist,
						React.createElement(
							'div',
							{ className: 'float-right' },
							time,
							PlayButton
						)
					),
					React.createElement(
						'div',
						{ className: 'progress-wrapper' },
						progress
					),
					React.createElement(
						'div',
						{ className: 'below-progress' },
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							volumeSlider
						),
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							lyricBtn
						),
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							downloadBtn
						)
					),
					React.createElement(
						'div',
						{ className: 'playing-controls' },
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper brust-heart-btn-wrapper' },
							brustHeartBtn
						),
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							prevBtn
						),
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							nextBtn
						),
						React.createElement(
							'span',
							{ className: 'icon-btn-wrapper' },
							playModeBtn
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'float-left playing-other' },
					React.createElement(
						'div',
						{ className: 'inner-wrapper' },
						picture,
						React.createElement(
							'div',
							{ className: 'lyrics' },
							playingLyric
						)
					)
				),
				React.createElement('audio', {
					ref: 'audio',
					className: 'hide',
					loop: false,
					src: this._getSong()['url'],
					volume: this._getVolume(),
					onEnded: this._onEnded,
					onProgress: this._onProgress,
					onTimeUpdate: this._onTimeUpdate }),
				React.createElement('video', {
					ref: 'video',
					className: 'hide',
					loop: false,
					src: this._getSong()['url'],
					volume: this._getVolume(),
					onEnded: this._onEnded,
					onProgress: this._onProgress,
					onTimeUpdate: this._onTimeUpdate })
			);
		}
	}]);

	return RedHeartPlayer;
}(React.Component), (_applyDecoratedDescriptor(_class.prototype, '_updatePlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_updatePlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getCurtPlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getCurtPlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getAudioPlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getAudioPlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getVideoPlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getVideoPlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_resetAudioPlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_resetAudioPlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_resetVideoPlayer', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_resetVideoPlayer'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_isAudioFile', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_isAudioFile'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getTitle', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getTitle'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onPictureMetaDataLoaded', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onPictureMetaDataLoaded'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPicture', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPicture'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getSong', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getSong'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getSongTitle', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getSongTitle'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getArtist', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getArtist'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getCurtTime', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getCurtTime'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getTotalTime', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getTotalTime'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getLeftTime', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getLeftTime'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_formatTime', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_formatTime'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getTime', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getTime'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayButtonParams', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayButtonParams'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayState', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_isPlaying', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_isPlaying'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onPlayStateChange', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onPlayStateChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onProgressChange', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onProgressChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getProgress', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getProgress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getVolume', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getVolume'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onVolumeChange', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onVolumeChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getVolumeSlider', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getVolumeSlider'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onLyricButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onLyricButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getLyricButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getLyricButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDownloadButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onDownloadButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getDownloadButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getDownloadButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getBrustHeartButtonParams', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getBrustHeartButtonParams'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onBrustHeartButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onBrustHeartButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getBrustHeartButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getBrustHeartButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onPrevButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onPrevButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPrevButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPrevButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onNextButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onNextButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getNextButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getNextButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayModeButtonParams', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayModeButtonParams'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onPlayModeButtonClick', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onPlayModeButtonClick'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayModeButton', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayModeButton'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_getPlayingLyric', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_getPlayingLyric'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onProgress', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onProgress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onEnded', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onEnded'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onTimeUpdate', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_onTimeUpdate'), _class.prototype)), _class);


RedHeartPlayer.propTypes = {
	song: React.PropTypes.object,
	title: React.PropTypes.string,
	showLyric: React.PropTypes.bool,
	playButton: React.PropTypes.object,
	progress: React.PropTypes.object,
	volume: React.PropTypes.object
};

RedHeartPlayer.defaultProps = {
	title: '豆瓣音乐电台',

	showLyric: true,

	playButton: {
		playState: PLAY_STATE.PAUSE
	},

	lyricButton: {},

	progress: {
		width: 400,
		total: 200,
		curt: 100,
		totalBytes: 400,
		curtBytes: 300
	}
};

module.exports = RedHeartPlayer;