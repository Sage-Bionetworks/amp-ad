import React, { Component } from 'react';
import _ from 'lodash';

import study from './Study.js';
import getStudyData from './StudyData.js';
import defaultData from './DefaultData.js';
import getToken from './Token.js';

import Header from './Header.js';
import Welcome from './Welcome.js';

class App extends Component {
  state = {
    pageData: study,
    studyData: defaultData,
    studyTemplate: {},
    speciesSelection: [], 
    tissueSelection: [],
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
        let stateObjectToAdd = { 
          count: element.facetValues.length, 
          facetValues: {...element.facetValues} 
        };
        this.setState( prevState => ({
          ...prevState,
          pageData: { ...prevState.pageData, [key]: {...stateObjectToAdd} }  
        }));
      }  
    })
  }

  setAllPageDataPoints = () => {
    let pageDataPoints = ['assay', 'tissue', 'analysisType', 'cellType','consortium','grant','isConsortiumAnalysis','isModelSystem','species','dataType','dataSubtype','assayTarget','organ','celltype','isMultiSpecimen','fileFormat' ];
    pageDataPoints.forEach( (element, index) => {
      this.setFacetPageData(element);  
    });
  }

  getCountForSpecies = (species, tissue) => {
    
  }

  getCountForPageDataSubset = (subset = "assay", value = "rnaSeq") => {
    
  }

  componentDidMount(){
    this.setAllPageDataPoints();
    this.setUpQueryToken().then(token => { 
      this.setSpeciesSelection();
      this.runStudyDataQuery(this.state.tokens.allStudies)
        .then(run => {
          //console.log(this.state.studyData.queryResult.queryResults.rows[0]); 
        })
    });
  }

  getTotalAssays = () => {
    
  }

  setSpeciesSelection = () => {
    let speciesObject = this.state.pageData.species.facetValues; 
    let speciesArray = this.convertObjectValsToArray(speciesObject);
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
          <section className="pie-charts-welcome row">
            <div className="col-xs-12">
              <div className="row center-xs">
                <div className="assays pie-chart-welcome col-xs-12 col-sm-4">
                  <h1 className="count">{this.state.pageData.assay.count} Assays</h1>
                </div>
                <div className="tissues pie-chart-welcome col-xs-12 col-sm-4">
                  <h1 className="count">{this.state.pageData.tissue.count} Tissues</h1>
                </div>
                <div className="analyses pie-chart-welcome col-xs-12 col-sm-4">
                  <h1 className="count">{this.state.pageData.analysisType.count} Analyses</h1>
                </div>
              </div>
            </div>
          </section>
          <section className="Searchbar">
            <form>
              {this.generateSelectionDropdown(this.state.speciesSelection)} 
            </form>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
