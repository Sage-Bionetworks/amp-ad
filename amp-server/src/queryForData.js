import * as SynapseClient from "./synapse/SynapseClient"
import * as SynapseConstants from "./synapse/SynapseConstants"

const buildRequest = (table, query) => {
  return {
    entityId: table,
    query: {
      sql: query,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 5000 
    },
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_RESULTS |
      SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS |
      SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS |
      SynapseConstants.BUNDLE_MASK_QUERY_FACETS
  }
}

const getTable = (table, tokenResponse, query) => {
  let request = buildRequest(table, query)
  return SynapseClient.getQueryTableResults( request, tokenResponse.sessionToken)
}

const login = (username, password) => {
  return SynapseClient.login(username, password)
}

const json = response => {
  return JSON.stringify(response)
}

const processError = error => {
  console.log("Request has failed: " + error)
}

const queryTable = (table, query) => {
  console.log(query)
  return login("mikeybkats", "guinness")
    .then( token => {
      return getTable(table, token, query)  
    })
    .then(json)
    .catch(processError)
}

//const runQueries = () => {
//return SynapseClient.login("mikeybkats", "guinness")
//.then(tokenResponse => {
//return getTable("syn12532774", tokenResponse)
//})
//.then( response => {
//return JSON.stringify(response)
//})
//.catch(function(error) {
//console.log(error)
//process.exit()
//})
//}


export default queryTable
