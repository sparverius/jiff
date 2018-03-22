var BigNumber = require('bignumber.js');
var jiff_instance;

function success(result) { 
	console.log("success, result = " + result);
	console.log(result);
	return result;
}


  function failure(error){
    console.error("failure, error = " + error);
  }

var options = {party_id: 2, party_count: 2, Zp: new BigNumber(32416190071)};
options.onConnect = function() {
	console.log("in onconnect");
	try {
		var share = jiff_instance.receive_open([1]).then(success, failure);
	}
	catch (err){
		console.log(err);
	}
  

  //share.open(function(r) { console.log(r); } );
}

jiff_instance = require('../../lib/jiff-client').make_jiff("http://localhost:8080", 'receive-bignumber', options);
jiff_instance = require('../../lib/ext/jiff-client-bignumber.js').make_jiff(jiff_instance, options)
