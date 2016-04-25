const React = require('react');

class AppbarGroup extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		let classes = [
		   'appbar-group', 
		   this.props.className
		];
		
		switch(this.props.float){
			case AppbarGroup.LEFT: 
				classes.push('float-left');
				break;

			case AppbarGroup.RIGHT:
				classes.push('float-right');
				break;
		}

		let className = classes.join(' ');
		
		return (
			<div 
			   {...this.props}
			   className={className}>
			   {this.props.children}
			</div>
		);
	}
}

AppbarGroup.NONE  = 0;
AppbarGroup.LEFT  = 1;
AppbarGroup.RIGHT = 2;

AppbarGroup.defaultProps = {
	float: AppbarGroup.NONE
};

AppbarGroup.propTypes = {
	float: React.PropTypes.oneOf([ 
		AppbarGroup.NONE, 
		AppbarGroup.LEFT, 
		AppbarGroup.RIGHT
	])
};

module.exports = AppbarGroup;