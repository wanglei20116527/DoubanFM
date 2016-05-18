const React = require('react');
const Electron = require('electron');

class Dialog extends React.Component {
	constructor(...props){
		super(...props);

		[
			'_onBlurHandler',
			'_onClickHandler',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	_onBlurHandler(e){
		console.log('_onBlurHandler');
		this.props.onBlur && this.props.onBlur(e);
	}

	_onClickHandler(e){
		e.nativeEvent.stopImmediatePropagation();
	}

	componentDidMount(){
		document.addEventListener('click', this._onBlurHandler, false);

		Electron.ipcRenderer.on('browser-window-blur', this._onBlurHandler);
	}

	componentWillUnmount(){
		document.removeEventListener('click', this._onBlurHandler, false);

		Electron.ipcRenderer.removeListener('browser-window-blur', this._onBlurHandler);
	}

	
	render(){
		const className = [
			'dialog',
			this.props.className,	

		].join(' ');
		
		return (
		   <div 
		      className={className}
		      onClick={this._onClickHandler}>
		      {this.props.children}
		   </div>
		);
	}
}

Dialog.propTypes = {
	onBlur: React.PropTypes.func
};

module.exports = Dialog;