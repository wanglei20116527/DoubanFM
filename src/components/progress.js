const React = require('react');
const ReactDOM = require('react-dom');

const autobind = require('core-decorators').autobind;

class Progress extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			width: 0,
			total: 1,
			curt : 0,
			totalBytes: 1,
			curtBytes: 1,
		};
	}

	componentWillReceiveProps(nextProps){
		this._mergePropsToState(nextProps);
	}

	componentDidMount(){
		this._mergePropsToState(this.props);
	}

	shouldComponentUpdate(nextProps, nextState){
		const state = this.state;
		
		for(let key in state){
			if(state[key] !== nextState[key]){
				return true;
			}
		}

		return false;
		return true;
	}

	@autobind
	_mergePropsToState(props){
		const {
			width, 
			total,
			curt,
			totalBytes,
			curtBytes,

		} = props;

		this.setState({
			width: width,
			total: total,
			curt: curt,
			totalBytes: totalBytes,
			curtBytes: curtBytes,
		});
	}

	@autobind
	_getProgressStyle(){
		const {
			width,

		} = this.state;

		return {
			width: `${width}px`,
		};
	}

	@autobind
	_getBarStyle(){
		const {
			total, 
			curt,
			width,

		} = this.state;

		return {
			width: `${parseInt(curt / total * width)}px`,
		};
	}

	@autobind
	_getDownloadBarStyle(){
		const {
			width,
			totalBytes, 
			curtBytes,

		} = this.state;

		return {
			width: `${parseInt(curtBytes / totalBytes * width)}px`,
		};
	}

	@autobind
	_onClick(e){
		const {
			width,
			total,

		} = this.state;

		const {
			onChange,

		} = this.props;

		const offsetX = e.nativeEvent.offsetX;
		const curt = parseInt(offsetX / width * total);

		this.setState({
			curt: curt,
		});

		onChange && onChange(offsetX / width);
	}

	@autobind
	render(){
		return (
		   <div
		      className='progress'
		      style={this._getProgressStyle()}
		      onMouseMove={this._onMouseMove}
		      onClick={this._onClick}>

		      <div 
		         className='inner-wrapper'
		         style={this._getProgressStyle()}>

		         <div 
		            className='download-bar'
		            style={this._getDownloadBarStyle()}>
		         </div>
		         
		          <div 
		             className='bar'
		             style={this._getBarStyle()}>

		             <span className='indicator'></span>
		          </div>
		      </div>
		   </div>
		);
	}
}

Progress.propTypes = {
	width: React.PropTypes.number.isRequired,
	total: React.PropTypes.number.isRequired,
	curt : React.PropTypes.number,
	totalBytes: React.PropTypes.number,
	curtBytes: React.PropTypes.number,
	onChange: React.PropTypes.func,
};

Progress.defaultProps = {
	curt: 0,
	totalBytes: 1,
	curtBytes: 1,
};

module.exports = Progress;