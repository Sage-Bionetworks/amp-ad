import getToken from './getToken'
import getStudyData from './getStudyData'
import getWikiData from './getWikiData'

import * as SynapseClient from './synapse/SynapseClient'
import * as SynapseConstants from './synapse/SynapseConstants'

let allData = {
  tokens: {},
  allSpeciesData: {},
  flyData: {},
  humanData: {},
  mouseData: {},
  ratData: {},
  wikiNewsData: {},
  wikiProgramsData: {},
	wikiContributorsData: {}
};

const addSpaceToHash = string => {
  for( var index = 0; index < string.length; index++){
    if(string[index] === '#' && string[index+1] !== '#' && string[index+1] !== ' '){
      string = string.slice( 0, index) + ` ` + string.slice(index + 1, string.length)
    }
  }
	return string;
}

const runAllQueries = () => {
  return Promise.all([
		SynapseClient.login('mikeybkats', 'guinness').then( response => { 
			console.log(response) 
			getWikiData('409840', 15, response.sessionToken).then( response => { allData.wikiNewsData = addSpaceToHash(response.markdown)}),
			getWikiData('409849', 15, response.sessionToken).then( response => { allData.wikiProgramData = addSpaceToHash(response.markdown)}),
			getWikiData('409848', 15, response.sessionToken).then( response => { allData.wikiContributorsData = addSpaceToHash(response.markdown)})
		}),
    getAllSpeciesMetaData().then( response => { allData.allSpeciesData = response }),
    getSpeciesStudiesMetaData('Human', 'assay', 'humanToken').then( response => { allData.humanData = response }),
    getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseToken').then( response => { allData.mouseData = response }),
    getSpeciesStudiesMetaData('Rat', 'assay', 'ratToken').then( response => { allData.ratData = response }),
    getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyToken').then( response => { allData.flyData = response })
  ]).then( run => { 
    return allData 
  })
}

const getAllSpeciesMetaData = () => {
  return setUpQueryToken().then( token => { 
    return runStudyDataQuery(allData.tokens.allSpecies, 1)
  })
}
  
const getSpeciesStudiesMetaData = (species, columnName, tokenName) => {
  return setUpQueryToken(true, columnName, [species], "SELECT * FROM syn11346063", tokenName)
    .then( data => {
      columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
      species = species.charAt(0).toLowerCase() + species.substr(1);
      species = species.replace(/\s/g, '');
      return runStudyDataQuery(allData.tokens[tokenName], 10, species+'Data')
    });
}

const setUpQueryToken = (searchBool, columnName, facetValue, queryString, tokenName = "allSpecies") => {
  return getToken(searchBool, columnName, facetValue, queryString)
  .then(response => response.json())
  .then(result => {
    let dataStateObject = {...allData.tokens}
    dataStateObject[tokenName] = result.token
    allData.tokens = dataStateObject;
  });
}

const runStudyDataQuery = (TOKEN, LIMIT) => {
  return getStudyData(TOKEN).then( 
    response => { 
      if( response !== undefined ){
        return response
      }
    }
  )
}

export default runAllQueries 
