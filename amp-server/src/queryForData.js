import * as SynapseClient from "./synapse/SynapseClient"
import * as SynapseConstants from "./synapse/SynapseConstants"

const fetch = require('node-fetch');

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

function getWikiData(wikiId, token, synId = "syn12666371") {
  return fetch(
    `https://repo-prod.prod.sagebase.org/repo/v1/entity/${synId}/wiki/${wikiId}`,
    {
      method: "GET",
      headers: {
        sessionToken: token,
      },
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      return handleErrors(response)
    })
    .then((processedData) => {
      return processedData
    })
    .catch((error) => {
      return ""
    })
}

export {
  login, queryTable, getWikiData 
}
