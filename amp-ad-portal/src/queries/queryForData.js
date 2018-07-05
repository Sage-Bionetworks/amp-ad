//import _ from "lodash"
//import getToken from "./getToken"
//import getStudyData from "./getStudyData"
//import getWikiData from "./getWikiData"

import * as SynapseClient from "../synapse/SynapseClient"
import * as SynapseConstants from "../synapse/SynapseConstants"

const buildRequest = (table, query) => {
  return {
    entityId: table,
    query: {
      sql: query,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 100,
    },
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
      | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
      | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
      | SynapseConstants.BUNDLE_MASK_QUERY_FACETS,
  }
}

const getBioSampleCount = (species, table, tokenResponse) => {
  //SELECT count(DISTINCT "specimenID") FROM syn12532774 where ("species" = 'Human')
  let query
  if (species === "allspecies" || species === "All species") {
    query = `SELECT count(DISTINCT "specimenID") FROM ${table}`
  } else {
    query = `SELECT count(DISTINCT "specimenID") FROM ${table} WHERE ( ( "species" = '${species}') )`
  }
  console.log(query)
  return SynapseClient.getQueryTableResults(
    buildRequest(table, query),
    tokenResponse.sessionToken,
  ).then((response) => {
    return response.queryResult.queryResults.rows[0].values[0]
  })
}

//const mapStudies = (species, table, tokenResponse) => {
//let query = `SELECT * FROM ${table} WHERE (("species" = '${species}'))`
//if (species === "allspecies") {
//query = `SELECT * FROM ${table}`
//}
//return SynapseClient.getQueryTableResults(
//buildRequest(table, query),
//tokenResponse.sessionToken,
//)
//.then((response) => {
////console.log(response);
////if (species !== "allspecies") {
////allData.speciesList.push(species)
////} else {
////allData.speciesList.push("All species")
////}

//let assays
//let tissues
//let speciesFacets
//for (let i = 0; i < response.facets.length; i++) {
//if (response.facets[i].columnName === "assay") {
//assays = response.facets[i].facetValues
//}
//if (response.facets[i].columnName === "tissue") {
//tissues = response.facets[i].facetValues
//}
//if (response.facets[i].columnName === "species") {
//speciesFacets = response.facets[i].facetValues
//}
//}

//if (species === "allspecies") {
//const speciesList = _.map(speciesFacets, "value")

//speciesList.map((element) => {
//if (element === "Drosophila melanogaster") {
//element = "Fruit Fly"
//}
//})

//speciesList.splice(0, 1)
//speciesList.splice(0, 0, "All species")
//}

////allData[convertNameForApp(species)].species = speciesFacets
////allData[convertNameForApp(species)].assay = assays
////allData[convertNameForApp(species)].tissue = tissues

//setBase64Link("assay", species, table)
//setBase64Link("tissue", species, table)
//})
//.catch((error) => {
//console.log(error)
//})
//}

//const convertNameForApp = (species) => {
//if (species === "Drosophila melanogaster" || species === "Fruit fly") {
//species = "fly"
//}
//species = species.replace(/\s/g, "")
//species = species.toLowerCase()
//species = `${species}Data`
//return species
//}

//const setBase64Link = (dataType, species, table) => {
//allData[convertNameForApp(species)][dataType].forEach((element) => {
//let sqlQuery
//if (species === "allspecies") {
//sqlQuery = `SELECT * FROM ${table} WHERE (("assay" = '${
//element.value
//}'))`
//} else {
//sqlQuery = `SELECT * FROM ${table} WHERE ( ( "species" = '${species}') AND ("assay" = '${
//element.value
//}'))`
//}

//let base64Link = {
//sql: sqlQuery,
//includeEntityEtag: true,
//isConsistent: true,
//offset: 0,
//limit: 25,
//}
//base64Link = JSON.stringify(base64Link)
//element.table = table
//element.base64Link = btoa(base64Link)
//})
//}

//const mapAllDiagnoses = (tokenResponse) => {
//return allData.speciesList.map((speciesName) => {
//return allData.allspeciesData.diagnosesList.map((diagnosisName) => {
//return Promise.all([
//mapDiagnoses(speciesName, diagnosisName, "assay", tokenResponse),
//mapDiagnoses(speciesName, diagnosisName, "tissue", tokenResponse),
//]).then((onFulfillment) => {
//console.log(allData2)
//})
//})
//})
//}

//const mapDiagnoses = (species, diagnosis, facet, tokenResponse) => {
//// facet should be tissue assay ect...
//diagnosis = diagnosis.replace(/'/g, "''")
//let query = `SELECT * FROM syn12532774 WHERE (("species" = '${species}') AND ("diagnosis" = '${diagnosis}'))`
//if (species === "All species") {
//query = `SELECT * FROM syn12532774 WHERE (("diagnosis" = '${diagnosis}'))`
//}
//return SynapseClient.getQueryTableResults(
//buildRequest("syn12532774", query),
//tokenResponse.sessionToken,
//)
//.then((response) => {
//let facetIndex
//if (facet === "tissue") {
//facetIndex = 3
//}
//if (facet === "assay") {
//facetIndex = 5
//}

//const diagnosisArray = []
//for (let i = 0; i < response.facets[facetIndex].facetValues.length; i++) {
//diagnosisArray.push(response.facets[facetIndex].facetValues[i])
//}

//diagnosis = diagnosis.replace(/''/g, "'")
//const diagnoses = { [diagnosis]: diagnosisArray }
//if (species === "All species") {
//species = "allspecies"
//}
//if (species === "Drosophila melanogaster") {
//species = "fly"
//}
//allData2[`${species.toLowerCase()}Data`][facet].diagnoses.push(diagnoses)
//})
//.catch((error) => {
//console.log(error)
//})
//}

//const mapAllDiseases = (species, table, tokenResponse) => {
//let query = `SELECT * FROM ${table} WHERE (("species" = '${species}'))`
//if (species === "allspecies") {
//query = `SELECT * FROM ${table}`
//}
//return SynapseClient.getQueryTableResults(
//buildRequest(table, query),
//tokenResponse.sessionToken,
//)
//.then((response) => {
//const diagnoses = response.facets[0].facetValues
//if (species === "Drosophila melanogaster" || species === "Fruit fly") {
//species = "fly"
//}
//species = species.replace(/\s/g, "")
//allData[`${species.toLowerCase()}Data`].diagnoses = diagnoses
//const diagnosesList = _.map(diagnoses, "value")
//diagnosesList.splice(0, 1)
//diagnosesList.splice(0, 0, "All Diagnoses")
//allData[`${species.toLowerCase()}Data`].diagnosesList = diagnosesList
//allData[`${species.toLowerCase()}Data`].diagnosesAssay = response.facets[5].facetValues
//allData[`${species.toLowerCase()}Data`].diagnosesTissue = response.facets[3].facetValues
//})
//.catch((error) => {
//console.log(error)
//})
//}

//const runAllQueries = () => {
//return SynapseClient.login("mikeybkats", "guinness")
//.then((tokenResponse) => {
//return Promise.all([
//getWikiData("409843", 15, tokenResponse.sessionToken).then(
//tokenResponse => {
//allData.wikiDataUseData = addSpaceToHash(tokenResponse.markdown);
//}
//),

//mapAllDiseases("allspecies", "syn12532774", tokenResponse),
//mapStudies("allspecies", "syn12532774", tokenResponse),
//getBioSampleCount("allspecies", "syn12532774", tokenResponse),

//mapAllDiseases("Human", "syn12532774", tokenResponse),
//mapStudies("Human", "syn12532774", tokenResponse),
//getBioSampleCount("Human", "syn12532774", tokenResponse),

//mapAllDiseases("Human Cell Line", "syn12532774", tokenResponse),
//mapStudies("Human Cell Line", "syn12532774", tokenResponse),
//getBioSampleCount("Human Cell Line", "syn12532774", tokenResponse),

//mapAllDiseases("Mouse", "syn12532774", tokenResponse),
//mapStudies("Mouse", "syn12532774", tokenResponse),
//getBioSampleCount("Mouse", "syn12532774", tokenResponse),

//mapAllDiseases("Fruit fly", "syn12532774", tokenResponse),
//mapStudies("Fruit fly", "syn12532774", tokenResponse),
//getBioSampleCount("Fruit fly", "syn12532774", tokenResponse),

//mapAllDiseases("Rat", "syn11346063", tokenResponse),
//mapStudies("Rat", "syn11346063", tokenResponse),
//getBioSampleCount("Rat", "syn11346063", tokenResponse),
//])
////.then(fulfillment => {
////return mapAllDiagnoses(tokenResponse);
////});
//})
//.then((data) => {
//return allData
//})
//}

//const getAllSpeciesMetaData = () => {
//return setUpQueryToken().then(() => {
//return runStudyDataQuery(allData.tokens.allSpecies, 1)
//})
//}

//const getSpeciesStudiesMetaData = (
//columnName,
//species,
//queryTokenName = "default",
//AUTHENTICATION,
//TABLEID,
//) => {
//return setUpQueryToken(
//columnName,
//[species],
//TABLEID,
//queryTokenName,
//AUTHENTICATION,
//).then((data) => {
//columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
//species = species.charAt(0).toLowerCase() + species.substr(1);
//species = species.replace(/\s/g, '');
//const dataResponse = runStudyDataQuery(
//allData.tokens[queryTokenName],
//AUTHENTICATION,
//TABLEID,
//10,
//)
//return dataResponse
//})
//}

//const setUpQueryToken = (
//columnName,
//facetValue,
//TABLEID,
//tokenName = "allSpecies",
//) => {
//let speciesSearchBool
//if (tokenName !== "allSpecies") {
//speciesSearchBool = true
//}
//return getToken(speciesSearchBool, facetValue, columnName, TABLEID)
//.then(response => response.json())
//.then((result) => {
//const dataStateObject = { ...allData.tokens }
//dataStateObject[tokenName] = result.token
//allData.tokens = dataStateObject
//})
//}

//const runStudyDataQuery = (speciesToken, authenticationToken, tableID) => {
//return getStudyData(speciesToken, authenticationToken, tableID).then(
//(response) => {
//if (response !== undefined) {
//return response
//}
//},
//)
//}

export { getBioSampleCount }
