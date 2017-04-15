class sharedInstance {
	constructor() {
		instances = {};
	}
	static getInstance(){
		if(this.instances === undefined){
			this.instances = {};
		}
		return this.instances;
	}
}

module.exports = sharedInstance;