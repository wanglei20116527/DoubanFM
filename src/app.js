const React = require('react');

const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

const Text = require('./components/text');
const Button = require('./components/button');
const Appbar = require('./components/appbar');
const LoginPage = require('./components/login-page');
const LoginDialog = require('./components/login-dialog');
const MenuButton = require('./components/menu-button');
const AppbarGroup = require('./components/appbar-group');
const DrawerLayout = require('./components/drawer-layout');

const UserStore = require('./stores/user');


class App extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showLeftNav: false,
			showLoginPage: false,
			title: 'DoubanFM',
			menu: [
				{
					text: 'wanglei',
					to: '/wanglei'
				},

				{
					text: 'houna',
					to: '/houna'
				}
			]
		};

		[
			'showLeftNav',
			'showLoginPage',
			'onLoginListener',
			'onDrawerLayoutStateChanged',

		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});
	}

	showLeftNav(){
		this.setState({
			showLeftNav: true
		});
	}

	showLoginPage(){
		this.setState({
			showLoginPage: true
		});
	}

	onDrawerLayoutStateChanged(isNavShow){
		this.setState({
			showLeftNav: isNavShow
		});
	}

	componentDidMount(){

		UserStore.addLoginListener(this.onLoginListener);
	}

	componentWillUnmount(){
		UserStore.removeLoginListener(this.onLoginListener);
	}

	shouldComponentUpdate(nextProps, nextState){
		
		return true;
	}

	onLoginListener(err, data){
		if(err){
			console.error(err);
			return;
		}

		this.setState({
			showLoginPage: data.r != 0,
		});
	}

	render() {
		let style = {
			width: '250px'
		};

		return (
			<div className='app'>
			   <DrawerLayout 
			      showNav={this.state.showLeftNav}
			      onRequestChange={this.onDrawerLayoutStateChanged}>

			      <div style={ style }></div>

				  <div>
				     <Appbar>
				        <AppbarGroup className='mr15'>
						   <MenuButton
						      onClick={this.showLeftNav}
						   />
						</AppbarGroup>

						<AppbarGroup>
						   <Text text='DoubanFM'/>
						</AppbarGroup>

						<AppbarGroup float={AppbarGroup.RIGHT}>
						    <Button
						       onClick={this.showLoginPage}>
						       <Text text='登陆'/>
						    </Button>

						    <LoginDialog />
						</AppbarGroup>
					 </Appbar>
					
					 <div>
					   {this.props.children}
				     </div>
			      </div>
			   </DrawerLayout>
			</div>
		);
	}
}

module.exports = App;

