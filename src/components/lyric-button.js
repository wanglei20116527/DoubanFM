const React = require('react');

const Button = require('./button');

class LyricButton extends React.Component {
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
				className='lyric-button'
				onClick={this._onClick}>
				<span className='lyric-icon'></span>
			</Button>
		);
	}
}

LyricButton.propTypes = {
	onClick: React.PropTypes.func,
};

module.exports = LyricButton;