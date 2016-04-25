'use strict';

function isType(type) {
	return function (obj) {
		return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
}

module.exports = {
	isType: isType,
	isStr: isType('String'),
	isArray: Array.isArray || isType('Array')
};