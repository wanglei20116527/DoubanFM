const React = require('react');
const ReactDOM = require('react-dom');

const Immutable = require('immutable');

class DrawerLayout extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			showNav: false,

			navClassNames: Immutable.List(['nav', 'hide']),
			maskClassNames: Immutable.List(['mask', 'hide'])
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.state.showNav === nextProps.showNav){
			return;
		}

		if(nextProps.showNav){
			this._openNav();
		}else{
			this._closeNav();
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		let thisState = this.state || {};

		if(thisState.showNav !== nextState.showNav){
			return true;
		}

		if(!nextState.navClassNames.equals(thisState.navClassNames)){
			return true;
		}

		if(!nextState.maskClassNames.equals(thisState.maskClassNames)){
			return true;
		}

		return false;
	}

	componentDidMount(){
		this.props.showNav && this._openNav();
	}

	_transitionEnd(){
		if(!this.state.showNav){
			this.setState({
				navClassNames: Immutable.List(['nav', 'hide']),
				maskClassNames: Immutable.List(['mask', 'hide'])
			});
		}

		this.props.onRequestChange && this.props.onRequestChange(this.state.showNav);
	}

	_openNav(){
		this.setState({
			showNav: true,
			navClassNames: Immutable.List(['nav', 'enter']),
			maskClassNames: Immutable.List(['mask', 'enter'])
		});

		setTimeout(()=>{
			this.setState({
				navClassNames: Immutable.List(['nav', 'enter', 'enter-active']),
				maskClassNames: Immutable.List(['mask', 'enter', 'enter-active']),
			});
		}, 10);
	}

	_closeNav(){
		this.setState({
			showNav: false,
			navClassNames: Immutable.List(['nav', 'leave']),
			maskClassNames: Immutable.List(['mask', 'leave'])
		});

		setTimeout(()=>{
			this.setState({
				navClassNames: Immutable.List(['nav', 'leave', 'leave-active']),
				maskClassNames: Immutable.List(['mask', 'leave', 'leave-active'])
			});
		}, 10);
	}

	_getMaskClassName(){
		return this.state.maskClassNames.join(' ');
	}

	_getNavClassName(){
		return this.state.navClassNames.join(' ');
	}

	render(){
		let children = React.Children.toArray(this.props.children);
		return (
			<div className='drawer-layout'>
				<div 
				   className='content-area'>
				   {children[1]}
				</div>

				<div 
				   className={this._getMaskClassName()} 
				   onClick={ ()=>{ this._closeNav(); } }></div>

				<div
				   onTransitionEnd={ ()=>{ this._transitionEnd(); } }
				   className={this._getNavClassName()}>
				   {children[0]}
				</div>
			</div>
		);
	}

	
}

DrawerLayout.propsType = {
	showNav: React.PropTypes.bool,
	onRequestChange: React.PropTypes.func,
};

DrawerLayout.defaultProps = {
	showNav: false
};

module.exports = DrawerLayout;



