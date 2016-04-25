"use strict";

function scheduler(task, success, fail) {
	var resultObj = task.next(task.value);

	if (resultObj.done) {
		success && success(resultObj.value);
		return;
	}

	if (!(resultObj.value instanceof Promise)) {
		throw new Error(resultObj.toString());
		return;
	}

	// resultObj.value is promise
	resultObj.value.then(function (value) {
		task.value = value;
		scheduler(task, success, fail);
	}).catch(function (e) {
		fail && fail(e);
	});
}

module.exports = function (task) {
	return new Promise(function (resolve, reject) {
		scheduler(task, function (value) {
			resolve(value);
		}, function (err) {
			reject(err);
		});
	});
};