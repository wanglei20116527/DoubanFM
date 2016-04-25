const React = require('react');

const Icon = require('./icon');
const Button = require('./button');

class MenuButton extends React.Component {
	render(){
		let className = ['menu-btn', this.props.className].join(' ');

		return (
			<Button 
			   {...this.props}
			   className={className}>
			   
			   <Icon icon='menu'/>
			</Button>
		);
	}
}

module.exports = MenuButton;