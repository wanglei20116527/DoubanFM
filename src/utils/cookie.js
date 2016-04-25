const Path = require('path');

const Fs = require('./fs');
const Type = require('./type');
const Scheduler = require('./scheduler');

const COOKIE_FILE_PATH = Path.resolve(__dirname, '../../data/cookie.json');

class Cookie {
	constructor(...props){
		this._cookie = {};
	}

	init(){
		let task = (function *(){
			let isExist = yield Fs.exists(COOKIE_FILE_PATH);
			if( !isExist ){
				yield this._initCookieFile();
			}

			let localCookie  = yield this._restoreFromFile(COOKIE_FILE_PATH);

			this.merge(localCookie);

		}.bind(this))();

		return new Promise((resolve, reject)=>{
			Scheduler(task)

			.then(()=>{
				resolve();
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	_initCookieFile(){
		let task = (function * (){
			yield Fs.mkFile(COOKIE_FILE_PATH);

			yield this._persistToFile({}, COOKIE_FILE_PATH);

		}.bind(this))();

		return new Promise((resolve, reject)=>{
			Scheduler(task)

			.then(()=>{
				resolve();
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	_persistToFile(cookie, filePath){
		return new Promise((resolve, reject)=>{
			try{
				Fs.writeFile(filePath, JSON.stringify(cookie), {
					encoding: 'utf8'
				})

				.then(()=>{
					resolve();
				})

				.catch((e)=>{
					reject(e);
				});

			}catch(e){
				reject(e);
			}
		});
	}

	_restoreFromFile(filePath){
		return new Promise((resolve, reject)=>{
			Fs.readFile(filePath, {
				encoding: 'utf8'
			})

			.then((json)=>{
				try{
					resolve(JSON.parse(json));

				}catch(e){
					reject(e);
				}
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	merge(cookie){
		this._cookie = Object.assign(this._cookie || {}, cookie || {});
	}

	mergeWithIncomingMsg(incomingMsg){
		let setCookies = incomingMsg.headers['set-cookie'];

		if( !Type.isStr(setCookies) && !Type.isArray(setCookies) ){
			console.warn(`mergeWithIncomingMsg: ${setCookies} type is not str and array`);
			return;
		}

		console.log(`set-cookie: ${setCookies}`);

		this.merge( this.parse(setCookies) );
	}

	get(name){
		return this._cookie[name];
	}

	set(name, value){
		this._cookie[name] = value;
	}

	delete(name){
		delete this._cookie[name];
	}

	getCookie(){
		return this._cookie;
	}

	stringify(cookie){
		let str = '';

		Object.keys(cookie).forEach((key)=>{
			str += `${key}=${cookie[key]};`;
		});

		console.log(`cookie stringified is ${str}`);

		return str;
	}

	parse(cookieStrs){
		if( !Type.isStr(cookieStrs) && !Type.isArray(cookieStrs) ){
			throw new Error('arguments type is invalid');
		}

		if( Type.isStr(cookieStrs) ){
			cookieStrs = [cookieStrs];
		}

		let tmpCookie = {};
		let reg = /;?\s*([^;=]+)=([^;=]*);?/g;
		
		cookieStrs.forEach((cookieStr)=>{
			let matched;

			while( ( matched = reg.exec(cookieStr) ) != null ){
				tmpCookie[ matched[1] ] = matched[2];
			}
		});

		return tmpCookie;
	}

	persist(){
		return this._persistToFile(COOKIE_FILE_PATH);
	}
}

window.Cookie = module.exports = new Cookie();




