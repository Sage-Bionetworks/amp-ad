import * as SynapseClient from '../synapse/SynapseClient'
import * as SynapseConstants from '../synapse/SynapseConstants'

const buildRequest = (table, query, offset = 0, limit = 250) => {
  return {
    entityId: table,
    query: {
      sql: query,
      includeEntityEtag: true,
      isConsistent: true,
      offset,
      limit,
    },
    partMask:
      SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
      | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
      | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
      | SynapseConstants.BUNDLE_MASK_QUERY_FACETS,
  }
}

//const escapeString = (string) => {
//const newString = string.replace(/'/i, "''")
//return newString
//}

const json = (response) => {
  return JSON.stringify(response)
}

const processError = (error) => {
  console.log(`Request has failed: ${error}`)
}

const getTable = (table, sessionToken, query, offset = 0, limit = 50) => {
  const request = buildRequest(table, query, offset, limit)
  return SynapseClient.getQueryTableResults(request, sessionToken).catch(
    error => console.log(error),
  )
}

const queryTable = (table, query, token) => {
  return getTable(table, token.sessionToken, query)
    .then(json)
    .catch(processError)
}

//const host = "https://static.ampadportal.org/"
const host = 'http://localhost:3030/'

const getStaticJSON = async (id, key, handleNestedChanges) => {
  return fetch(`${host}${id}.json`, {
    method: 'GET',
    'cache-control': 'no-cache',
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (handleNestedChanges !== undefined) {
        handleNestedChanges(key, id, data)
      }
      return data
    })
    .catch(processError)
}

export { getStaticJSON, queryTable, getTable }
