const CaptchaStore = require('../stores/captcha');

const Type = require('../constants/action-type');
const Dispatcher = require('../dispatchers/dispatcher');

class CaptchaAction {
	static refresh(){
		Dispatcher.dispatch({
			type: Type.REFRESH_CAPTCHA
		});
	}
}

module.exports = CaptchaAction;