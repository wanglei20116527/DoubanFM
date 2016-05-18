'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = require('./cache');

var Lyric = function () {
	function Lyric() {
		_classCallCheck(this, Lyric);
	}

	_createClass(Lyric, [{
		key: 'isValid',
		value: function isValid(lyric) {
			return (/\[[\s\S]+\]/.test(lyric)
			);
		}
	}, {
		key: 'parse',
		value: function parse(lyric) {
			var cache = Cache.get(lyric);

			if (cache) {
				return cache;
			}

			var hashmap = [];

			var frags = lyric.split(/[\r\n]/).filter(function (frag) {
				return !!frag;
			});

			var isValid = this.isValid(lyric);

			if (!isValid) {
				hashmap = frags;
			} else {
				var regexp = /\[(\d+):(\d+)\.\d+\]([\s\S]+)/;

				for (var i = 0, len = frags.length; i < len; ++i) {
					var frag = frags[i];
					var ret = regexp.exec(frag);

					if (ret) {
						var mins = parseInt(ret[1]);
						var secs = parseInt(ret[2]);

						var time = mins * 60 + secs;
						var content = ret[3];

						hashmap.push([time, content]);
					}
				}
			}

			Cache.put(lyric, hashmap);

			return hashmap;
		}
	}]);

	return Lyric;
}();

module.exports = new Lyric();