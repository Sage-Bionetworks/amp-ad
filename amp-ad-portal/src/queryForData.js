import getToken from './getToken'
import getStudyData from './getStudyData'
import getWikiData from './getWikiData'

import * as SynapseClient  from './synapse/SynapseClient'
import * as SynapseConstants from './synapse/SynapseConstants'

let allData = {
  tokens: {},
  test: {},
  allSpeciesData: {},
  flyData: {},
  humanData: {},
  mouseData: {},
  ratData: {},
  wikiNewsData: {},
  wikiProgramsData: {},
	wikiContributorsData: {},
	wikiDataUseData: {}
};

const addSpaceToHash = string => {
  for( var index = 0; index < string.length; index++){
    if(string[index] === '#' && string[index+1] !== '#' && string[index-1] !== '#'){
      continue
    }
    if(string[index] === '#' && string[index+1] !== '#' && string[index+1] !== ' '){
      string = string.slice( 0, index) + ` ` + string.slice(index + 1, string.length)
    }
  }
	return string;
}

let request = {
  entityId: "syn12532715",
  query: {
            sql: "SELECT * FROM syn12532715",
            includeEntityEtag: true,
            isConsistent: true,
            offset: 0,
            limit: 100
          },
  partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
    | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
    | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
    | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
};

const runAllQueries = () => {
  return SynapseClient.login('mikeybkats', 'guinness').then( tokenResponse => { 
   //console.log(tokenResponse);
    return Promise.all([
      getWikiData('409840', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiNewsData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409849', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiProgramData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409848', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiContributorsData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409843', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiDataUseData = addSpaceToHash(tokenResponse.markdown)}),
      getAllSpeciesMetaData().then( response => { allData.allSpeciesData = response }),
      getSpeciesStudiesMetaData('Human', 'assay', 'humanToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.humanData = tokenResponse }),
      getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.mouseData = tokenResponse }),
      getSpeciesStudiesMetaData('Rat', 'assay', 'ratToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.ratData = tokenResponse }),
      getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyToken', tokenResponse.sessionToken, 'syn11346063').then( tokenResponse => { allData.flyData = tokenResponse }),
      
      SynapseClient.getQueryTableResults(request, tokenResponse.sessionToken)
      .then( response => {
        allData.test = response 
      }).catch(function (error) {
        console.log(error)
      })
    ])
  })
  .then( run => { 
    return allData 
  })
}

const getAllSpeciesMetaData = () => {
  return setUpQueryToken().then( () => { 
    return runStudyDataQuery(allData.tokens.allSpecies, 1)
  })
}
  
const getSpeciesStudiesMetaData = (columnName, species, queryTokenName = 'default', AUTHENTICATION, TABLEID) => {
  return setUpQueryToken(columnName, [species], TABLEID, queryTokenName, AUTHENTICATION)
    .then( data => {
      //columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
      //species = species.charAt(0).toLowerCase() + species.substr(1);
      //species = species.replace(/\s/g, '');
      let dataResponse = runStudyDataQuery(allData.tokens[queryTokenName], AUTHENTICATION, TABLEID, 10)
      //console.log(dataResponse)
      return dataResponse
    });
}

const setUpQueryToken = (columnName, facetValue, TABLEID, tokenName = "allSpecies") => {
  let speciesSearchBool;
  if(tokenName !== "allSpecies"){
    speciesSearchBool = true;
  }
  //console.log(speciesSearchBool, columnName, facetValue, TABLEID, tokenName)
  return getToken(speciesSearchBool, facetValue, columnName,  TABLEID)
  .then(response => response.json())
  .then(result => {
    //console.log(result);
    let dataStateObject = {...allData.tokens}
    dataStateObject[tokenName] = result.token
    allData.tokens = dataStateObject;
    //console.log(allData.tokens)
  });
}

const runStudyDataQuery = (speciesToken, authenticationToken, tableID) => {
  return getStudyData(speciesToken, authenticationToken, tableID).then( 
    response => { 
      if( response !== undefined ){
        return response
      }
    }
  )
}

export default runAllQueries 
