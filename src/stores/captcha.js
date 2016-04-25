const Url = require('url');
const Http = require('http');
const Event = require('events');

const Cookie = require('../utils/cookie');

const ActionType = require('../constants/action-type');
const Dispatcher = require('../dispatchers/dispatcher');

const TIMEOUT = 5000;
const CAPTCHA_BASE_URL = 'http://douban.fm/misc/captcha?size=m&id=';
const CAPTCHA_ID_URL = 'http://douban.fm/j/new_captcha';

const Events = {
	CAPTCHA_CHANGE: 'newCaptcha',
};

class Captcha extends Event {
	constructor(...props){
		super(...props);

		this.captcha = null;

		this.init();

		this.dispatchToken = Dispatcher.register(this.handle);
	}

	init(){
		[
		   'handle',
		   'getCaptchaId',
		   'getCaptchaUrl',
		   'refreshCaptcha',
		   'getCaptchaFromServer',
		   'addCaptchaChangedListenter',
		   'removeCaptchaChangedListenter',

		].forEach((func)=>{
			this[func] = this[func].bind(this);
		});
	}

	handle(payload){
		switch(payload.type){

			case ActionType.REFRESH_CAPTCHA:
				this.refreshCaptcha();
				break;
		}
	}

	addCaptchaChangedListenter(fn){
		this.addListener( Events.CAPTCHA_CHANGE, fn );
	}

	removeCaptchaChangedListenter(fn){
		this.removeListener( Events.CAPTCHA_CHANGE, fn );
	}

	getCaptchaId(){
		return this.captcha;
	}

	getCaptchaUrl(captchaId){
		return !!captchaId ? `${CAPTCHA_BASE_URL}${captchaId}` : null;
	}

	refreshCaptcha(){
		this.getCaptchaFromServer()
		    .then( (captcha)=>{
			   this.captcha = captcha;
			   this.emit(Events.CAPTCHA_CHANGE, void 0, captcha);

		    })
		    .catch( (err)=>{
			   this.captcha = null;
			   this.emit(Events.CAPTCHA_CHANGE, err);
			});
	}

	getCaptchaFromServer(){
		return new Promise(function(resolve, reject){
			let options = Object.assign({}, Url.parse(CAPTCHA_ID_URL), {
				'Cookie': Cookie.stringify( Cookie.getCookie() )
			});

			let req = Http.get(options);

			req.on('response', (res) => {
				Cookie.mergeWithIncomingMsg(res);

				let segments = [];

				res.on('error', (err) => {
					reject(err);
				});

				res.on('data', (data) => {
					segments.push(data);
				});

				res.on('end', () => {
					resolve( JSON.parse(Buffer.concat(segments).toString('utf8')) );
				});
			});

			req.on('error', (err) => {
				reject(err);
			});

			req.setTimeout(TIMEOUT, () => {
				reject(new Error('request captcha code timeout'));
			});
		});
	}
}

window.Captcha = module.exports = new Captcha();


