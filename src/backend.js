var mysql = require('mysql');
var express = require('express');
var app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Set up connection to database.
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mansfield21",
  database: "REngine"
});

// Listen to POST requests to /users.
app.get('/invoices', function(req, res) {
  // Do a MySQL query.
  var query = con.query("SELECT * FROM customer_invoices", function (err, result) {
    if (err) throw err;

    // console.log(result);
    res.json(result);
  });
});

// Listen to POST requests to /users.
app.post('/invoices/new', function(req, res) {
  console.log(req.body);
  // Do a MySQL query.
  // var query = con.query("INSERT INTO customer_invoices (name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate) VALUES ("+", 'Canada-Wide Talk + Text 25 Dbl', 'Koodo', '25', '49', '2017-10-8', '2017-11-07', '0', '48', '24', 'INFINITY', '411', '0', 'INFINITY', '1400', '0', '0', '7.1', '14.2', '200', '103', '0')", function (err, result) {
  //   if (err) throw err;

  //   console.log(result);
  //   res.json(result);
  // });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
//columns
//name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate, id


// search query:
// con.query("SELECT * FROM customer_invoices", function (err, result) {

// insert query:
// con.query("INSERT INTO customer_invoices (name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate) VALUES ('Mr.T', 'Canada-Wide Talk + Text 25 Dbl', 'Koodo', '25', '49', '2017-10-8', '2017-11-07', '0', '48', '24', 'INFINITY', '411', '0', 'INFINITY', '1400', '0', '0', '7.1', '14.2', '200', '103', '0')", function (err, result) {