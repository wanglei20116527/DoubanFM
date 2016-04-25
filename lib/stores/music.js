'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Http = require('http');
var Url = require('url');
var Event = require('events');
var QueryString = require('querystring');

var Cookie = require('../utils/cookie');

var UserStore = require('./user');

var TIMEOUT = 5000;
var HOST = 'douban.fm';
var CONTENT_TYPE = 'application/x-www-form-urlencoded';

var RED_HEART_BASIC_INFO_URL = 'http://douban.fm/j/v2/redheart/basic';
var RED_HEART_DETAIL_INFO_URL = 'http://douban.fm/j/v2/redheart/songs';

var Music = function (_Event) {
	_inherits(Music, _Event);

	function Music() {
		var _Object$getPrototypeO;

		_classCallCheck(this, Music);

		for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
			props[_key] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Music)).call.apply(_Object$getPrototypeO, [this].concat(props)));

		_this._redHeartMusicBasicInfo = {};
		_this._redHeartMusicDetailInfo = {};
		return _this;
	}

	_createClass(Music, [{
		key: 'fetchRedHeartMusicBasicInfo',
		value: function fetchRedHeartMusicBasicInfo() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				var options = Object.assign({}, Url.parse(RED_HEART_BASIC_INFO_URL), {
					'method': 'GET',
					'headers': {
						'Host': HOST,
						'Cookie': Cookie.stringify(Cookie.getCookie())
					}
				});

				var req = Http.get(options, function (res) {
					Cookie.mergeWithIncomingMsg(res);

					var segs = [];

					res.on('data', function (data) {
						segs.push(data);
					});

					res.on('end', function () {
						try {
							var json = Buffer.concat(segs).toString('utf8');
							var info = JSON.parse(json);

							_this2._redHeartMusicBasicInfo = info;

							resolve(info);
						} catch (e) {
							reject(e);
						}
					});

					res.on('error', function (e) {
						reject(e);
					});
				});

				req.on('error', function (e) {
					reject(e);
				});

				req.on('checkExpectation', function (e) {
					reject(e);
				});

				req.setTimeout(TIMEOUT, function () {
					reject(new Error('fetch red heart music basic info from server timeout'));
				});

				req.end();
			});
		}
	}, {
		key: 'fetchRedHeartMusicDetailInfo',
		value: function fetchRedHeartMusicDetailInfo() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				var songs = _this3._redHeartMusicBasicInfo.songs || [];

				var sids = songs.map(function (song) {
					return song.sid;
				});

				var submitData = QueryString.stringify({
					'kbps': 192,
					'sids': sids.join('|'),
					'ck': UserStore.get('ck')
				});

				var options = Object.assign({
					'method': "POST",
					'headers': {
						'Host': HOST,
						'Content-Type': CONTENT_TYPE,
						'Content-Length': submitData.length,
						'Cookie': Cookie.stringify(Cookie.getCookie())
					}

				}, Url.parse(RED_HEART_DETAIL_INFO_URL));

				var req = Http.request(options, function (res) {
					Cookie.mergeWithIncomingMsg(res);

					var segs = [];

					res.on('data', function (data) {
						segs.push(data);
					});

					res.on('end', function () {
						try {
							var json = Buffer.concat(segs).toString('utf8');
							var info = JSON.parse(json);

							_this3._redHeartMusicDetailInfo = info;

							resolve(info);
						} catch (e) {
							reject(e);
						}
					});

					res.on('error', function (e) {
						reject(e);
					});
				});

				req.on('error', function (e) {
					reject(e);
				});

				req.on('checkExpectation', function (e) {
					reject(e);
				});

				req.setTimeout(TIMEOUT, function () {
					reject(new Error('fetch red heart music detail info from server timeout'));
				});

				req.end(submitData);
			});
		}
	}]);

	return Music;
}(Event);

window.Music = module.exports = new Music();