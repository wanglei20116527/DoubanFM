const React = require('react');

const Text = require('./text');
const Button = require('./button');

class LoginIntroPane extends React.Component {
	render(){
		let className = [
		   'login-intro-pane',
		   this.props.className || '',

		].join(' ');

		return (
			<div
			   {...this.props} 
			   className={className}>

			   <div className='bg'></div>
			   
			   <div
			      className='content-area'>

			      <h1 className='title'>欢迎</h1>

			      <h1 className='logo'>Douban FM</h1>

			      <p className='intro'>但是激发科技手段落后方式带来发挥了速度恢复计划的顺利繁华的身份行家里手电话费三大纪律风华绝代时间浪费很多时间恢复健康后打算离开合肥检定考试就浪费很多时间和法律界和电视剧风华绝代路上风景
			      </p>

			      <Button
			         className='register-btn'>
			         <Text text='注册'/>
			      </Button>
			   </div>
			</div>
		);
	}
}

module.exports = LoginIntroPane;