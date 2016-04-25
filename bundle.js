'use strict';

require("babel-polyfill");

var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var HashHistory = ReactRouter.hashHistory;

var App = require('./lib/app');

var Cookie = require('./lib/utils/cookie');

Cookie.init().then(function () {

	ReactDOM.render(React.createElement(
		Router,
		{ history: HashHistory },
		React.createElement(Route, { path: '/', component: App })
	), document.getElementById('app'));
}).catch(function (e) {
	console.error(e);
});
