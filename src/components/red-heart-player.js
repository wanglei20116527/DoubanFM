const React = require('react');
const ReactDOM = require('react-dom');

const PlayButton = require('./play-button');
const LyricButton = require('./lyric-button');
const DownloadButton = require('./download-button');
const PrevButton = require('./previous-button');
const NextButton = require('./next-button');
const PlayModeButton = require('./play-mode-button');
const Progress = require('./progress');
const VolumeSlider = require('./volume-slider');
const BrustHeartButton = require('./brust-heart-button');
const PlayingLyric = require('./playing-lyric');

const autobind = require('core-decorators').autobind;

const PLAY_STATE = {
	PLAYING: 0,
	PAUSE: 1,
};

const DefaultProgress = {
	width: 440,
	total: 1,
	curt: 0,
	totalBytes: 1,
	curtBytes: 0,
};

class RedHeartPlayer extends React.Component {
	constructor(...props){
		super(...props);

		this._updatePlayerCurtTime = false;

		this.state = {
			volume: 1,
			curtTime: 0,
			totalBytes: 1,
			curtBytes: 0,
			playState: PLAY_STATE.PAUSE,
		};
	}

	componentWillReceiveProps(nextProps){
		const {
			song ,
			playButton, 

		} = nextProps;

		const {
			playState,

		} = playButton;

		const curtSong =this._getSong();

		if( curtSong.sid === song.sid ){
			return;
		}

		const totalBytes = song.length || 1;
		
		this.setState({
			playState: playState,
			totalBytes: totalBytes
		});
	}

	componentDidMount(){
		this._updatePlayer();

		const {
			song , 
			playButton,

		} = this.props;

		const {
			playState,

		} = playButton;

		const totalBytes = song.length || 1;

		this.setState({
			totalBytes: totalBytes,
			playState: playState,
		});
	}

	componentDidUpdate(prevProps, prevState){
		this._updatePlayer();

		this._updatePlayerCurtTime = false;
	}

	@autobind
	_updatePlayer(){
		const {
			volume,
			curtTime,

		} = this.state;

		const updatePlayerCurtTime = this._updatePlayerCurtTime;

		let isAudioFile = this._isAudioFile() 
		  , isPlaying   = this._isPlaying()
		  , $player     = this._getCurtPlayer();

		isAudioFile ? this._resetVideoPlayer()
		            : this._resetAudioPlayer();

		$player.volume = volume;

		isPlaying ? $player.play() : $player.pause();

		updatePlayerCurtTime && ($player.currentTime = curtTime);
	}

	@autobind
	_getCurtPlayer(){
		return this._isAudioFile() ? this._getAudioPlayer() 
		 						   : this._getVideoPlayer();
	}

	@autobind
	_getAudioPlayer(){
		return ReactDOM.findDOMNode(this.refs.audio);
	}

	@autobind
	_getVideoPlayer(){
		return ReactDOM.findDOMNode(this.refs.video);
	}

	@autobind
	_resetAudioPlayer(){
		this._getAudioPlayer().removeAttribute('src');
	}

	@autobind
	_resetVideoPlayer(){
		this._getVideoPlayer().removeAttribute('src');
	}

	@autobind
	_isAudioFile(){
		const {
			file_ext

		} = this._getSong();

		return !!~['mp3'].indexOf(file_ext);
	}

	@autobind
	_getTitle(){
		const title = this.props.title || '';

		return (
			<h1 
			   className='title'>
		       {title}
		    </h1>
		);
	}

	@autobind
	_onPictureMetaDataLoaded(){
		const $img = ReactDOM.findDOMNode(this.refs.picture);

		const width  = $img.width;
		const height = $img.height;

		if( width > height ){
			$img.style.maxHeight = '100%';

		}else{
			$img.style.maxWidth  = '100%';
		}
	}

	@autobind
	_getPicture(){
		const {
			picture ,

		} = this._getSong();

		const {
			showLyric,

		} = this.props;

		let className = ['img'];
		if( showLyric ){
			className.push('blur');
		}
		className = className.join(' ');

		return (
			<div
			   className='picture'>
			   <img
			      ref='picture'
		          className={className} 
		          src={picture}
		          onLoad={this._onPictureMetaDataLoaded}
		       />
			</div>
			
		);
	}

	@autobind
	_getSong(){
		return this.props.song || {};
	}

	@autobind
	_getSongTitle(){
		const title = this._getSong()['title'] || '';

		return (
		   	<h2 
		       className='song-title'>
		       {title}
		    </h2>
		);
	}

	@autobind
	_getArtist(){
		const artist = this._getSong()['artist'] || '';

		return (
			<span 
		       className='artist'>
		       {artist}
		    </span>
		);
	}

	@autobind
	_getCurtTime(){
		return this.state.curtTime || 0;
	}

	@autobind
	_getTotalTime(){
		return this._getSong()['length'] || 1;
	}

	@autobind
	_getLeftTime(){
		const song      = this._getSong()
		    , totalTime = this._getTotalTime()
		    , curtTime  = this._getCurtTime();

		let leftTime = totalTime - curtTime;

		return leftTime < 0 ? 0 : leftTime;
	}

	@autobind
	_formatTime(time){
		let date = new Date(time * 1000);

		let mins = date.getMinutes();
		let secs = date.getSeconds();

		let str = '-';
		str += mins >= 10 ? mins : `0${mins}`;
		str += ":"; 
		str += secs >= 10 ? secs : `0${secs}`;

		return str;
	}

	@autobind
	_getTime(){
		const leftTime = this._getLeftTime();
		const formatedTime = this._formatTime(leftTime);

		return (
			<span 
		       className='time'>
		       {formatedTime}
		    </span>
		);
	}

	@autobind
	_getPlayButtonParams(){
		const {
			playButton,

		} = this.props;

		const playState = this._getPlayState();

		return Object.assign({}, playButton, {
			playState: playState,
		});
	}

	@autobind
	_getPlayState(){
		return this.state.playState;
	}

	@autobind
	_isPlaying(){
		return this._getPlayState() === PLAY_STATE.PLAYING;
	}

	@autobind
	_onPlayStateChange(){
		const {
			onClick,
		
		} = this._getPlayButtonParams();

		const {
			PAUSE,
			PLAYING,

		} = PLAY_STATE;

		const curtState = this._getPlayState();

		const nextState = curtState === PAUSE ? PLAYING : PAUSE;

		this.setState({
			playState: nextState,
		});

		onClick && onClick(nextState);

		console.log('_onPlayStateChange');
	}

	@autobind
	_getPlayButton(){
		const isPlaying = this._isPlaying();

		return (
			<PlayButton 
		       playing={isPlaying}
		       onClick={this._onPlayStateChange}>
		    </PlayButton>
		);
	}

	@autobind
	_onProgressChange(percent){
		const totalTime = this._getTotalTime();
		const curtTime  = totalTime * percent;

		this.setState({
			curtTime: curtTime
		});

		this._updatePlayerCurtTime = true;

		console.log('_onProgressChange');
	}

	@autobind
	_getProgress(){
		const {
			curtTime,
			totalBytes,
			curtBytes,

		} = this.state;
		
		const totalTime = this._getTotalTime();
		const onChange  = this._onProgressChange;

		const params = Object.assign({}, DefaultProgress, {
			total: totalTime,
			curt: curtTime,
			totalBytes: totalBytes,
			curtBytes: curtBytes,
			onChange: onChange
		});


		return (
			<Progress {...params} />
		);
	}

	@autobind
	_getVolume(){
		return this.state.volume;
	}

	@autobind
	_onVolumeChange(percent){
		const volume = percent;

		this.setState({
			volume: volume,
		});

		console.log('_onVolumeChange');
	}

	@autobind
	_getVolumeSlider(){
		const {
			volume,

		} = this.state;

		const onChange = this._onVolumeChange;

		const params = {
			volume: volume,
			onChange: onChange,
		};

		return (
			<VolumeSlider {...params} />
		);
	}

	@autobind
	_onLyricButtonClick(e){
		const {
			onClick ,

		} = this.props.lyricButton || {};

		onClick && onClick(e);

		console.log('_onLyricButtonClick');
	}

	@autobind
	_getLyricButton(){	
		return (
			<LyricButton 
			   onClick={this._onLyricButtonClick}>
			</LyricButton>
		);
	}

	@autobind
	_onDownloadButtonClick(e){
		const {
			onClick,

		} = this.props.downloadButton || {};

		onClick && onClick(e);

		console.log('_onDownloadButtonClick');
	}

	@autobind
	_getDownloadButton(){
		return (
			<DownloadButton
			   onClick={this._onDownloadButtonClick}>
			</DownloadButton>
		);
	}

	@autobind
	_getBrustHeartButtonParams(){
		return this.props.brustHeartButton || {};
	}

	@autobind
	_onBrustHeartButtonClick(e){
		console.log(this);
		const {
			onClick,

		} = this._getBrustHeartButtonParams();

		onClick && onClick(e);

		console.log('_onBrustHeartButtonClick');
	}

	@autobind
	_getBrustHeartButton(){
		const params = this._getBrustHeartButtonParams();

		return (
			<BrustHeartButton 
		       {...params}
		       onClick={this._onBrustHeartButtonClick}>
		    </BrustHeartButton>
		);
	}

	@autobind
	_onPrevButtonClick(e){
		const {
			onClick,

		} = this.props.prevButton || {};

		onClick && onClick(e);

		console.log('_onPrevButtonClick');
	}	

	@autobind
	_getPrevButton(){
		return (
			<PrevButton
			   onClick={this._onPrevButtonClick}>
			</PrevButton>
		);
	}

	@autobind
	_onNextButtonClick(e){
		const {
			onClick,

		} = this.props.nextButton || {};

		onClick && onClick(e);

		console.log('_getNextButtonClick');
	}

	@autobind
	_getNextButton(){
		return (
			<NextButton
			   onClick={this._onNextButtonClick}>
			</NextButton>
		);
	}

	@autobind
	_getPlayModeButtonParams(){
		return this.props.playModeButton || {};
	}

	@autobind
	_onPlayModeButtonClick(e){
		const {
			onClick,

		} = this._getPlayModeButtonParams();

		onClick && onClick(e);	

		console.log('_onPlayModeButtonClick');
	}

	@autobind
	_getPlayModeButton(){
		const params = this._getPlayModeButtonParams();

		return (
			<PlayModeButton
			   {...params}
			   onClick={this._onPlayModeButtonClick}>
			</PlayModeButton>
		);
	}

	@autobind
	_getPlayingLyric(){
		const {
			showLyric,

		} = this.props;

		if( !showLyric ){
			return null;
		}

		const {
			lyric,

		} = this._getSong();

		const curtTime = this._getCurtTime();

		const params = {
			lyric: lyric,
			curtTime: curtTime,
		};

		return (
			<PlayingLyric {...params} />
		);
	}

	@autobind
	_onProgress(){
		const $player = this._getCurtPlayer();

		const buffered = $player.buffered;
		const len = buffered.length;

		const curtBytes = buffered.end(len -1);

		this.setState({
			curtBytes: curtBytes
		});
	}

	@autobind
	_onEnded(){
		const {
			onEnd,

		} = this.props;

		const playState = PLAY_STATE.PAUSE;

		this.setState({
			playState: playState,
		});

		onEnd && onEnd();

		console.log('_onEnded');
	}

	@autobind
	_onTimeUpdate(){
		const $player = this._getCurtPlayer();

		const curtTime = $player.currentTime;

		this.setState({
			curtTime: curtTime,
		});

		this._updatePlayerCurtTime = false;
	}

	render(){

		const title         = this._getTitle();
		const songTitle     = this._getSongTitle();
		const artist        = this._getArtist();
		const time          = this._getTime();
		const PlayButton    = this._getPlayButton();
		const progress      = this._getProgress();
		const volumeSlider  = this._getVolumeSlider(); 
		const lyricBtn      = this._getLyricButton();
		const downloadBtn   = this._getDownloadButton();
		const brustHeartBtn = this._getBrustHeartButton();
		const prevBtn       = this._getPrevButton();
		const nextBtn       = this._getNextButton();
		const playModeBtn   = this._getPlayModeButton();
		const picture       = this._getPicture();
		const playingLyric  = this._getPlayingLyric();

		return (
		   <div className='red-heart-player clearfix'>
		      
		      <div className='float-left playing-info'>
		         
		         {title}
		         {songTitle}
		         
		         <div className='song-subtitle clearfix'>
		    
		            {artist}

		            <div className='float-right'>		  
		               {time}
		               {PlayButton}
		            </div>
		            
		         </div>


		         <div className='progress-wrapper'>
		            {progress}
		         </div>

		         <div className='below-progress'>

		            <span className='icon-btn-wrapper'>
		               {volumeSlider}
		            </span>
		    
		            <span className='icon-btn-wrapper'>
		               {lyricBtn}
		            </span> 

		            <span className='icon-btn-wrapper'>
		               {downloadBtn}
		            </span>        	

		         </div>

		         <div className='playing-controls'>
		            
		            <span className='icon-btn-wrapper brust-heart-btn-wrapper'>
		               {brustHeartBtn}
		            </span>

		            <span className='icon-btn-wrapper'>
		               {prevBtn}
		            </span>

		            <span className='icon-btn-wrapper'>
		               {nextBtn}
		            </span>
		            
		            <span className='icon-btn-wrapper'>
		              {playModeBtn}
		            </span>

		         </div>

		      </div>

		      <div className='float-left playing-other'>
		         <div className='inner-wrapper'>
		            {picture}
		        
		            <div className='lyrics'>
		               {playingLyric}
		            </div>
		         </div>
		      </div>

		      <audio
		         ref='audio' 
		         className='hide'
		         loop={false}
		         src={this._getSong()['url']}
		         volume={this._getVolume()}
		         onEnded={this._onEnded}
		         onProgress={this._onProgress}
		         onTimeUpdate={this._onTimeUpdate}>
		      </audio>

		      <video
		         ref='video' 
		         className='hide'
		         loop={false}
		         src={this._getSong()['url']}
		         volume={this._getVolume()}
		         onEnded={this._onEnded}
		         onProgress={this._onProgress}
		         onTimeUpdate={this._onTimeUpdate}>
		      </video>
		   </div>
		);
	}
}

RedHeartPlayer.propTypes = {
	song: React.PropTypes.object,
	title: React.PropTypes.string,
	showLyric: React.PropTypes.bool,
	playButton: React.PropTypes.object,
	progress: React.PropTypes.object,
	volume: React.PropTypes.object,
};

RedHeartPlayer.defaultProps = {
	title: '豆瓣音乐电台',

	showLyric: true,

	playButton: {
		playState: PLAY_STATE.PAUSE,
	},

	lyricButton: {
	},

	progress: {
		width: 400,
		total: 200,
		curt: 100,
		totalBytes: 400,
		curtBytes: 300,
	},
}

module.exports = RedHeartPlayer;

