var express = require('express');
var app = express();
var http = require('http').Server(app);
var base_instance = require('../../lib/jiff-server').make_jiff(http, {logs:true});
var jiff_instance = require('../../lib/ext/jiff-server-bignumber').make_jiff(base_instance);
BigNumber = require('bignumber.js');


// Server static files.
app.use("/demos", express.static("demos"));
app.use("/lib", express.static("lib"));
app.use("/lib/ext", express.static("lib/ext"));
app.use("/bignumber.js", express.static("node_modules/bignumber.js"));
http.listen(8080, function() {
  console.log('listening on *:8080');

  var client_instance;

  var options = {party_id: 1, party_count: 2, Zp: new BigNumber(32416190071)};

	options.onConnect = function() {
		console.log("in server-side onconnect");

		client_instance.share( new BigNumber(12.256));
	  //share.open(function(r) { console.log(r); } );
	}

	client_instance = require('../../lib/jiff-client').make_jiff("http://localhost:8080", 'receive-bignumber', options);
	client_instance = require('../../lib/ext/jiff-client-bignumber.js').make_jiff(client_instance, options)


	


});

