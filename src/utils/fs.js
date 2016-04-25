const fs = require('fs');
const path = require('path');

class FS {

	static exists(path) {
		return new Promise((resolve, reject)=>{
			try{
				fs.access(path, fs.F_OK, (err)=>{
					resolve(!err);
				});
			}catch(e){
				reject(e);
			}
		});
	}

	static mkFile(filename, options){
		options = Object.assign({
			autoClose: true

		}, options || {});

		return new Promise((resolve, reject)=>{
			try{
				fs.open(path.resolve(__dirname, filename), 'w', (err, fd)=>{
					if(err){
						reject(err);
						return;
					}

					if(!options.autoClose){
						resolve(fd);
						return;
					}

					this.close(fd).then(resolve, reject);
				});

			}catch(e){
				reject(e);
			}
		});
	}

	static mkdir(path, mode){
		mode = mode || 0o777;

		return new Promise((resolve, reject)=>{
			try{
				fs.mkdir(path, mode, (err)=>{
					if(err){
						reject(err);
						return;
					}

					resolve();
				});

			}catch(e){
				reject(e);
			}
			
		});
	}

	static close(fd){
		return new Promise((resolve, reject)=>{
			try{
				fs.close(fd, (err)=>{
					if(err){
						reject(err);
						return;
					}

					resolve();
				});

			}catch(e){
				reject(e);
			}
			
		});
	}

	static open(path, flags, mode){
		mode = mode || 0o666;

		return new Promise((resolve, reject)=>{
			try{
				fs.open(path, flags, mode, (err, fd)=>{
					if(err){
						reject(err);
						return;
					}

					resolve(fd);
				});

			}catch(e){
				reject(e);
			}
		});
	}

	static createWriteStream(path, options){
		return new Promise((resolve, reject)=>{
			try{
				let ws = fs.createWriteStream(path, options);
				resolve(ws);

			}catch(err){
				reject(err);
			}
		});
	}

	static createReadStream(path, options){
		return new Promise((resolve, reject)=>{
			try {
				let rs = fs.createReadStream(path, options);
				resolve(rs);

			}catch(e){
				reject(e);
			}
		});
	}

	static readFile(file, options){
		return new Promise((resolve, reject)=>{
			try{
				fs.readFile(file, options, (e, data)=>{
					if( e ){
						reject(e);
						return;
					}

					resolve(data);
				});

			}catch(e){
				reject(e);
			}
			
		});
	}

	static writeFile(file, data, options){
		return new Promise((resolve, reject)=>{
			try{
				fs.writeFile(file, data, options, (e)=>{
					if( e ){
						reject(e);
						return;
					}

					resolve();
				});

			}catch(e){
				reject(e);
			}
			
		});
	}	
}

window.FS = module.exports = FS;