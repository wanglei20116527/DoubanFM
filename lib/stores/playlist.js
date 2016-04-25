'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Url = require('url');
var Event = require('events');
var QueryString = require('querystring');

var RequestClient = require('../utils/RequestClient');

var BASE_URL = 'http://douban.fm/j/v2/playlist';

var MANIPULATE_TYPE = {
	NEW: 'n',
	PLAY: 'p',
	SKIP: 's',
	END: 'e',
	LIKE: 'r',
	UNLIKE: 'u'
};

var DEFAULT_PARAMETER = {
	channel: 0,
	kbps: 192,
	client: 's:mainsite|y:3.0',
	app_name: 'radio_website',
	version: 100,
	type: MANIPULATE_TYPE.NEW
};

var PB = 128;

var Playlist = function (_Event) {
	_inherits(Playlist, _Event);

	function Playlist() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Playlist);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Playlist)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this._song = null;
		return _this;
	}

	_createClass(Playlist, [{
		key: 'setSong',
		value: function setSong(song) {
			this._song = song;
		}
	}, {
		key: 'getSong',
		value: function getSong(song) {
			return this._song || null;
		}
	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						_this2.setSong(data.song[0]);
						resolve(data.song[0]);
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'like',
		value: function like(sid) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {
					type: MANIPULATE_TYPE.LIKE,
					pb: PB,
					sid: sid
				});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						_this3.setSong(data.song[0]);
						resolve(data.song[0]);
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'unlike',
		value: function unlike(sid) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {
					type: MANIPULATE_TYPE.UNLIKE,
					pb: PB,
					sid: sid
				});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						_this4.setSong(data.song[0]);
						resolve(data.song[0]);
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'play',
		value: function play(sid) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {
					type: MANIPULATE_TYPE.PLAY,
					pb: PB,
					sid: sid
				});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						_this5.setSong(data.song[0]);
						resolve(data.song[0]);
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'skip',
		value: function skip(sid) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {
					type: MANIPULATE_TYPE.SKIP,
					pb: PB,
					sid: sid
				});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						_this6.setSong(data.song[0]);
						resolve(data.song[0]);
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'end',
		value: function end(sid) {
			return new Promise(function (resolve, reject) {
				var data = Object.assign(DEFAULT_PARAMETER, {
					type: MANIPULATE_TYPE.END,
					pb: PB,
					sid: sid
				});

				RequestClient.getJson(BASE_URL, data).then(function (data) {
					if (data.r === 0) {
						resolve();
					} else {
						reject(new Error(JSON.stringify(data)));
					}
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}]);

	return Playlist;
}(Event);

window.Playlist = module.exports = new Playlist();