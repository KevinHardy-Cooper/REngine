/*
  December 18, 2017
  Created by Kevin Hardy-Cooper

  Abstract:
  This file contains the end point and database interactions
*/

// Importing modules
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var SensitiveInfo = require('./SensitiveInfo');

// Creating an Express.js app
var app = express();

// Creating an instance of SensitiveInfo
const sensitiveInfo = new SensitiveInfo();

// Adding headers that allow for Cross-Origin Resource Sharing between port 8080 and 3000
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

// Parses the text as JSON and exposes the resulting object on req.body
app.use(bodyParser.json());

// Set up connection to database.
var con = mysql.createConnection({
  host: sensitiveInfo.passedInHost,
  user: sensitiveInfo.passInUser,
  password: sensitiveInfo.passedInPassword,
  database: sensitiveInfo.passedInDatabase
});

// Listen to GET requests to /invoices.
app.get('/invoices', function(req, res) {

  // Get all customer invoices
  var query = con.query("SELECT * FROM customer_invoices", function (err, result) {
    if (err) throw err;

    // Return the json of the resulting records of the query
    res.json(result);
  });
});

// Listen to GET requests to /plans.
app.get('/plans', function(req, res) {

  // Get all phone plans
  var query = con.query("SELECT * FROM phone_plans", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Set up the express routing to occur on port 3000
app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

/* Currently commented out such that I don't accidentally add a plan to the database */
// Listen to POST requests to /plans/new.
/*app.post('/plans/new', function(req, res) {

  // Inserts a new plan
  var query = con.query("INSERT INTO customer_invoices (name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate) VALUES ('"+req.body.name+"', '"+req.body.plan+"', '"+req.body.servProd+"', '"+req.body.flatRate+"', '"+req.body.totalDue+"', '"+req.body.startDate+"', '"+req.body.endDate+"', '"+req.body.longDistanceAllowed+"', '"+req.body.longDistanceUsage+"', '"+req.body.longDistanceOverageChargeRate+"', '"+req.body.textMsgSentAllowed+"', '"+req.body.textMsgSentUsage+"', '"+req.body.textMsgSentOverageChargeRate+"', '"+req.body.textMsgReceivedAllowed+"', '"+req.body.textMsgReceivedUsage+"', '"+req.body.textMsgReceivedOverageChargeRate+"', '"+req.body.dataAllowed+"', '"+req.body.dataUsage+"', '"+req.body.dataOverageChargeRate+"', '"+req.body.localAirtimeAllowed+"', '"+req.body.localAirtimeUsage+"', '"+req.body.localAirtimeOverageChargeRate+"')", function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});*/

/*Currently commented out such that I don't accidentally add to database*/
// Listen to POST requests to /invoices/new.
/*app.post('/invoices/new', function(req, res) {

  // Insert new customer invoice
  var query = con.query("INSERT INTO customer_invoices (name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate) VALUES ('"+req.body.name+"', '"+req.body.plan+"', '"+req.body.servProd+"', '"+req.body.flatRate+"', '"+req.body.totalDue+"', '"+req.body.startDate+"', '"+req.body.endDate+"', '"+req.body.longDistanceAllowed+"', '"+req.body.longDistanceUsage+"', '"+req.body.longDistanceOverageChargeRate+"', '"+req.body.textMsgSentAllowed+"', '"+req.body.textMsgSentUsage+"', '"+req.body.textMsgSentOverageChargeRate+"', '"+req.body.textMsgReceivedAllowed+"', '"+req.body.textMsgReceivedUsage+"', '"+req.body.textMsgReceivedOverageChargeRate+"', '"+req.body.dataAllowed+"', '"+req.body.dataUsage+"', '"+req.body.dataOverageChargeRate+"', '"+req.body.localAirtimeAllowed+"', '"+req.body.localAirtimeUsage+"', '"+req.body.localAirtimeOverageChargeRate+"')", function (err, result) {
      if (err) throw err;
      res.json(result);
    }
  );
});*/

/* Below is the important information regarding the queries */

// column names for the customer_invoice table:
// name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate, id

// column names for the phone_plans table:
// servProd, plan, flatRate, longDistanceAllowed, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedOverageChargeRate, dataAllowed, dataOverageChargeRate, localAirtimeAllowed, localAirtimeOverageChargeRate, additionFeatures


// example of search query:
// con.query("SELECT * FROM customer_invoices", function (err, result) {

// example of insert query into customer_invoices:
// con.query("INSERT INTO customer_invoices (name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate) VALUES ('Mr.T', 'Canada-Wide Talk + Text 25 Dbl', 'Koodo', '25', '49', '2017-10-8', '2017-11-07', '0', '48', '24', 'INFINITY', '411', '0', 'INFINITY', '1400', '0', '0', '7.1', '14.2', '200', '103', '0')", function (err, result) {


// insert of insert query into phone_plans:
// con.query("INSERT INTO phone_plans (servProd, plan, flatRate, longDistanceAllowed, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedOverageChargeRate, dataAllowed, dataOverageChargeRate, localAirtimeAllowed, localAirtimeOverageChargeRate, additionFeatures) VALUES ('Koodo', 'No Tab $115 per month', '115', 'INFINITY', '0', 'INFINITY', '0', 'INFINITY', '0', '10000', '7', 'INFINITY', '0', '[Call Display, Voicemail, Call Waiting, Conference Calling, Unlimited Canada-Wide Family Calling, Bonus 2 GB of data for 24 months is applicable for new and renewing customers]')", function (err, result) {