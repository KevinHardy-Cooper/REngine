var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mansfield21",
  database: "REngine"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM customer_invoices", function (err, result) {
    if (err) throw err;
    console.log("table altered");
    console.log(result);
  });
});

//columns
//name, plan, servProd, flatRate, totalDue, startDate, endDate, longDistanceAllowed, longDistanceUsage, longDistanceOverageChargeRate, textMsgSentAllowed, textMsgSentUsage, textMsgSentOverageChargeRate, textMsgReceivedAllowed, textMsgReceivedUsage, textMsgReceivedOverageChargeRate, dataAllowed, dataUsage, dataOverageChargeRate, localAirtimeAllowed, localAirtimeUsage, localAirtimeOverageChargeRate, id