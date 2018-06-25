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

const mapStudies = (species, table, tokenResponse) => {
  let query = "SELECT * FROM " + table + " WHERE ((\"species\" = '" + species +"'))";
  if( species === 'allspecies' ){
    query = "SELECT * FROM " + table
  }
  return SynapseClient.getQueryTableResults(buildRequest(table, query), tokenResponse.sessionToken)
  .then( response => {
      //console.log(response)
      let speciesFacets = response.facets[7].facetValues
      let assays = response.facets[5].facetValues 
      let tissues = response.facets[3].facetValues 
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
      if( species === "Drosophila melanogaster" || species === "Fruit fly"){
        species = 'fly'
      }
      species = species.replace(/\s/g, '')
      species = species.toLowerCase() 
      //console.log(species)
      allData[species+"Data"].species = speciesFacets      
      allData[species+"Data"].assay = assays      
      allData[species+"Data"].tissue = tissues      
    }).catch(function (error) {
      console.log(error)
    })
}

let allData2 = {
	allspeciesData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	},
	humanData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	},
	humancelllineData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	},
	flyData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	},
	ratData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	},
	mouseData: {
		tissue: {
			all: {},
			diagnoses: []
		},
		assay: {
			all: {},
			diagnoses: []
		}
	}
};

const mapAllDiagnoses = (tokenResponse) => {
	return allData.speciesList.map( (speciesName) => {
		return allData.allspeciesData.diagnosesList.map( diagnosisName => {
			return Promise.all([
			 	mapDiagnoses(speciesName, diagnosisName, "assay", tokenResponse),
				mapDiagnoses(speciesName, diagnosisName, "tissue", tokenResponse)	
			]).then( onFulfillment => {
        console.log(allData2)
			})
		})
	})
}

const mapDiagnoses = (species, diagnosis, facet, tokenResponse) => {
	// facet should be tissue assay ect...
	diagnosis = diagnosis.replace(/'/g, '\'\'')  
	let query = "SELECT * FROM syn12532774 WHERE ((\"species\" = '" + species + "') AND (\"diagnosis\" = '" + diagnosis + "'))";
	if(species === 'All species'){
		query = "SELECT * FROM syn12532774 WHERE ((\"diagnosis\" = '" + diagnosis + "'))";
	}
  return SynapseClient.getQueryTableResults(buildRequest("syn12532774", query), tokenResponse.sessionToken)
  .then( response => {
      //console.log(response)
      //console.log(species, diagnosis, facet, tokenResponse)
      let facetIndex
      if(facet === "tissue"){ facetIndex = 3 }
      if(facet === "assay"){ facetIndex = 5 }

      let diagnosisArray = []
      for( let i = 0; i < response.facets[facetIndex].facetValues.length; i++){
        diagnosisArray.push( response.facets[facetIndex].facetValues[i] )
      }

      diagnosis = diagnosis.replace(/''/g, '\'')  
      let diagnoses = { [diagnosis]: diagnosisArray }
      if( species === 'All species' ){
        species = 'allspecies'
      }
      if( species === "Drosophila melanogaster"){
        species = 'fly'
      }
      allData2[species.toLowerCase()+"Data"][facet].diagnoses.push(diagnoses)  
    }).catch(function (error) {
      console.log(error)
    })
}

const mapAllDiseases = (species, table, tokenResponse) => {
  let query = "SELECT * FROM " + table + " WHERE ((\"species\" = '" + species +"'))";
  if( species === 'allspecies' ){
    query = "SELECT * FROM " + table
  }
  return SynapseClient.getQueryTableResults(buildRequest(table, query), tokenResponse.sessionToken)
  .then( response => {
      let diagnoses = response.facets[0].facetValues 
      if( species === "Drosophila melanogaster" || species === "Fruit fly"){
        species = 'fly'
      }
      species = species.replace(/\s/g, '');
      allData[species.toLowerCase()+"Data"].diagnoses = diagnoses      
      let diagnosesList = _.map(diagnoses, 'value')
      diagnosesList.splice(0,1)
      diagnosesList.splice(0,0,'All Diagnoses')
      //console.log(species)
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

      mapAllDiseases("Human", "syn12532774", tokenResponse),

      mapStudies("Human","syn12532774", tokenResponse),
      mapAllDiseases("Human Cell Line", "syn12532774", tokenResponse),
      mapStudies("Human Cell Line","syn12532774", tokenResponse),
      mapAllDiseases("Mouse", "syn12532774", tokenResponse),
      mapStudies("Mouse","syn12532774", tokenResponse),
      mapAllDiseases("Fruit fly", "syn12532774", tokenResponse),
      mapStudies("Fruit fly","syn12532774", tokenResponse),
      mapAllDiseases("Rat", "syn11346063", tokenResponse),
      mapStudies("Rat","syn11346063", tokenResponse),
      mapAllDiseases("allspecies","syn12532774", tokenResponse),
      mapStudies("allspecies","syn12532774", tokenResponse),
//const mapDiagnosis = (species, diagnosis, facet, tokenResponse) => {
			//mapDiagnoses("Human", "Alzheimer''s Disease", "assay", tokenResponse)
			
    ])
    //.then( (fulfillment) => {
      //return mapAllDiagnoses(tokenResponse)
    //})
  })
	.then( data => {
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
