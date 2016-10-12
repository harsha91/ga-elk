var express = require('express');
var app = express();
app.use(function (err, req, res, next){
	res.status(500);
	res.send('oops! something broke');
});

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
	res.json({
		message: 'Welcome !'
	});
});

app.use('/api', router);

app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});

app.listen(port);
console.log('Server started on port '+port);
