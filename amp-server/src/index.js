import express from "express"
import fs from "fs"
import { queryTable, getWikiData, login } from "./queryForData" 

const app = express()

const runQueries = (tableArray, query, appendToName = "") => {
  tableArray.map((table) => {
    queryTable(table, query(table)).then( data => {
      fs.writeFile(`public/${table}${appendToName !== "" ? "_" : ""}${appendToName}.json`, data, err => {
        if (err) throw err
        console.log(`${table}${appendToName !== "" ? "_" : ""}${appendToName} has been saved!`)
      })
    })
  })

  login("mikeybkats", "guinness").then(token => {
    Promise.all([
      getWikiData("582408", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/whatsNew.json`, JSON.stringify(wikiData), err => {
          console.log("whatsNew.json has been saved")
        })
      }),
      getWikiData("409850", token.sessionToken, "syn2580853").then((wikiData) => {
        fs.writeFile(`public/explorePublications.json`, JSON.stringify(wikiData), err => {
          console.log("explorePublications.json has been saved")
        })
      }),
      getWikiData("581895", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/programAMPAD_wiki.json`, JSON.stringify(wikiData), err => {
          console.log("programAMPAD_wiki.json has been saved")
        })
      }),
      getWikiData("581898", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/programResilienceAD_wiki.json`, JSON.stringify(wikiData), err => {
          console.log("programResilienceAD_wiki.json has been saved")
        })
      }),
      getWikiData("581896", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/programModelAD_wiki.json`, JSON.stringify(wikiData), err => {
          console.log("programModelAD_wiki.json has been saved")
        })
      }),
      getWikiData("581894", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/programM2OVEAD_wiki.json`, JSON.stringify(wikiData), err => {
          console.log("programM2OVEAD_wiki.json has been saved")
        })
      }),
      getWikiData("409845", token.sessionToken, "syn2580853").then((wikiData) => {
        fs.writeFile(`public/tools.json`, JSON.stringify(wikiData), err => {
          console.log("tools.json has been saved")
        })
      }),
      getWikiData("581939", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/about.json`, JSON.stringify(wikiData), err => {
          console.log("about.json has been saved")
        })
      }),
      getWikiData("585318", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/dataUseCertificates.json`, JSON.stringify(wikiData), err => {
          console.log("dataUseCertificates.json has been saved")
        })
      }),
      getWikiData("585317", token.sessionToken, "syn12666371").then((wikiData) => {
        fs.writeFile(`public/dataInstructions.json`, JSON.stringify(wikiData), err => {
          console.log("dataInstructions.json has been saved")
        })
      }),
      getWikiData("584597", token.sessionToken, "syn2580853").then((wikiData) => {
        fs.writeFile(`public/acknowledgementStatements.json`, JSON.stringify(wikiData), err => {
          console.log("acknowledgementStatements.json has been saved")
        })
      }),
    ])}
  )
}

const writeAllDataFile = () => {  
  let tables = ["syn17024173", "syn17024229"]

  let query = (table) => { return `SELECT * FROM ${table}` }
  runQueries(tables, query)
  let query2 = (table) => { return `SELECT * FROM syn17024229 where ( ( \"Program\" = 'AMP-AD' ) )` }
  runQueries([tables[1]], query2, "programAMPAD")
  let query3 = (table) => { return `SELECT * FROM syn17024229 where ( ( \"Program\" = 'MODEL-AD' ) )` }
  runQueries([tables[1]], query3, "programMODELAD")
  let query4 = (table) => { return `SELECT * FROM syn17024229 where ( ( \"Program\" = 'M2OVE-AD' ) )` }
  runQueries([tables[1]], query4, "programM2OVEAD")
  let query5 = (table) => { return `SELECT * FROM syn17024229 where ( ( \"Program\" = 'Resilience-AD' ) )` }
  runQueries([tables[1]], query5, "programResilienceAD")
}

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

writeAllDataFile()

//app.use(express.static( __dirname + "/public"))

//app.listen(3030, () => console.log("Example app listening on port 3030!"))

