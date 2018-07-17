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
  //console.log(query)
  return SynapseClient.getQueryTableResults(
    buildRequest(table, query),
    tokenResponse.sessionToken,
  )
    .then((response) => {
      return response.queryResult.queryResults.rows[0].values[0]
    })
    .catch(error => console.log(error))
}

const getTable = (table, tokenResponse, query) => {
  const request = buildRequest(table, query)
  return SynapseClient.getQueryTableResults(
    request,
    tokenResponse.sessionToken,
  )
}

export { getBioSampleCount, getTable }
