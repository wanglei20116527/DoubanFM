"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
	function Cache() {
		_classCallCheck(this, Cache);

		this._cache = {};
	}

	_createClass(Cache, [{
		key: "get",
		value: function get(key) {
			return this._cache[key] || null;
		}
	}, {
		key: "put",
		value: function put(key, value) {
			this._cache[key] = value;

			return this;
		}
	}, {
		key: "delete",
		value: function _delete(key) {
			delete this._cache[key];

			return this;
		}
	}]);

	return Cache;
}();

module.exports = new Cache();