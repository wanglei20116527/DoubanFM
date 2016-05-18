const React = require('react');

const Button = require('./button');

class BrustHeartButton extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			disable: false,
			className: 'brust-heart-icon inactive',
		};

		[
		   '_onClick',
		   '_onAnimationStart',
		   '_onAnimationEnd',
		   '_getClassName',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	componentDidMount(){
		const {
			active,
			animation,

		} = this.props;

		this.setState({
			className: this._getClassName(active, animation),
		});
	}

	componentWillReceiveProps(nextProps){
		const {
			active,
			animation,

		} = nextProps;

		this.setState({
			className: this._getClassName(active, animation),
		});
	}

	shouldComponentUpdate(nextProps, nextState){
		return !(
			       nextProps.active === this.props.active &&
			       nextProps.className === this.state.className
			    );
	}

	_onClick(e){
		if( this.state.disable ){
			return;
		}

		this.props.onClick && this.props.onClick(e);
	}

	_onAnimationStart(){
		this.setState({
			disable: true
		});
	}

	_onAnimationEnd(){
		let className = [
		   'brust-heart-icon',
		   'active',

		].join(' ');

		this.setState({
			disable: false,
			className: className
		});
	}

	_getClassName(active, animation){
		let classNames = [
		   'brust-heart-icon',
		];

		if( active ){
			if( animation ){
				classNames.push('brust-heart');
			
			}else{
				classNames.push('active');
			}

		}else{
			classNames.push('inactive');
		}

		return classNames.join(' ');
	}

	render(){
		return (
		    <Button 
		       className='brust-heart-button'>
		       
		       <div 
		          className='mask'
		          onClick={this._onClick}>
		       </div>

		       <div 
		          className={this.state.className}
		          onAnimationStart={this._onAnmationStart}
		          onAnimationEnd={this._onAnimationEnd}>
		       </div>
		    </Button>
		);
	}
}

BrustHeartButton.defaultProps = {
	active: false,
	animation: false,
};

BrustHeartButton.propTypes = {
	active: React.PropTypes.bool,
	animation: React.PropTypes.bool,
};

module.exports = BrustHeartButton;

