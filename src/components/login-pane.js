const React = require('react');
const ReactDOM = require('react-dom');

const Icon = require('./icon');
const Text = require('./text');
const Button = require('./button');

const UserAction = require('../actions/user');
const CaptchaAction = require('../actions/captcha');

const UserStore = require('../stores/user');
const CaptchaStore = require('../stores/captcha');

class LoginPane extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showErrorMsg: false,
			errMsg: null,
			captcha: null,
		};

		this.init();
	}

	init(){
		[
		   'initCaptcha',
		   'refreshCaptcha',
		   'getCaptchaUrl',
		   'getCaptchaImg',
		   'getErrorLabel',
		   'onLoginListener',
		   'onCaptchaChangedListener',
		   'onSubmit',

		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});
	}

	shouldComponentUpdate(nextProps, nextState){
		return  this.state.errMsg !== nextState.errMsg ||
				this.state.captcha !== nextState.captcha ||
				this.state.showErrorMsg !== nextState.showErrorMsg; 
	}

	componentDidMount(){
		UserStore.addLoginListener(this.onLoginListener);
		CaptchaStore.addCaptchaChangedListenter(this.onCaptchaChangedListener);

		this.initCaptcha();
	}

	componentWillUnmount(){
		UserStore.removeLoginListener(this.onLoginListener);
		CaptchaStore.removeCaptchaChangedListenter(this.onCaptchaChangedListener);
	}

	initCaptcha(){
		this.refreshCaptcha();
	}

	refreshCaptcha(){
		CaptchaAction.refresh();
	}

	getCaptchaUrl(){
		return CaptchaStore.getCaptchaUrl(this.state.captcha);
	}

	onCaptchaChangedListener(err, captcha){
		if(err){
			console.error(err);
			return;
		}

		this.setState({
			captcha: captcha
		});
	}

	onLoginListener(err, success, data){
		if( err || !success ){
			this.setState({
				showErrorMsg: true,
				errMsg: !!err ? err.message : data
			});
		}
	}

	onSubmit(){
		let username = ReactDOM.findDOMNode(this.refs.username).value.trim();
		let password = ReactDOM.findDOMNode(this.refs.password).value.trim();
		let captcha  = ReactDOM.findDOMNode(this.refs.captcha).value.trim();
		
		UserAction.login(username, password, captcha);

		this.refreshCaptcha();
	}

	getErrorLabel(){
		if(!this.state.showErrorMsg){
			return null;
		}

		return (
		   <label 
		      className='error-info'>
		      {this.state.errMsg}
		   </label>
		);
	}

	getCaptchaImg(captcha){
		if(!captcha){
			return null;
		}

		return (
			<img
 	           onClick={this.refreshCaptcha}
		       className='img' 
			   src={this.getCaptchaUrl()} />
		);
	}

	render(){
		let className = [
		   'login-pane',
		   this.props.className || ''
		
		].join(' ');

		return (
			<div 
			   {...this.props}
			   className={className}>

			   <div className='content-area'>
			      <h1 className='title'>登陆</h1>

			      <div className='user-avatar'>
			         <img 
			            className='img'
			            src='./image/user_avatar_default.png'
			         />
			      </div>

			      {this.getErrorLabel()}

			      <div 
			         className='form'>
			        	
			         <div 
			            className='field username'>
			            <label 
			               className='label'>
			               邮箱/用户名
			            </label>

			            <input 
			               ref='username'
			               type='text'
			               className='input'
			            />
			                  
			            <Icon
			               icon='person'
			               className='icon'
			            />
			         </div>

			         <div 
			            className='field password'>
			            <label 
			               className='label'>
			               密码
			            </label>

			            <input 
			               ref='password'
			               type='password'
			               className='input'
			            />
			                  
			            <Icon
			               icon='lock outline'
			               className='icon'
			            />
			         </div>

			         <div 
			            className='field captcha'>
			            <label 
			               className='label'>
			               验证码
			            </label>

			            <input 
			               ref='captcha'
			               type='text'
			               className='input'
			            />

			            {this.getCaptchaImg(this.state.captcha)}
			         </div>

			         <Button
			            className='login-btn'
			            onClick={this.onSubmit}>
			            <Text text='登陆'/>
			         </Button>
			      </div>
			   </div>

			</div>
		);
	}
}

module.exports = LoginPane;
