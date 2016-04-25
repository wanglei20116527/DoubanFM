const UserStore = require('../stores/user');

const Type = require('../constants/action-type');
const Dispatcher = require('../dispatchers/dispatcher');

class UserAction {
	static login(username, password, captcha){
		Dispatcher.dispatch({
			type: Type.LOGIN,
			text: {
				username: username, 
				password: password,
				captcha: captcha
			}
		});
	}
}

module.exports = UserAction;