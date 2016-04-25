'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var FS = function () {
	function FS() {
		_classCallCheck(this, FS);
	}

	_createClass(FS, null, [{
		key: 'exists',
		value: function exists(path) {
			return new Promise(function (resolve, reject) {
				try {
					fs.access(path, fs.F_OK, function (err) {
						resolve(!err);
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'mkFile',
		value: function mkFile(filename, options) {
			var _this = this;

			options = Object.assign({
				autoClose: true

			}, options || {});

			return new Promise(function (resolve, reject) {
				try {
					fs.open(path.resolve(__dirname, filename), 'w', function (err, fd) {
						if (err) {
							reject(err);
							return;
						}

						if (!options.autoClose) {
							resolve(fd);
							return;
						}

						_this.close(fd).then(resolve, reject);
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'mkdir',
		value: function mkdir(path, mode) {
			mode = mode || 511;

			return new Promise(function (resolve, reject) {
				try {
					fs.mkdir(path, mode, function (err) {
						if (err) {
							reject(err);
							return;
						}

						resolve();
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'close',
		value: function close(fd) {
			return new Promise(function (resolve, reject) {
				try {
					fs.close(fd, function (err) {
						if (err) {
							reject(err);
							return;
						}

						resolve();
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'open',
		value: function open(path, flags, mode) {
			mode = mode || 438;

			return new Promise(function (resolve, reject) {
				try {
					fs.open(path, flags, mode, function (err, fd) {
						if (err) {
							reject(err);
							return;
						}

						resolve(fd);
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'createWriteStream',
		value: function createWriteStream(path, options) {
			return new Promise(function (resolve, reject) {
				try {
					var ws = fs.createWriteStream(path, options);
					resolve(ws);
				} catch (err) {
					reject(err);
				}
			});
		}
	}, {
		key: 'createReadStream',
		value: function createReadStream(path, options) {
			return new Promise(function (resolve, reject) {
				try {
					var rs = fs.createReadStream(path, options);
					resolve(rs);
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'readFile',
		value: function readFile(file, options) {
			return new Promise(function (resolve, reject) {
				try {
					fs.readFile(file, options, function (e, data) {
						if (e) {
							reject(e);
							return;
						}

						resolve(data);
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'writeFile',
		value: function writeFile(file, data, options) {
			return new Promise(function (resolve, reject) {
				try {
					fs.writeFile(file, data, options, function (e) {
						if (e) {
							reject(e);
							return;
						}

						resolve();
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}]);

	return FS;
}();

window.FS = module.exports = FS;