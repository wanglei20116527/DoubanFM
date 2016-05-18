class Cache {
	constructor(){
		this._cache = {};
	}

	get(key){
		return this._cache[key] || null;
	}

	put(key, value){
		this._cache[key] = value;

		return this;
	}

	delete(key){
		delete this._cache[key];

		return this;
	}
}

module.exports = new Cache();