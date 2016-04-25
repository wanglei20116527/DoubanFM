const React = require('react');

class Button extends React.Component {
	render(){
		let className = ['btn', this.props.className].join(' ');

		return (
			<button
			   {...this.props}
			   className={className}>
			   
			   {this.props.children}
			</button>
		);
	}
}

module.exports = Button;