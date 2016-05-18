const React = require('react');

const Text = require('./text');
const Button = require('./button');
const Dialog = require('./dialog');
const LoginPane = require('./login-pane');

class LoginBlock extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			showDialog: false,
		};

		[
		   '_switchDialog',
		   '_displayDialog',
		   '_hiddenDialog',
		   '_getDialog',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	_switchDialog(){
		this.setState({
			showDialog: !this.state.showDialog
		});
	}

	_displayDialog(){
		this.setState({
			showDialog: true
		});
	}

	_hiddenDialog(){
		this.setState({
			showDialog: false
		});
	}

	_getDialog(){
		if(!this.state.showDialog){
			return null;
		}

		return (
		   <Dialog
		      className='login-dialog' 
		      onBlur={this._hiddenDialog}>
		      <LoginPane />
		   </Dialog>
		);
	}

	render(){
		return (
		   <div 
		      className='login-block'>
		      
		      <Button 
		         onClick={this._switchDialog}>
		         <Text text='登陆'/>
		      </Button>

		      {this._getDialog()}
		   </div>
		);
	}
}

module.exports = LoginBlock;