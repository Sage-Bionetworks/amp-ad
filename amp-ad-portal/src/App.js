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
    pageData: {
    },
    tokens: {
      allStudies: '0',
    },
    columnNameSelection: '',
    facetValues: {
      assaysByStudy: []
    }
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

  // function to return the total number of datas with the same key
  // function takes one parameter the name of the key 
  // // look for the key in the object 
  // // in the object with the key return facetValues.length
  returnCount = (key) => {
    this.state.studyData.facets.forEach( (element, index) => {
      if ( element.columnName === key ){
        let stateObject = {...this.state.pageData};
        stateObject[key] = element.facetValues.length;
        this.setState({
          pageData: stateObject
        });
      }  
    })
  }

  componentDidMount(){
    this.setStudyTemplate();
    this.setUpQueryToken().then(token => { 
      this.runStudyDataQuery(this.state.tokens.allStudies)
        .then(run => {
          this.returnCount('assay')
          this.returnCount('tissue')
          this.returnCount('analysisType')
          this.returnCount('cellType')
          this.returnCount('consortium')
          this.returnCount('grant')
          this.returnCount('isConsortiumAnalysis')
          this.returnCount('isModelSystem')
          this.returnCount('species')
          this.returnCount('dataType')
          this.returnCount('dataSubtype')
          this.returnCount('assayTarget')
          this.returnCount('organ')
          this.returnCount('celltype')
          this.returnCount('isMultiSpecimen')
          this.returnCount('fileFormat')
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
