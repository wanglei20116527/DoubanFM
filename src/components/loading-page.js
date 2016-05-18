const React = require('react');

class LoadingPage extends React.Component {
	render(){
		return (
			<div
			   className='loading-page'>
			   <p className='prompt'>页面加载中...</p>
			</div>
		);
	}
}

module.exports = LoadingPage;