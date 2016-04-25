const Http = require('http');
const Url = require('url');
const Event = require('events');
const QueryString = require('querystring');

const Cookie = require('../utils/cookie');

const UserStore = require('./user');

const TIMEOUT = 5000;
const HOST = 'douban.fm';
const CONTENT_TYPE = 'application/x-www-form-urlencoded';

const RED_HEART_BASIC_INFO_URL  = 'http://douban.fm/j/v2/redheart/basic';
const RED_HEART_DETAIL_INFO_URL = 'http://douban.fm/j/v2/redheart/songs';

class Music extends Event {
	constructor(...props){
		super(...props);

		this._redHeartMusicBasicInfo  = {};
		this._redHeartMusicDetailInfo = {};
	}

	fetchRedHeartMusicBasicInfo(){
		return new Promise((resolve, reject)=>{
			let options = Object.assign({}, Url.parse(RED_HEART_BASIC_INFO_URL), {
				'method': 'GET',
				'headers': {
					'Host': HOST,
					'Cookie': Cookie.stringify( Cookie.getCookie() )
				}
			});

			let req = Http.get(options, (res)=>{
				Cookie.mergeWithIncomingMsg(res);

				let segs = [];

				res.on('data', (data)=>{
					segs.push(data);
				});

				res.on('end', ()=>{
					try{
						let json = Buffer.concat(segs).toString('utf8');
						let info = JSON.parse(json);

						this._redHeartMusicBasicInfo = info;

						resolve(info);

					}catch(e){
						reject(e);
					}
				});

				res.on('error', (e)=>{
					reject(e);
				});
			});

			req.on('error', (e)=>{
				reject(e);
			});

			req.on('checkExpectation', (e)=>{
				reject(e);
			});

			req.setTimeout(TIMEOUT, ()=>{
				reject(new Error('fetch red heart music basic info from server timeout'));
			});

			req.end();
		});
	}

	fetchRedHeartMusicDetailInfo(){
		return new Promise((resolve, reject)=>{
			let songs = this._redHeartMusicBasicInfo.songs || [];

			let sids = songs.map((song)=>{
				return song.sid;
			});

			let submitData = QueryString.stringify({
				'kbps': 192,
				'sids': sids.join('|'),
				'ck': UserStore.get('ck')
			});

			let options = Object.assign({
				'method': "POST",
				'headers': {
					'Host': HOST,	
					'Content-Type': CONTENT_TYPE,
					'Content-Length': submitData.length,
					'Cookie': Cookie.stringify(Cookie.getCookie())
				}

			}, Url.parse(RED_HEART_DETAIL_INFO_URL) );

			let req = Http.request(options, (res)=>{
				Cookie.mergeWithIncomingMsg(res);

				let segs = [];

				res.on('data', (data)=>{
					segs.push(data);
				});

				res.on('end', ()=>{
					try{
						let json = Buffer.concat(segs).toString('utf8');
						let info = JSON.parse(json);

						this._redHeartMusicDetailInfo = info;

						resolve(info);

					}catch(e){
						reject(e);
					}
				});

				res.on('error', (e)=>{
					reject(e);
				});
			});

			req.on('error', (e)=>{
				reject(e);
			});

			req.on('checkExpectation', (e)=>{
				reject(e);
			});

			req.setTimeout(TIMEOUT, ()=>{
				reject(new Error('fetch red heart music detail info from server timeout'));
			});

			req.end(submitData);
		});
	}
}

window.Music = module.exports = new Music();














