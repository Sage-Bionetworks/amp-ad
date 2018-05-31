import React, { Component } from 'react';
import study from './Study.js';
import getStudyData from './StudyData.js';
import getToken from './Token.js';

class App extends Component {
  state = {
    studyData: {},
    assaysCount: 0,
    studiesCount: 0,
    tissuesCount: 0,
    analyseseCount: 0
  }

  setUpQueryToken = () => {
    return getToken(true, "assay", "rnaSeq")
    .then(response => response.json())
    .then(result => {
      console.log(result.token);
      return result.token; 
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
      study: study
    }); 
  }

  //packageStudyData 

  componentDidMount(){
    this.setUpQueryToken().then( token => { this.getStudyData(token) });
    this.getStudyTemplate();
  }
  
  render(){
    return (
      <div></div>
    );
  }
}

export default App;
