const Url = require('url');
const Event = require('events');
const QueryString = require('querystring');

const RequestClient = require('../utils/request-client');

const UserStore = require('./user');

const LYRIC_URL = 'http://douban.fm/j/v2/lyric';
const PLAYLIST_BASE_URL = 'http://douban.fm/j/v2/playlist';
const RED_HEART_PLAYLIST = 'http://douban.fm/j/v2/redheart/songs';
const RED_HEART_PLAYLIST_BASIC = 'http://douban.fm/j/v2/redheart/basic';

const MANIPULATE_TYPE = {
	NEW: 'n',
	PLAY: 'p',
	SKIP: 's',
	END: 'e',
	LIKE: 'r',
	UNLIKE: 'u'
};

const DEFAULT_PARAMETER = {
	channel: 0,
	kbps: 192,
	client: 's:mainsite|y:3.0',
	app_name: 'radio_website',
	version: 100,
	type: MANIPULATE_TYPE.NEW
};

const PB = 128;

class Playlist extends Event {
	constructor(...props){
		super(...props);

		this._song = null;
	}

	setSong(song){
		this._song = song;
	}

	getSong(song){
		return this._song || null;
	}

	fetchBasicRedHeartPlaylist(){
		return new Promise((resolve, reject)=>{
			try{
				const url = RED_HEART_PLAYLIST_BASIC;

				RequestClient.getJson(url)

				.then((data)=>{
					console.log(data);
					resolve(data);
				})

				.catch(reject);

			}catch(e){
				reject(e);
			};
		});
	}

	fetchRedHeartPlaylist(){
		return new Promise((resolve, reject)=>{
			this.fetchBasicRedHeartPlaylist()

			.then((data)=>{
				console.log(data);
				const sids = (data.songs || []).map((song)=>{
					return song.sid; 
				});

				const params = {
					'sids': sids.join('|'),
					'ck': UserStore.get('ck'),
					'kbps': DEFAULT_PARAMETER.kbps,
				};

				RequestClient.getJson(RED_HEART_PLAYLIST, params, "POST")

				.then((data)=>{
					resolve(data);
				})

				.catch(reject);

			})

			.catch(reject);
		});
	}

	init(){
		return new Promise((resolve, reject)=>{
			const params = Object.assign({}, DEFAULT_PARAMETER);

			RequestClient.getJson(PLAYLIST_BASE_URL, params)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}

	loadLyric(sid, ssid){
		return new Promise((resolve, reject)=>{
			try{
				const params = {
					sid: sid,
					ssid: ssid,
				};

				RequestClient.getJson(LYRIC_URL, params)

				.then((data)=>{
					resolve(data);
				})

				.catch(reject);

			}catch(e){
				reject(e);
			}
		});
	}

	like(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.LIKE,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(PLAYLIST_BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}

	unlike(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.UNLIKE,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(PLAYLIST_BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}

	play(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.PLAY,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(PLAYLIST_BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}

	skip(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.SKIP,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(PLAYLIST_BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}

	end(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.END,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(PLAYLIST_BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					resolve();
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch(reject);
		});
	}
}

window.Playlist = module.exports = new Playlist();