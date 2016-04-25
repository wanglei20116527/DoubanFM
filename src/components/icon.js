const React = require('react');

class Icon extends React.Component {
	render(){
		let className = [
		   'material-icons', 
		  	this.props.className
		].join(' ');

		return (
			<i 
			   {...this.props}
			   className={className}>{this.props.icon}</i>
		);
	}
}

Icon.propTypes = {
	icon: React.PropTypes.string.isRequired
};

module.exports = Icon;