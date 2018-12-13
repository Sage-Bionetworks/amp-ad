"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _queryForData = require("./queryForData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var runQueries = function runQueries(tableArray, query) {
  var appendToName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  tableArray.map(function (table) {
    (0, _queryForData.queryTable)(table, query(table)).then(function (data) {
      _fs2.default.writeFile("public/" + table + (appendToName !== "" ? "_" : "") + appendToName + ".json", data, function (err) {
        if (err) throw err;
        console.log("" + table + (appendToName !== "" ? "_" : "") + appendToName + " has been saved!");
      });
    });
  });

  (0, _queryForData.login)("mikeybkats", "guinness").then(function (token) {
    Promise.all([(0, _queryForData.getWikiData)("582408", token.sessionToken, "syn12666371").then(function (wikiData) {
      _fs2.default.writeFile("public/whatsNew.json", JSON.stringify(wikiData), function (err) {
        console.log("whatsNew.json has been saved");
      });
    }), (0, _queryForData.getWikiData)("409850", token.sessionToken, "syn2580853").then(function (wikiData) {
      _fs2.default.writeFile("public/explorePublications.json", JSON.stringify(wikiData), function (err) {
        console.log("explorePublications.json has been saved");
      });
    }), (0, _queryForData.getWikiData)("581895", token.sessionToken, "syn12666371").then(function (wikiData) {
      _fs2.default.writeFile("public/programAMPAD_wiki.json", JSON.stringify(wikiData), function (err) {
        console.log("programAMPAD_wiki.json has been saved");
      });
    }), (0, _queryForData.getWikiData)("581898", token.sessionToken, "syn12666371").then(function (wikiData) {
      _fs2.default.writeFile("public/programResilienceAD_wiki.json", JSON.stringify(wikiData), function (err) {
        console.log("programResilienceAD_wiki.json has been saved");
      });
    }), (0, _queryForData.getWikiData)("581896", token.sessionToken, "syn12666371").then(function (wikiData) {
      _fs2.default.writeFile("public/programModelAD_wiki.json", JSON.stringify(wikiData), function (err) {
        console.log("programModelAD_wiki.json has been saved");
      });
    }), (0, _queryForData.getWikiData)("581894", token.sessionToken, "syn12666371").then(function (wikiData) {
      _fs2.default.writeFile("public/programM2OVEAD_wiki.json", JSON.stringify(wikiData), function (err) {
        console.log("programM2OVEAD_wiki.json has been saved");
      });
    })]);
  });
};

var writeAllDataFile = function writeAllDataFile() {
  var tables = ["syn17024173", "syn17024229"];

  var query = function query(table) {
    return "SELECT * FROM " + table;
  };
  runQueries(tables, query);
  var query2 = function query2(table) {
    return "SELECT * FROM syn17024229 where ( ( \"Program\" = 'AMP-AD' ) )";
  };
  runQueries([tables[1]], query2, "programAMPAD");
  var query3 = function query3(table) {
    return "SELECT * FROM syn17024229 where ( ( \"Program\" = 'MODEL-AD' ) )";
  };
  runQueries([tables[1]], query3, "programMODELAD");
  var query4 = function query4(table) {
    return "SELECT * FROM syn17024229 where ( ( \"Program\" = 'M2OVE-AD' ) )";
  };
  runQueries([tables[1]], query4, "programM2OVEAD");
  var query5 = function query5(table) {
    return "SELECT * FROM syn17024229 where ( ( \"Program\" = 'Resilience-AD' ) )";
  };
  runQueries([tables[1]], query5, "programResilienceAD");
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