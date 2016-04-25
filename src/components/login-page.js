const React = require('react');

const Icon = require('./icon');
const Text = require('./text');
const Button = require('./button');
const LoginPane = require('./login-pane');
const LoginIntroPane = require('./login-intro-pane');

class LoginPage extends React.Component {
	constructor(props){
		super(props);

		[
		
		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});
	}


	render(){
		return (
			<div className='login-page clearfix'>

			   <div className='login-dialog'>

			      <div 
			         className='intro-area float-left'>
			         <LoginIntroPane />
			      </div>

			      <div 
			         className='login-area float-left'>
			         <LoginPane />
			      </div>
			      
			   </div>
			</div>
		);
	}
}

module.exports = LoginPage;