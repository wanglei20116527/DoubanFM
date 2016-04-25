const Url  = require('url');
const Http = require('http');
const QueryString = require('querystring');

const Cookie = require('./cookie');

const TIMEOUT = 10000;
const HOST = 'douban.fm';
const CONTENT_TYPE = 'application/x-www-form-urlencoded';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.86 Safari/537.36';

class RequestClient {
	getJson(url, data={}, method='GET', options={}){
		return new Promise((resolve, reject)=>{
			this.request(url, data, method, options)

			.then((res)=>{
				res.on('error', (e)=>{
					reject(e);
				});

				let segs = [];

				res.on('data', (buf)=>{
					segs.push(buf);
				});

				res.on('end', ()=>{
					try{
						let buffer = Buffer.concat(segs);
						let json   = buffer.toString('utf8');
						let data   = JSON.parse(json);

						resolve(data);
					}catch(e){
						reject(e);
					}
				});
			})

			.catch((e)=>{
				reject(e);
			});
		});
	}

	request(url, data={}, method='GET', options={}){
		data = QueryString.stringify(data);

		if( method == "GET" ){
			url = `${url}?${data}`;
		}

		return new Promise((resolve, reject)=>{
			let headers = {
				'Host': HOST,
				'User-Agent': USER_AGENT,
				'Cookie': Cookie.stringify( Cookie.getCookie() ),
			};

			if( method == 'POST' ){
				headers['Content-Type'] = CONTENT_TYPE;
				headers['Content-Length'] = data.length;
			}

			let options = Object.assign({
				method: method,
				headers: headers,

			}, Url.parse(url), options);

			let req = Http.request(options, (res)=>{
				Cookie.mergeWithIncomingMsg(res);

				resolve(res);
			});

			req.on('error', (e)=>{
				reject(e);
			});

			req.on('checkExpectation', (e)=>{
				reject(e);
			});

			req.setTimeout(TIMEOUT, ()=>{
				reject(new Error(`request json ${url} timeout`));
			});

			method == "POST" ? req.end(data) : req.end(); 
		});
	}
}

module.exports = new RequestClient();