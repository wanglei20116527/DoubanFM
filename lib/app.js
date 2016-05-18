'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var LeftNav = require('material-ui/lib/left-nav');
var Button = require('./components/button');
var Text = require('./components/text');
var Appbar = require('./components/appbar');
var UserBlock = require('./components/user-block');
var LoginBlock = require('./components/login-block');
var MenuButton = require('./components/menu-button');
var AppbarGroup = require('./components/appbar-group');
var Player = require('./components/red-heart-player');
var RedHeartPage = require('./components/red-heart-page');

var UserStore = require('./stores/user');
var MusicStore = require('./stores/music');
var PlayList = require('./stores/playlist');

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

		_this.state = {
			showLeftNav: false,
			isUserLogin: false,

			title: 'DoubanFM'
		};

		['_showLeftNav', '_showLoginPage', '_onLoginListener', '_onDrawerLayoutStateChanged', '_getUserBlock', '_switchLeftNav'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(App, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			UserStore.addLoginListener(this._onLoginListener);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			UserStore.removeLoginListener(this._onLoginListener);
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			return nextProps.showLeftNav !== nextState.showLeftNav || nextState.isUserLogin !== nextState.isUserLogin || nextState.title !== nextState.title;
		}
	}, {
		key: '_showLeftNav',
		value: function _showLeftNav() {
			this._switchLeftNav(true);
		}
	}, {
		key: '_switchLeftNav',
		value: function _switchLeftNav(show) {
			this.setState({
				showLeftNav: show
			});
		}
	}, {
		key: '_showLoginPage',
		value: function _showLoginPage() {
			this.setState({
				showLoginPage: true
			});
		}
	}, {
		key: '_onDrawerLayoutStateChanged',
		value: function _onDrawerLayoutStateChanged(isNavShow) {
			this.setState({
				showLeftNav: isNavShow
			});
		}
	}, {
		key: '_onLoginListener',
		value: function _onLoginListener(err, success, data) {
			if (err) {
				console.error(err);
				return;
			}

			this.setState({
				isUserLogin: success
			});
		}
	}, {
		key: '_getUserBlock',
		value: function _getUserBlock() {
			var block = null;

			if (this.state.isUserLogin) {
				block = React.createElement(UserBlock, null);
			} else {
				block = React.createElement(LoginBlock, null);
			}

			return block;
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(RedHeartPage, null);
		}
	}]);

	return App;
}(React.Component);

module.exports = App;

// <div className='app'>
// 		      <Appbar>
// 			     <AppbarGroup
// 			        className='mr15'>
// 		            <MenuButton
// 					   onClick={this._showLeftNav}
// 				    />
// 				 </AppbarGroup>

// 			     <AppbarGroup>
// 				    <Text
// 				       text='DoubanFM'
// 				    />
// 				 </AppbarGroup>

// 				 <AppbarGroup
// 				    float={AppbarGroup.RIGHT}>
// 				    {this._getUserBlock()}
// 				 </AppbarGroup>
// 		      </Appbar>

// 		      <div>

// 		         {this.props.children}
// 		      </div>

// 		      <LeftNav
// 		         docked={false}
//                  width={250}
//                  open={this.state.showLeftNav}
//                  onRequestChange={this._switchLeftNav}>
//               </LeftNav>
// 		   </div>