const Cache = require('./cache');

class Lyric {

	isValid(lyric){
		return /\[[\s\S]+\]/.test(lyric);
	}

	parse(lyric){
		const cache = Cache.get(lyric);

		if( cache ){
			return cache;
		}

		let hashmap = [];

		let frags = lyric.split(/[\r\n]/).filter((frag)=>{
			return !!frag;
		});

		let isValid = this.isValid(lyric);

		if( !isValid ){
			hashmap = frags;

		} else {
			const regexp  = /\[(\d+):(\d+)\.\d+\]([\s\S]+)/;
		
			for(let i = 0, len = frags.length; i < len; ++i){
				let frag = frags[i];
				let ret = regexp.exec(frag);

				if( ret ){
					let mins = parseInt(ret[1]);
					let secs = parseInt(ret[2]);

					let time    = mins * 60 + secs;
					let content = ret[3];

					hashmap.push([
						time,
						content
					]);
				}
			}
		}

		Cache.put(lyric, hashmap);

		return hashmap;
	}
}

module.exports = new Lyric();