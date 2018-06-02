import React, { Component } from 'react';
import _ from 'lodash';

import study from './Study.js';
import getStudyData from './StudyData.js';
import getToken from './Token.js';

class App extends Component {
  state = {
    studyData: {},
    studyTemplate: {},
    speciesSelection: [ "Human", "Drosophila melanogaster", "Mouse" ], 
    tissueSelection: [ "parahippocampal gyrus" ],
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
        //if( response !== undefined ){
          console.log(response);
          this.setState({
            studyData: response
          })
        //}
      }
    );
  }

  setData = (key) => {
    this.state.studyData.facets.forEach( (element, index) => {
      if ( element.columnName === key ){
        let stateObject = { ...this.state.pageData };
        let stateObjectToAdd = { count: element.facetValues.length, facetValues: {...element.facetValues} };
        console.log(stateObject);
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
          this.setData('assay')
          this.setData('tissue')
          this.setData('analysisType')
          this.setData('cellType')
          this.setData('consortium')
          this.setData('grant')
          this.setData('isConsortiumAnalysis')
          this.setData('isModelSystem')
          this.setData('species')
          this.setData('dataType')
          this.setData('dataSubtype')
          this.setData('assayTarget')
          this.setData('organ')
          this.setData('celltype')
          this.setData('isMultiSpecimen')
          this.setData('fileFormat')
        })
    });
  }

  generateSelectionDropdown = (STATE) => {
    let options = STATE.map( (element, index) => {
      return (
        <option key={index} value={element}>{element}</option>
      ); 
    });
    return <select>{options}</select>;
  }

  render(){
    if(this.state.studyData.rows !== undefined){
      console.log(this.state.studyData.rows[0]); 
    };
    return (
      <div>
        <form>
          {this.generateSelectionDropdown(this.state.speciesSelection)} 
          {this.generateSelectionDropdown(this.state.tissueSelection)}
        </form>
      </div>
    );
  }
}

export default App;
