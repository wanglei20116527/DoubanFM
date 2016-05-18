const React = require('react');
const ReactDOM = require('react-dom');

const Decorators = require('core-decorators');
const autobind = Decorators.autobind;

const Player = require('./red-heart-player');
const LoadingPage = require('./loading-page');
const PlayingSongList = require('./playing-songlist');

const Playlist = require('../stores/playlist');

class RedHeartPage extends React.Component {
	constructor(...props){
		super(...props);

		this.state = {
			title: '我的红心歌曲',
			loaded: true,
			song: {
				aid: "2997220",
				album: "/subject/2997220/",
				albumtitle: "Kameo: Elements of Power",
				alert_msg: "",
				artist: "Steve Burke",
				file_ext:"mp3",
				kbps: "128",
				length: 198,
				picture: "http://img3.doubanio.com/lpic/s9063317.jpg",
				public_time: "2005",
				sha256: "5c67e4da7b83438283cc6e2f21df6ebbfb4640e107163cd0eaa6e52e22bc1129",
				sid: "1808097",
				ssid: "bf26",
				status:0,
				subtype:"U",
				title: "Hero's Theme",
				url:"http://mr7.doubanio.com/2b8891ff4f791bb28e1038778fecc24a/0/fm/song/p1808097_128k.mp3",
				lyric: '',
			},
			songs: [
			   {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   }, {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			    {
			   	   title: "Hero's Theme",
			   	   artist: "Steve Burke",
			   },
			],
		};
	}

	componentDidMount(){
		// Playlist.fetchRedHeartPlaylist()

		// .then((songs)=>{
		// 	this.setState({
		// 		loaded: true,
		// 		songs: songs,
		// 	});
		// })

		// .catch(console.error);

		Playlist.loadLyric('1808097', 'bf26')

		.then((data)=>{
			const lyric = data.lyric;

			const song = Object.assign({}, this.state.song, {
				lyric: lyric
			});

			this.setState({
				song: song
			});
		})

		.catch(console.error);
	}

	@autobind
	_getLoadingPage(){
		return (
			<LoadingPage />
		);
	}

	@autobind
	_getContent(){
		const {
			title,
			songs,
			song,

		} = this.state;

		return (
			<div 
			   className='content-area'>

			   <div className='header'></div>

			   <div className='body'>
			      <div className='playing-songlist-wrapper'>
			        
			      </div>

			      <div 
			         className='player-wrapper'>
			         <div 
			            className='bg'>
			         </div>

			         <div 
			            className='player-inner-wrapper'>
			            <Player 
			               song={song}
			            />
			         </div>
			      </div>
			      
			   </div>
			</div>
		);
	}

	render(){
		const {
			loaded,

		} = this.state;

		const content = loaded ? this._getContent() : this._getLoadingPage();

		return(
		   <div 
		      className='red-heart-page'>

		      {content}
		   </div>
		);
	}
}

module.exports = RedHeartPage;


 // <PlayingSongList
	// 		            title={title} 
	// 		            songs={songs}
	// 		            playing={3}
	// 		         />