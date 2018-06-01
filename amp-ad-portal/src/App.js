import React, { Component } from 'react';
import lodash from 'lodash';
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
      totalStudyDataShown: 0,
      assaysCount: 0,
      studiesCount: 0,
      tissuesCount: 0,
      analyseseCount: 0
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
    console.log(TOKEN);
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

  componentDidMount(){
    this.setStudyTemplate();
    this.setUpQueryToken().then(token => { this.runStudyDataQuery(this.state.tokens.allStudies) });
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
