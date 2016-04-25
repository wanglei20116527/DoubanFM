const Url = require('url');
const Event = require('events');
const QueryString = require('querystring');

const RequestClient = require('../utils/RequestClient');

const BASE_URL = 'http://douban.fm/j/v2/playlist';

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

	init(){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	like(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.LIKE,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	unlike(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.UNLIKE,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	play(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.PLAY,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	skip(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.SKIP,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					this.setSong(data.song[0]);
					resolve(data.song[0]);
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	end(sid){
		return new Promise((resolve, reject)=>{
			let data = Object.assign(DEFAULT_PARAMETER, {
				type: MANIPULATE_TYPE.END,
				pb: PB,
				sid: sid
			});

			RequestClient.getJson(BASE_URL, data)

			.then((data)=>{
				if( data.r === 0 ){
					resolve();
				
				}else{
					reject(new Error(JSON.stringify(data)));
				}				
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}
}

window.Playlist = module.exports = new Playlist();