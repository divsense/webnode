var ALIEN_ID = "webserver";

var request = require("superagent");

var adda = require("divsense-adda-helper");
var alienBody = require("divsense-alien-body")( ALIEN_ID );

var handleHeadEvent = function(req, res, next){


	var input = req.params.user_input;
	var title = "webserver " + input;

	res.content = { 
		head:{
				 icon: "fa-globe",
				 text: title,
				 data_attrs: [
					 ["call", "save"],
					 ["signal", "content node parent"],
				 ],
			 }
	};

	next( res );

}

var handleChannelEvent = function(req, res, next){

	if( req.method === "call" ){
//        processSignal();
	}
	else if( req.method === "signal" ){
		processSignal();
	}

	function processSignal(){

		var mode = adda.getUnitData( "u", "tag", req.params.selected );
		var filename = req.params.content.t;
		var url = "/file?name=" + filename + "&mode=" + mode;

		request.get( url )
			   .set('Accept', 'application/json')
			   .end( function ( err, resp ){
				   res.content = resp.body.data;
				   next( res );
			   });
	}
}


alienBody.on("channel", handleChannelEvent );

alienBody.on("head", handleHeadEvent );
