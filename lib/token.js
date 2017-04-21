var jwt = require('jsonwebtoken');
function decode(token) {
	try{
		var decoded = jwt.verify(token,process.env._key);
		return decoded;
	}catch(err){
		return null;
	}
}



module.exports = {
	checkToken : function checkToken(token) {
		if(token === undefined){
			return null;
		}
		return decode(token);
	}
}