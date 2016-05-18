const React = require('react');

const Button = require('./button');
const Icon = require('./icon');

const MODE = {
	LOOP: 0,
	RANDOM: 1,
	SEQUENCE: 2,
};

class PlayModeButton extends React.Component {
	constructor(...props){
		super(...props);

		[
		   '_onClick',
		   '_sequenceIcon',
		   '_loopIcon',
		   '_randomIcon',
		   '_getIcon',

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

	_sequenceIcon(){
		return (
		   <Icon
		      className='icon sequence' 
			  icon ='repeat'
		   />
		);
	}

	_loopIcon(){
		return (
		   <Icon
		      className='icon loop' 
			  icon ='repeat_one'
		   />
		);
	}

	_randomIcon(){
		return (
		   <svg 
		      size="28" 
		      color="#6BBD7A" 
		      version="1.1" 
		      class="icon icon-shuffle" 
		      viewBox="0,0,26,26" 
		      height="28" 
		      width="28" 
		      style={{verticalAlign: "middle"}} 
		      data-reactid=".0.0.0.1.1.1.1.4.0.3">
		      
		      <g 
		         id="Page-1" 
		         stroke="none" 
		         stroke-width="1" 
		         fill="none" 
		         data-reactid=".0.0.0.1.1.1.1.4.0.3.0">

		         <path 
		            d="M20.3802083,17.7234375 
		               L20.3802083,15.9989583 
		               L23,19.0000004 
		               L20.3802083,22 
		               L20.3802083,20 
		               L19.3265625,20 
		               C16.3114583,20.03125 14.6088542,17.7744792 13.1067708,15.7838542 
		               C11.7578125,13.99375 10.5911458,12.3057292 8.70989583,12.3057292 
		               L7,12.3057292 L7,9.99791667 L8.70989583,9.99791667 
		               C11.725,9.99791667 13.4276042,12.396875 14.9296875,14.3875 
		               C16.2786458,16.1776042 17.4416667,17.7234375 19.3265625,17.7234375 
		               L20.3802083,17.7234375 Z M11.8088542,16.9177083 
		               C12.1296875,17.340625 12.4651042,17.7890625 12.8296875,18.2338542 
		               C11.7505208,19.2510417 10.4489583,20.0020833 8.70989583,20.0020833 
		               L7,20.0020833 
		               L7,17.6942708 
		               C7,17.6942708 7.48489583,17.7161458 8.70989583,17.6942708 
		               C9.89479167,17.66875 10.6385417,17.1802083 11.41875,16.4036458 
		               C11.5463542,16.5713542 11.6776042,16.7427083 11.8088542,16.9177083 
		               Z M19.3265625,12.2875 
		               C18.178125,12.2875 17.2958333,12.8635417 16.4755208,13.7203125 
		               C16.3953125,13.6109375 16.3114583,13.5015625 16.2276042,13.3921875 
		               C15.8666667,12.9145833 15.4802083,12.4005208 15.0536458,11.89375 
		               C16.1619792,10.8036458 17.5036458,9.9796875 19.3265625,10 
		               L20.3802083,10 
		               L20.3802083,8 
		               L23.0000002,11.0005209 
		               L20.3802083,14.0010417 
		               L20.3802083,12.2875 
		               L19.3265625,12.2875 
		               Z" 
		            id="Shape-Copy-4" 
		            fill="#6BBD7A" 
		            transform="translate(15.000000, 15.000000) scale(1, -1) translate(-15.000000, -15.000000)" 
		            data-reactid=".0.0.0.1.1.1.1.4.0.3.0.0">
		         </path>
		      </g>
		   </svg>
		);
	}

	_getIcon(mode){
		return this[[
		   '_loopIcon',
		   '_randomIcon',
		   '_sequenceIcon',

		][mode]]();
	}

	render(){
		const {
			mode,

		} = this.props;

	    const icon = this._getIcon(mode);

		return (
			<Button 
			   className='play-mode-button'
			   onClick={this._onClick}>
			   {icon}
			</Button>
		);
	}
}

PlayModeButton.Mode = MODE;

PlayModeButton.propTypes = {
	mode: React.PropTypes.oneOf([ 
		MODE.LOOP,
		MODE.RANDOM, 
		MODE.SEQUENCE,
	]),

	onClick: React.PropTypes.func,
};

PlayModeButton.defaultProps = {
	mode: MODE.LOOP,
};

module.exports = PlayModeButton;

