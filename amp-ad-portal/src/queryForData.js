import getToken from './getToken'
import getStudyData from './getStudyData'
import getWikiData from './getWikiData'
import _ from 'lodash'

import * as SynapseClient  from './synapse/SynapseClient'
import * as SynapseConstants from './synapse/SynapseConstants'

import allData from './defaultData/AllData'

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

const buildRequest = (table, query) => {
  return ({
    entityId: table,
    query: {
      sql: query,
      includeEntityEtag: true,
      isConsistent: true,
      offset: 0,
      limit: 100
    },
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS
      | SynapseConstants.BUNDLE_MASK_QUERY_COLUMN_MODELS
      | SynapseConstants.BUNDLE_MASK_QUERY_SELECT_COLUMNS
      | SynapseConstants.BUNDLE_MASK_QUERY_FACETS
  })
}

//const arrayToObject = (array, keyField) =>
   //array.reduce((obj, item) => {
     //obj[item[keyField]] = item
     //return obj
   //}, {})
//
      //let studiesObject = arrayToObject(studies, "value") 
      //studiesObject = _.mapKeys(studiesObject, (value, key) => {
        //key = key.replace(/\s/g, '') 
        //key = key.replace(/'/g, '')
        //return key
      //})

const mapStudies = (species, tokenResponse) => {
  let query = "SELECT * FROM syn11346063 WHERE ((\"species\" = '" + species +"'))";
  if( species === 'allspecies' ){
    query = "SELECT * FROM syn11346063"
  }
  return SynapseClient.getQueryTableResults(buildRequest("syn11346063", query), tokenResponse.sessionToken)
  .then( response => {
      let speciesFacets = response.facets[4].facetValues
      let assays = response.facets[9].facetValues 
      let tissues = response.facets[12].facetValues 
      if( species === 'allspecies' ){
        let speciesList = _.map(speciesFacets, "value")
        speciesList.map( (element) => {
          if(element === "Drosophila melanogaster"){
            element = "Fruit Fly"
          }
        })
        speciesList.splice(0,1)
        speciesList.splice(0,0, 'All species')
        allData.speciesList = speciesList
      }
      if( species === "Drosophila melanogaster"){
        species = 'fly'
      }
      allData[species.toLowerCase()+"Data"].species = speciesFacets      
      allData[species.toLowerCase()+"Data"].assay = assays      
      allData[species.toLowerCase()+"Data"].tissue = tissues      
    }).catch(function (error) {
      console.log(error)
    })
}

const mapAllDiseases = (species, tokenResponse) => {
  let query = "SELECT * FROM syn12532774 WHERE ((\"species\" = '" + species +"'))";
  if( species === 'allspecies' ){
    query = "SELECT * FROM syn12532774"
  }
  return SynapseClient.getQueryTableResults(buildRequest("syn12532774", query), tokenResponse.sessionToken)
  .then( response => {
      console.log(response)
      let diagnoses = response.facets[0].facetValues 
      if( species === "Drosophila melanogaster"){
        species = 'fly'
      }
      allData[species.toLowerCase()+"Data"].diagnoses = diagnoses      
      let diagnosesList = _.map(diagnoses, 'value')
      diagnosesList.splice(0,1)
      diagnosesList.splice(0,0,'All Diagnoses')
      allData[species.toLowerCase()+"Data"].diagnosesList = diagnosesList
      allData[species.toLowerCase()+"Data"].diagnosesAssay = response.facets[5].facetValues 
      allData[species.toLowerCase()+"Data"].diagnosesTissue = response.facets[3].facetValues 
    }).catch(function (error) {
      console.log(error)
    })
}

const runAllQueries = () => {
  return SynapseClient.login('mikeybkats', 'guinness').then( tokenResponse => { 
    return Promise.all([
      getWikiData('409840', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiNewsData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409849', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiProgramData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409848', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiContributorsData = addSpaceToHash(tokenResponse.markdown)}),
      getWikiData('409843', 15, tokenResponse.sessionToken).then( tokenResponse => { allData.wikiDataUseData = addSpaceToHash(tokenResponse.markdown)}),

      mapAllDiseases("Human", tokenResponse),
      mapStudies("Human", tokenResponse),
      mapAllDiseases("Rat", tokenResponse),
      mapStudies("Rat", tokenResponse),
      mapAllDiseases("Mouse", tokenResponse),
      mapStudies("Mouse", tokenResponse),
      mapAllDiseases("Drosophila melanogaster", tokenResponse),
      mapStudies("Drosophila melanogaster", tokenResponse),
      mapAllDiseases("allspecies", tokenResponse),
      mapStudies("allspecies", tokenResponse),
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
