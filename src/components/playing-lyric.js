const React = require('react');
const ReactDOM = require('react-dom');

const autobind = require('core-decorators').autobind;

const PS = require('perfect-scrollbar');
            
const Lyric = require('../utils/lyric');

const PROMPT = '歌词不支持滚动';

const gcs = window.getComputedStyle;

let setTimeoutId;

class PlayingLyric extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			valid: true,
		};
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.state.valid    !== nextState.valid
		       ||
		       this.props.curtTime !== nextProps.curtTime
		       ||
		       this.props.lyric    !== nextProps.lyric;
	}

	componentWillReceiveProps(nextProps){
		this._updateState(nextProps);
	}

	componentDidMount(){
		this._updateState(this.props);

		const $lc = ReactDOM.findDOMNode(this.refs.lc);
		PS.initialize($lc);

		setTimeout(()=>{
			PS.update($lc);
		}, 0);
	}

	componentDidUpdate(){
		const $lc  = ReactDOM.findDOMNode(this.refs.lc);

		if( !this.state.valid ){
			PS.update($lc);
			return;
		}

		const $al  = ReactDOM.findDOMNode(this.refs.al);

		let scrollTop = 0;

		if( $al ){

			const lcHHeight   = parseInt(gcs($lc, null).height) / 2;
			const lcScrollTop = $lc.scrollTop;

			const alHeight    = parseInt(gcs($al, null).height);
			const alOffsetTop = $al.offsetTop;

			const $alp = $al.offsetParent;
			const alpHeight   = parseInt(gcs($alp, null).height);

			if( alOffsetTop <= lcHHeight ){
				scrollTop = 0;
			
			} else if( alOffsetTop > lcHHeight && alpHeight - alOffsetTop > lcHHeight){
				scrollTop = alOffsetTop - lcHHeight;
			
			} else {
				scrollTop = alpHeight - lcHHeight;
			}
		};

		let duration = 500;
		
		let astd = Math.abs( $lc.scrollTop - scrollTop );

		if( astd > 800 ){
			duration = 1000;
		
		} else if( astd < 200 ){
			duration = 500;

		} else {
			duration = 300;
		}

		if( setTimeoutId ){
			clearTimeout(setTimeoutId);
			setTimeoutId = null;
		}

		if($lc.scrollTop === scrollTop){
			PS.update($lc);

		} else {

			setTimeoutId = setTimeout(()=>{
				smoothScroll($lc, $lc.scrollTop, scrollTop, 10, new Date().getTime(), duration);
			}, 0); 
		}

		function smoothScroll(el, startScrollTop, targetScrollTop, interval, startTime, duration){
			let args         = [].slice.call(arguments)
			  , curtTime     = new Date().getTime()
			  , passedTime   = curtTime - startTime
			  , changedTotal = targetScrollTop - startScrollTop;

			if( passedTime > duration ){
				el.scrollTop = targetScrollTop;
				setTimeoutId = null;

				return;
			}

			let step = Math.ceil(easeInOutQuad( passedTime, startScrollTop, changedTotal, duration));

			el.scrollTop = step;

			PS.update(el);

			args.unshift(interval);
			args.unshift(smoothScroll);
			setTimeoutId = setTimeout.apply(null, args);
		}

		function easeInOutQuad(t, b, c, d){
			if( ( t /= d / 2) < 1 ){
				return c / 2 * t * t + b;
			}

			return -c / 2 * ( (--t) * (t - 2) - 1 ) + b;
		}
	}

	componentWillUnmount(){
		PS.destroy(ReactDOM.findDOMNode(this.refs.lyric));
	}

	@autobind 
	_updateState(props){
		let {
			lyric,

		} = props;

		this.setState({
			valid:  Lyric.isValid(lyric),
		});
	}

	@autobind
	_getLyric(){
		const {
			valid,

		} = this.state;

		const {
			lyric,
			curtTime,

		} = this.props;

		let frags = Lyric.parse(lyric);

		frags = frags.map((frag, i)=>{
			let time
			  , content
			  , key = i + 1
			  , active   = false
			  , nextFrag = frags[i + 1]
			  , ret;


			if( valid ){
				time    = frag[0];
				content = frag[1];

			} else {
				time    = -1;
				content = frag;
			}

			if( valid ){
				active = curtTime >= time 
						 && 
						 ( 
							(nextFrag &&  nextFrag[0] > curtTime)
							||
							!nextFrag 
						 );
			}

			if( active ){
				ret = (
					<p
					   ref='al' 
					   key={key}
					   className='active'>
					   {content}
					</p>
				);

			} else {
				ret = (
					<p
					   key={key}>
					   {content}
					</p>
				);
			}

			return ret;
		});

		if( !valid ){
			frags.unshift(
				<p
				   key={0}>
				   {PROMPT}
				</p>
			);
		}

		return (
			<div
			   ref='lc' 
			   className='lyric'>
			   <div 
			      className='wrapper'>
			      {frags}
			   </div>
		    </div>
		);
	}

	render(){
		const lyric  = this._getLyric();

		return (
			<div 
			   className='playing-lyric'>
			   {lyric}
			</div>
		);
	}
}

PlayingLyric.propTypes = {
	lyric: React.PropTypes.string.isRequired,
	curtTime: React.PropTypes.number.isRequired,
};

PlayingLyric.defaultProps = {
	lyric: '',
	curtTime: 0,
};

module.exports = PlayingLyric;