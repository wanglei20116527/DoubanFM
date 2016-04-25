'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Text = require('./components/text');
var Button = require('./components/button');
var Appbar = require('./components/appbar');
var LoginPage = require('./components/login-page');
var LoginDialog = require('./components/login-dialog');
var MenuButton = require('./components/menu-button');
var AppbarGroup = require('./components/appbar-group');
var DrawerLayout = require('./components/drawer-layout');

var UserStore = require('./stores/user');

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

		_this.state = {
			showLeftNav: false,
			showLoginPage: false,
			title: 'DoubanFM',
			menu: [{
				text: 'wanglei',
				to: '/wanglei'
			}, {
				text: 'houna',
				to: '/houna'
			}]
		};

		['showLeftNav', 'showLoginPage', 'onLoginListener', 'onDrawerLayoutStateChanged'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(App, [{
		key: 'showLeftNav',
		value: function showLeftNav() {
			this.setState({
				showLeftNav: true
			});
		}
	}, {
		key: 'showLoginPage',
		value: function showLoginPage() {
			this.setState({
				showLoginPage: true
			});
		}
	}, {
		key: 'onDrawerLayoutStateChanged',
		value: function onDrawerLayoutStateChanged(isNavShow) {
			this.setState({
				showLeftNav: isNavShow
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			UserStore.addLoginListener(this.onLoginListener);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			UserStore.removeLoginListener(this.onLoginListener);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {

			return true;
		}
	}, {
		key: 'onLoginListener',
		value: function onLoginListener(err, data) {
			if (err) {
				console.error(err);
				return;
			}

			this.setState({
				showLoginPage: data.r != 0
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var style = {
				width: '250px'
			};

			return React.createElement(
				'div',
				{ className: 'app' },
				React.createElement(
					DrawerLayout,
					{
						showNav: this.state.showLeftNav,
						onRequestChange: this.onDrawerLayoutStateChanged },
					React.createElement('div', { style: style }),
					React.createElement(
						'div',
						null,
						React.createElement(
							Appbar,
							null,
							React.createElement(
								AppbarGroup,
								{ className: 'mr15' },
								React.createElement(MenuButton, {
									onClick: this.showLeftNav
								})
							),
							React.createElement(
								AppbarGroup,
								null,
								React.createElement(Text, { text: 'DoubanFM' })
							),
							React.createElement(
								AppbarGroup,
								{ float: AppbarGroup.RIGHT },
								React.createElement(
									Button,
									{
										onClick: this.showLoginPage },
									React.createElement(Text, { text: '登陆' })
								),
								React.createElement(LoginDialog, null)
							)
						),
						React.createElement(
							'div',
							null,
							this.props.children
						)
					)
				)
			);
		}
	}]);

	return App;
}(React.Component);

module.exports = App;