const React = require('react');

const Text = require('./text');
const Button = require('./button');
const Dialog = require('./dialog');

const UserStore = require('../stores/user');

const DEFAULT_AVATAR = './image/user_avatar_default.png';

class UserBlock extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			showUserDialog: false,
			user: {},
		};

		[
			'_logout',
			'_switchUserDialog',
			'_getUserDialog',
			'_hideUserDialog',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	componentDidMount(){
		let user = Object.assign({}, UserStore.getUserInfo() || {});

		this.setState({
			user: user,
		});
	}

	_logout(){

	}

	_switchUserDialog(){
		this.setState({
			showUserDialog: !this.state.showUserDialog,
		});
	}

	_hideUserDialog(){
		this.setState({
			showUserDialog: false,
		});
	}	

	_getUserDialog(){
		if(!this.state.showUserDialog){
			return null;
		}

		const user = this.state.user || {};
		const playRecord = user.play_record || {};

		return (
		   <Dialog
		      className='user-dialog'
		      onBlur={this._hideUserDialog}>
			     <div 
			        className='avatar-img'>
			        <img 
			           className='img'
			           src={this.state.user.avatar || DEFAULT_AVATAR}
			        />
			     </div>

			     <div
			     	className='avatar-info'>
			        <div
			           className='username'>
			           {user.name || ''}
			        </div>

			        <div
			           className='play-record'>
			           累计共收听{playRecord.played || 0}首
			           红心{playRecord.liked || 0}首
			        </div>

			        <div 
			           className='clearfix'>
			           <Button 
			              className='logout-btn'>
			              <Text
			                 className='text' 
			                 text='退出'
			              />
			           </Button>
			        </div>
			     </div>
			  
		   </Dialog>
		);
	}

	render(){
		return (
			<div 
			   className='user-block'>

			   <Button 
			      className='user-dialog-btn'
			      onClick={this._logout}>
			      <img 
			         className='img'
			         onClick={this._switchUserDialog} 
			         src={this.state.user.avatar || DEFAULT_AVATAR}
			      />
			   </Button>

			   {this._getUserDialog()}
			</div>	
		);
	}
}

module.exports = UserBlock;