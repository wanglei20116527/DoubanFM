require("babel-polyfill");

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const HashHistory = ReactRouter.hashHistory; 

const App = require('./lib/app');

const Cookie = require('./lib/utils/cookie');



Cookie.init()

.then(()=>{

	ReactDOM.render(
		<Router history={ HashHistory }>
			<Route path='/' component={App}>

			</Route>
		</Router>,

		document.getElementById('app')
	);

})

.catch((e)=>{
	console.error(e);
});




