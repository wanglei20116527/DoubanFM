const React = require('react');

class Appbar extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div 
			   className='appbar'>

			   <div
			      className='clearfix'>
			      {this.props.children}
			   </div>
			
			</div>
		);
	}
}

module.exports = Appbar;