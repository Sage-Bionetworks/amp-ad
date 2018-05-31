import React, { Component } from 'react';
import './App.css';
import study from './Study.js';
import studyData from './StudyData.js';
//import mockStudyData from './MockStudyData.js';

class App extends Component {
  state = {
    assaysCount: 0,
    studiesCount: 0,
    tissuesCount: 0,
    analyseseCount: 0
  }

  componentDidMount(){
    console.log(study);
    studyData.then( response  => (response))
      .then( data => {
        console.log(data.body);
        const reader = data.body.getReader();
        reader.read().then(({ done, value }) => {
        console.log(value); 
      });
    });
  }
  
  render(){
    return (
      <div></div>
    );
  }
}

export default App;
