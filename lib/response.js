module.exports={
	generateResponse : function generateResponse(result,detail,data) {
		return { 
			'result' : result,
			'detail' : detail,
			'data'	: data
		}
	}
}