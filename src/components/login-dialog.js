const Electron = require('electron');
const React = require('react');
const ReactDOM = require('react-dom');

const LoginPane = require('./login-pane');

class LoginDialog extends React.Component {
	constructor(...props){
		super(...props);

		[
			'_onBlurHandler',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	_onBlurHandler(e){
		this.props.onBlur && this.props.onBlur(e);
	}

	_onClickHandler(e){
		e.nativeEvent.stopPropagation();
	}

	componentDidMount(){
		document.addEventListener('click', this._onBlurHandler, false);

		Electron.ipcRenderer.on('browser-window-blur', this._onBlurHandler);
	}

	componentWillUnmount(){
		document.body.removeEventListener('click', this._onBlurHandler, false);

		Electron.ipcRenderer.removeListener('browser-window-blur', this._onBlurHandler);
	}

	render(){
		return (
			<div
			   tabIndex='-1'
			   className='login-dialog'
			   onClick={this._onClickHandler}>

			   <LoginPane />
			</div>
		)
	}
}

LoginDialog.propTypes = {
	onBlur: React.PropTypes.func
};

module.exports = LoginDialog;