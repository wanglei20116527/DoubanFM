const React = require('react');

const Button = require('./button');

class PlayButton extends React.Component {
	constructor(...props){
		super(...props);

		[
		   '_playingIcon',
		   '_pauseIcon',
		   '_onClick',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	_playingIcon(){
		return (
			<svg 
			   size="24" 
			   viewBox="-4 -4 23 23" 
			   color="#4a4a4a" 
			   style={{top: "-2px",}} 
			   version="1.1" 
			   height="24" 
			   width="24" 
			   class="icon icon-play" 
			   data-reactid=".0.0.0.1.1.1.1.1.1.1.1">

			   <g 
			      id="box" 
			      stroke="none" 
			      stroke-width="1" 
			      fill="none" 
			      data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0">

			      <g 
			         id="play" 
			         transform="translate(3.000000, 0.000000)" 
			         fill="#4a4a4a" 
			         data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0.0">

			         <path 
			            d="M1.73659474,0.223353924 
			               L13.2836758,8.03253432 
			               C14.2387747,8.56461413 14.2387747,9.43530281 13.2836758,9.96741739 
			               L1.73659474,17.7766673 
			               C0.781460601,18.3087471 0,17.8570252 0,16.7728022 
			               L0,1.22721903 
			               C0,0.142961262 0.781460601,-0.308760652 1.73659474,0.223353924 
			               Z" 
			            id="-" 
			            data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0.0.0">
			         </path>
			      </g>
			    </g>
			 </svg>
		);
	}	

	_pauseIcon(){
		return (
			<svg 
				color="#4a4a4a" 
				size="24" 
				version="1.1" 
				class="icon icon-pause" 
				viewBox="0,0,18,18" 
				height="24" width="24" 
				style={{verticallign:"middle"}} 
				data-reactid=".0.0.0.1.1.1.1.1.1.1.1">
				<g 
				   id="Page-1" 
				   stroke="none" 
				   stroke-width="1" 
				   fill="none" 
				   data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0">
				   <g 
				      id="pause" 
				      transform="translate(4.000000, 3.000000)" 
				      fill="#4a4a4a" 
				      data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0.0">
				      <path 
				         d="M0,0 L3,0 L3,12 L0,12 L0,0 Z M7,0 L10,0 L10,12 L7,12 L7,0 Z" 
				         id="Rectangle-54" 
				         data-reactid=".0.0.0.1.1.1.1.1.1.1.1.0.0.0">
				      </path>
				   </g>
				</g>
			</svg>
		);
	}

	_onClick(e){
		const {
			onClick,

		} = this.props;

		onClick && onClick(e);
	}

	render(){
		const {
			playing,

		} = this.props;

		const icon = playing ? this._pauseIcon() 
							 : this._playingIcon();

		return (
			<Button 
				className='play-button'
				onClick={this._onClick}>
				{icon}
			</Button>
		);
	}
}

PlayButton.defaultProps = {
	playing: true,
};

PlayButton.propTypes = {
	playing: React.PropTypes.bool,
	onClick: React.PropTypes.func
};

module.exports = PlayButton;