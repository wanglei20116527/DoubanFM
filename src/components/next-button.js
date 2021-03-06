const React = require('react');

const Button = require('./button');

class NextButton extends React.Component {
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
				className='next-btn'
				onClick={this._onClick}>
				<span className='icon'></span>
			</Button>
		);
	}
}

NextButton.propTypes = {
	onClick: React.PropTypes.func,
};

module.exports = NextButton;