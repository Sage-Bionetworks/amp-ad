import React, { Component } from 'react';
import study from './Study.js';
import getStudyData from './StudyData.js';
import getToken from './Token.js';

class App extends Component {
  state = {
    studyTemplate: {},
    studyData: {},
    speciesSelection: [ "Human", "Drosophila melanogaster", "Mouse" ], 
    tissueSelection: [ "parahippocampal gyrus" ],
    studyDataShow: 0,
    assaysCount: 0,
    studiesCount: 0,
    tissuesCount: 0,
    analyseseCount: 0,
    token: 0,
    columnNameSelection: '',
    facetValues: ''
  }

  setUpQueryToken = (searchBool, columnName, facetValue ) => {
    return getToken(true, "assay", "rnaSeq")
    .then(response => response.json())
    .then(result => {
      this.setState({
        token: result.token
      });
    });
  }

  getStudyData = (TOKEN, LIMIT) => {
    return getStudyData(TOKEN).then( 
      response => { 
        this.setState({
          studyData: response.queryResult.queryResults
        })
      }
    );
  }

  getStudyTemplate = () => {
    this.setState({
      studyTemplate: study
    }); 
  }

  componentDidMount(){
    this.setUpQueryToken().then( token => { this.getStudyData(this.state.token) });
    this.getStudyTemplate();
  }
  
  render(){
    return (
      <div></div>
    );
  }
}

export default App;
