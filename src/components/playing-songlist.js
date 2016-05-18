const React = require('react');
const ReactDOM = require('react-dom');

const autobind = require('core-decorators').autobind;

const PS = require('perfect-scrollbar');

class PlayingSongList extends React.Component {
	componentDidMount(){
		PS.initialize(ReactDOM.findDOMNode(this.refs.container));
	}

	componentWillUnmount(){
		PS.destroy(ReactDOM.findDOMNode(this.refs.container));
	}

	@autobind
	_onClick(e){
		if(!this.props.onChange){
			return;
		}
	}

	render(){
		const {
			title,
			songs,
			playing,

		} = this.props;

		const songItems = songs.map((song, i)=>{
			let className = [
				'item',
			];
			playing === i && className.push('playing');

			className = className.join(' ');

			const {
				title,
				artist,
				
			} = song;

			const content = `${i}. ${title} - ${artist}fgdf gd fhk ghdfk hgkdf`;

			return (
				<li
				   key={i}
				   data-index={i}
				   className={className}
				   onClick={this._onClick}>
					
				   <span 
				      className='content'>
				      {content}
				   </span>
				</li>
			);
		});

		return (
			<div
			   className='playing-songlist'>
			   <div
			      ref='container' 
			      className='container'>
			      <h1 
			         className='title'>
			         {title}
			      </h1>

			      <ol>
			         {songItems}
			      </ol>
			   </div>
			</div>
		);
	}
}


PlayingSongList.propTypes = {
	title: React.PropTypes.string,
	songs: React.PropTypes.array,
	playing: React.PropTypes.number,
	onChange: React.PropTypes.func,
};

PlayingSongList.defaultProps = {
	title: '',
	songs: [],
	playing: 0,
};

module.exports = PlayingSongList;