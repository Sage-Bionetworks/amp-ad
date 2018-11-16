"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _queryForData = require("./queryForData");

var _queryForData2 = _interopRequireDefault(_queryForData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var runQueries = function runQueries(tableArray, query) {
  var appendToName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  tableArray.map(function (table) {
    //console.log(query(table))
    (0, _queryForData2.default)(table, query(table)).then(function (data) {
      _fs2.default.writeFile("public/" + table + (appendToName !== "" ? "_" : "") + appendToName + ".json", data, function (err) {
        if (err) throw err;
        console.log("" + table + (appendToName !== "" ? "_" : "") + appendToName + " has been saved!");
        //process.exit()
      });
    });
  });
};

var writeAllDataFile = function writeAllDataFile() {
  var tables = ["syn17024173"];

  var query = function query(table) {
    return "SELECT * FROM " + table;
  };
  runQueries(tables, query);

  //let query2 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'CTF' ) )` }
  //runQueries(tables, query2, "fundingAgency_CTF")

  //let query3 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'NTAP' ) )` }
  //runQueries(tables, query3, "fundingAgency_NTAP")

  //let query4 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'NIH-NCI' ) )` }
  //runQueries(tables, query4, "fundingAgency_NIHNCI")

  //let query5 = (table) => { return `SELECT * FROM ${table} WHERE (  (  "resourceType" = 'experimentalData' ) )` }
  //runQueries(["syn16858331"], query5, "files")
};

//app.all("/", function(req, res, next) {
//res.header("Access-Control-Allow-Origin", "*")
//res.header("Access-Control-Allow-Headers", "X-Requested-With")
//next()
//})

//app.use(function(req, res, next) {
//res.header("Access-Control-Allow-Origin", "*")
//res.header("Access-Control-Allow-Headers", "X-Requested-With")
//next()
//})

writeAllDataFile();

//app.use(express.static( __dirname + "/public"))

//app.listen(3030, () => console.log("Example app listening on port 3030!"))