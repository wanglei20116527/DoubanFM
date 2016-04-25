const React = require('react');

class Text extends React.Component {
	render(){
		let className = [
  		   'text',
  		   this.props.className

		].join(' ');
		
		return (
			<span
			   {...this.props}
			   className={className}>
			   {this.props.text}
			</span>
		);
	}
}

Text.defaultProps = {
	text: ''
};

Text.propTypes = {
	text: React.PropTypes.string
};

module.exports = Text;