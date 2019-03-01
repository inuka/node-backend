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
      encrypt: true // Use this if you're on Windows Azure
    }
  };

  // connect to your database
  sql.connect(config, function(err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('select * from cc_app_flag_config', function(err, recordset) {
      if (err) console.log(err);

      // send records as a response
        res.send(recordset);
        sql.close();
    });
  });
});

var server = app.listen(5000, function() {
  console.log('Server is running..');
});
