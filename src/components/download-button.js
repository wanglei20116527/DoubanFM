const React = require('react');

const Button = require('./button');
const Icon = require('./icon');

class DownloadButton extends React.Component {
	constructor(...props){
		super(...props);

		[
		   '_onClick',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	_onClick(e){
		const {
			onClick,

		} = this.props;

		onClick && onClick(e);
	}

	render(){
		return (
			<Button 
			   className='download-button'
			   onClick={this._onClick}>
			   <Icon
			      className='icon' 
			      icon='file_download'
			   />
			</Button>
		);
	}
}

DownloadButton.propTypes = {
	onClick: React.PropTypes.func,
};

module.exports = DownloadButton;