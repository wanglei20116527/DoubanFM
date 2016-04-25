const Http = require('http');
const Url = require('url');
const Event = require('events');
const QueryString = require('querystring');

const CaptchaStore = require('./captcha');

const ActionType = require('../constants/action-type');
const Dispatcher = require('../dispatchers/dispatcher');

const Cookie = require('../utils/cookie');
const RequestClient = require('../utils/request-client');

const TIMEOUT = 5000;
const LOGIN_URL = 'http://douban.fm/j/login';
const LOGOUT_BASE_URL = 'http://douban.fm/partner/logout?source=radio&ck=sTAN&no_login=y';

const SOURCE = 'radio';
const TASK = 'sync_channel_list';
const REMEMBER = 'on';

const EVENT = {
	LOGIN: 'login',
};

class User extends Event {
	constructor(...props){
		super(...props);

		[
		   'handle',
		   'addLoginListener',
		   'removeLoginListener',
		   'login',
		   'logout',
		   'getUserInfo',

		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});


		this.userInfo = null;

		this.dispatchToken = Dispatcher.register(this.handle);
	}

	handle(payload){
		switch(payload.type){

			case ActionType.LOGIN:
				let captcha = payload.text.captcha;
				let username = payload.text.username;
				let password = payload.text.password;
				let captchaId = CaptchaStore.getCaptchaId();
		
				this.login( username, password, captcha, captchaId )
				    .then((data)=>{
				    	// login success
				    	if(data.r == 0){
				    		this.userInfo = data.user_info;
				    		this.emit( EVENT.LOGIN, null, true, data.user_info);

				    	// login fail	
				    	}else{
				    		this.userInfo = null;
				    		this.emit( EVENT.LOGIN, null, false, data.err_msg);
				    	}
				    	
				    })
				    .catch((err)=>{
				    	this.userInfo = null;
				    	this.emit( EVENT.LOGIN, err );
				    });
				break;

			case ActionType.LOGOUT:
				break;
		}
	}

	getUserInfo(){
		return this.userInfo;
	}

	get(key){
		return this.userInfo[key] || null;
	}

	addLoginListener(fn){
		this.addListener( EVENT.LOGIN, fn );
	}

	removeLoginListener(fn){
		this.removeLoginListener( EVENT.LOGIN, fn );
	}

	login(username, password, captcha, captchaId){
		return new Promise((resolve, reject) => {
			const data = {
				task: TASK,
				source: SOURCE,
				remember: REMEMBER,
				alias: username,
				form_password: password,
				captcha_solution: captcha,
				captcha_id: captchaId

			};

			RequestClient.request(LOGIN_URL, data, "POST")

			.then((res)=>{
				let segs = [];

				res.on('error', (err) => {
					reject(err);
				});

				res.on('data', (data) => {
					segs.push(data);
				});

				res.on('end', () => {
					try{
						let buffer = Buffer.concat(segs);
						let result = JSON.parse(buffer.toString('utf8'));

						// 登陆成功保存用户的信息
						if(result.r == 0){
							this.userInfo = result['user_info'] || {};
						}

						resolve(result);

					}catch(e){
						reject(e);
					}
				});
			})

			.catch(reject);
		});
	}

	logout(){

	}
}

window.User = module.exports = new User();




