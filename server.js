var express = require('express');
var config = require('config');
var sql = require('mssql');

var app = express();
var dbConfig = config.get('uiConfig.dbConfig');

app.get('/', function(req, res) {

  // config for your database
  var config = {
    user: dbConfig.userName,
    password: dbConfig.password,
    server: dbConfig.host,
    database: dbConfig.dbName,

    options: {
      encrypt: true
    }
  };

  sql.connect(config, function(err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('select FlagID, FlagName from cc_app_flag_config', function(err, recordset) {
      if (err) console.log(err);
        res.send(recordset);
        sql.close();
    });
  });
});

var server = app.listen(5000, function() {
  console.log('Server is running..');
});
