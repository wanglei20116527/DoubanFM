'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Url = require('url');
var Http = require('http');
var QueryString = require('querystring');

var Cookie = require('./cookie');

var TIMEOUT = 5000;
var HOST = 'douban.fm';
var CONTENT_TYPE = 'application/x-www-form-urlencoded';
var USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36';

var RequestClient = function () {
	function RequestClient() {
		_classCallCheck(this, RequestClient);
	}

	_createClass(RequestClient, [{
		key: 'getJson',
		value: function getJson(url) {
			var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var _this = this;

			var method = arguments.length <= 2 || arguments[2] === undefined ? 'GET' : arguments[2];
			var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

			return new Promise(function (resolve, reject) {
				_this.request(url, data, method, options).then(function (res) {
					res.on('error', function (e) {
						reject(e);
					});

					var segs = [];

					res.on('data', function (buf) {
						segs.push(buf);
					});

					res.on('end', function () {
						try {
							var buffer = Buffer.concat(segs);
							var json = buffer.toString('utf8');
							var _data = JSON.parse(json);

							resolve(_data);
						} catch (e) {
							reject(e);
						}
					});
				}).catch(function (e) {
					reject(e);
				});
			});
		}
	}, {
		key: 'request',
		value: function request(url) {
			var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var method = arguments.length <= 2 || arguments[2] === undefined ? 'GET' : arguments[2];
			var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

			data = QueryString.stringify(data);

			if (method == "GET") {
				url = url + '?' + data;
			}

			return new Promise(function (resolve, reject) {
				var headers = {
					'Host': HOST,
					'User-Agent': USER_AGENT,
					'Cookie': Cookie.stringify(Cookie.getCookie())
				};

				if (method == 'POST') {
					headers['Content-Type'] = CONTENT_TYPE;
					headers['Content-Length'] = data.length;
				}

				var options = Object.assign({
					method: method,
					headers: headers

				}, Url.parse(url), options);

				var req = Http.request(options, function (res) {
					Cookie.mergeWithIncomingMsg(res);

					resolve(res);
				});

				req.on('error', reject);

				req.on('checkExpectation', reject);

				req.setTimeout(TIMEOUT, function () {
					reject(new Error('request json ' + url + ' timeout'));
				});

				method == "POST" ? req.end(data) : req.end();
			});
		}
	}]);

	return RequestClient;
}();

module.exports = new RequestClient();