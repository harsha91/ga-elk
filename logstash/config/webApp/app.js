var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var sys = require('sys')
var exec = require('child_process').exec;


app.use(bodyParser());
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
app.post('/startLogstash', function(req, res){
	form_data = req.body;
    var fileName = 'logstash.conf';
    var path = '/etc/logstash/conf.d/';
    var filetext_input = 'input { googleanalytics { ';
    filetext_input = filetext_input + ' ids => "' + form_data.viewId + ' "';
    filetext_input = filetext_input + ' start_date => "' + form_data.startDate + ' "';
    filetext_input = filetext_input + ' end_date => "' + form_data.endDate + ' "';
    filetext_input = filetext_input + ' metrics => "' + form_data.metrics + ' "';
    filetext_input = filetext_input + ' dimensions => "' + form_data.dimensions + ' "';
    filetext_input = filetext_input + ' key_file_path => "/etc/logstash/conf.d/visApp-fff25e8af4ff.p12"';
    filetext_input = filetext_input + ' service_account_email => "gatestacc@visapp-1239.iam.gserviceaccount.com"';
    filetext_input =  filetext_input + ' } } ';
    var filetext_output = 'output { elasticsearch { ';
    filetext_output =  filetext_output + 'index => "'+form_data.index+'" hosts => "elasticsearch:9200" template => "/etc/logstash/conf.d/template.json"} } ';
    console.log(filetext_input+filetext_output);
    fs.writeFile(path+fileName, filetext_input+filetext_output, function (err) {
        if (err) { console.log(err);res.send('{"retCode":"1"}');}
        console.log("file done");
        var child;
        var command = "logstash -f "+path+fileName;
        child = exec(command, function (error, stdout, stderr) {
          sys.print('stdout: ' + stdout);
          sys.print('stderr: ' + stderr);
          res.send('{"retCode":"0"}');
          if (error !== null) {
            console.log('exec error: ' + error);
              res.send('{"retCode":"2"}');
          }
        });
    });
    
    
});

app.listen(port, "0.0.0.0");
console.log('Server started on port '+port);
