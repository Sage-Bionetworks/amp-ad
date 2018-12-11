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
    ])}
  )
}

const writeAllDataFile = () => {  
  let tables = ["syn17024173", "syn17024229"]

  let query = (table) => { return `SELECT * FROM ${table}` }
  runQueries(tables, query)

  //let query2 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'CTF' ) )` }
  //runQueries(tables, query2, "fundingAgency_CTF")

  //let query3 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'NTAP' ) )` }
  //runQueries(tables, query3, "fundingAgency_NTAP")

  //let query4 = (table) => { return `SELECT * FROM ${table} WHERE ( ( "fundingAgency" = 'NIH-NCI' ) )` }
  //runQueries(tables, query4, "fundingAgency_NIHNCI")

  //let query5 = (table) => { return `SELECT * FROM ${table} WHERE (  (  "resourceType" = 'experimentalData' ) )` }
  //runQueries(["syn16858331"], query5, "files")

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

