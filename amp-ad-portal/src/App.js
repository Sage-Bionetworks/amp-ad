import React, { Component } from 'react';
import _ from 'lodash';

import study from './Study.js';
import getStudyData from './StudyData.js';
import getToken from './Token.js';

import Header from './Header.js';
import Welcome from './Welcome.js';

class App extends Component {
  state = {
    studyData: {},
    studyTemplate: {},
    speciesSelection: [], 
    tissueSelection: [],
    pageData: {},
    tokens: {
      allStudies: '0',
    },
    columnNameSelection: ''
  }

  setUpQueryToken = (searchBool, columnName, facetValue, queryString) => {
    return getToken(searchBool, columnName, facetValue, queryString)
    .then(response => response.json())
    .then(result => {
      let dataStateObject = {...this.state.tokens};
      dataStateObject.allStudies = result.token;
      this.setState({ tokens: dataStateObject });
    });
  }

  setStudyTemplate = () => {
    this.setState({
      studyTemplate: study
    }); 
  }

  runStudyDataQuery = (TOKEN, LIMIT) => {
    return getStudyData(TOKEN).then( 
      response => { 
        if( response !== undefined ){
          this.setState({
            studyData: response
          })
        }
      }
    );
  }

  setFacetPageData = (key) => {
    this.state.studyData.facets.forEach( (element, index) => {
      if ( element.columnName === key ){
        let stateObjectToAdd = { count: element.facetValues.length, facetValues: {...element.facetValues} };
        this.setState( prevState => ({
          ...prevState,
          pageData: { ...prevState.pageData, [key]: {...stateObjectToAdd} }  
        }));
      }  
    })
  }

  getCountForSpecies = (species, tissue) => {
    
  }

  getCountForPageDataSubset = (subset = "assay", value = "rnaSeq") => {
    
  }

  componentDidMount(){
    this.setStudyTemplate();
    this.setUpQueryToken().then(token => { 
      this.runStudyDataQuery(this.state.tokens.allStudies)
        .then(run => {
          this.setFacetPageData('assay')
          this.setFacetPageData('tissue')
          this.setFacetPageData('analysisType')
          this.setFacetPageData('cellType')
          this.setFacetPageData('consortium')
          this.setFacetPageData('grant')
          this.setFacetPageData('isConsortiumAnalysis')
          this.setFacetPageData('isModelSystem')
          this.setFacetPageData('species')
          this.setFacetPageData('dataType')
          this.setFacetPageData('dataSubtype')
          this.setFacetPageData('assayTarget')
          this.setFacetPageData('organ')
          this.setFacetPageData('celltype')
          this.setFacetPageData('isMultiSpecimen')
          this.setFacetPageData('fileFormat')
          //console.log(this.state.pageData);
          //console.log(this.state.studyData);
          //console.log(this.state.studyData.queryResult.queryResults.rows[0]); 
          this.setSpeciesSelection();
        })
    });
  }

  setSpeciesSelection = () => {
    let speciesArray = this.convertObjectValsToArray(this.state.pageData.species.facetValues);
    speciesArray.unshift("All Species");
    console.log(speciesArray);
    this.handleChanges("speciesSelection", speciesArray);
  }
  
  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE
    })  
  }

  generateSelectionDropdown = (STATE) => {
    if(STATE !== undefined){
      let options = STATE.map( (element, index) => {
        return (
          <option key={index} value={element}>{element}</option>
        ); 
      });
      return <select>{options}</select>;
    }
  }

  convertObjectValsToArray = (OBJECT) => {
    let mappedArray = []
    _.mapKeys(OBJECT, (value, key) => { 
      if(value["value"].length !== 41){ mappedArray.push(value["value"]) }
      return value["value"] 
    });
    return mappedArray;
  }

  pushValuesToState = (ARRAY) => {}

  render(){
    return (
      <div className="row amp-ad">
        <div className="col-xs-12">
          <Header />
          <Welcome />
          <form>
            {this.generateSelectionDropdown(this.state.speciesSelection)} 
          </form>
        </div>
      </div>
    );
  }
}

export default App;
