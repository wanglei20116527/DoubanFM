const React = require('react');

const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const LeftNav = require('material-ui/lib/left-nav');
const Button = require('./components/button');
const Text = require('./components/text');
const Appbar = require('./components/appbar');
const UserBlock = require('./components/user-block');
const LoginBlock = require('./components/login-block');
const MenuButton = require('./components/menu-button');
const AppbarGroup = require('./components/appbar-group');
const Player = require('./components/red-heart-player');
const RedHeartPage = require('./components/red-heart-page');


const UserStore = require('./stores/user');
const MusicStore = require('./stores/music');
const PlayList = require('./stores/playlist');


class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showLeftNav: false,
			isUserLogin: false,

			title: 'DoubanFM',
		};

		[
			'_showLeftNav',
			'_showLoginPage',
			'_onLoginListener',
			'_onDrawerLayoutStateChanged',
			'_getUserBlock',
			'_switchLeftNav',

		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});
	}

	componentDidMount(){

		UserStore.addLoginListener(this._onLoginListener);
	}

	componentWillUnmount(){
		UserStore.removeLoginListener(this._onLoginListener);
	}

	shouldComponentUpdate(nextProps, nextState){
		return nextProps.showLeftNav !== nextState.showLeftNav ||
		       nextState.isUserLogin !== nextState.isUserLogin ||
		       nextState.title !== nextState.title;
	}

	_showLeftNav(){
		this._switchLeftNav(true);
	}

	_switchLeftNav(show){
		this.setState({
			showLeftNav: show
		});
	}

	_showLoginPage(){
		this.setState({
			showLoginPage: true
		});
	}

	_onDrawerLayoutStateChanged(isNavShow){
		this.setState({
			showLeftNav: isNavShow
		});
	}

	_onLoginListener(err, success, data){
		if(err){
			console.error(err);
			return;
		}

		this.setState({
			isUserLogin: success
		});
	}

	_getUserBlock(){
		let block = null;
		
		if( this.state.isUserLogin){
			block = <UserBlock />;

		}else{
			block = <LoginBlock />;
		}

		return block;
	}

	render() {
		return (
			<RedHeartPage />
		);
	}
}

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







