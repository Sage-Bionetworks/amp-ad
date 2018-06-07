// packages
import React, { Component } from 'react';
import _ from 'lodash';

// non component js
import study from './defaultData/Study.js';
import defaultData from './defaultData/DefaultData.js';
import defaultMouseData from './defaultData/DefaultMouseData.js';
import defaultRatData from './defaultData/DefaultRatData.js';
import defaultHumanData from './defaultData/DefaultHumanData.js';
import defaultFlyData from './defaultData/DefaultFlyData.js';

// component js
import getStudyData from './GetStudyData.js';
import getToken from './Token.js';
import PiesBelowHeader from './PiesBelowHeader.js';
import Header from './Header.js';
import Welcome from './Welcome.js';
import SearchBar from './SearchBar.js';

class App extends Component {
  state = {
    pageData: study,
    allSpeciesData: defaultData,
		drosophilamelanogasterData: defaultFlyData,
		humanData: defaultHumanData,
		mouseData: defaultMouseData,
		ratData: defaultRatData,
    studyTemplate: {},
    speciesSelection: [], 
    tissueSelection: [],
    tokens: {
      allSpecies: '0',
    },
    columnNameSelection: 'All species'
  }

  setUpQueryToken = (searchBool, columnName, facetValue, queryString, tokenName = "allSpecies") => {
    return getToken(searchBool, columnName, facetValue, queryString)
    .then(response => response.json())
    .then(result => {
      let dataStateObject = {...this.state.tokens}
      dataStateObject[tokenName] = result.token
      this.setState({ tokens: dataStateObject })
    });
  }

  runStudyDataQuery = (TOKEN, LIMIT, dataStateEndPoint) => {
    return getStudyData(TOKEN).then( 
      response => { 
        if( response !== undefined ){
          this.setState({
            [dataStateEndPoint]: response
          })
        }
      }
    );
  }

  getSpeciesStudiesMetaData = (species, columnName, tokenName) => {
    return this.setUpQueryToken(true, columnName, [species], "SELECT * FROM syn11346063", tokenName)
    .then( data => {
			columnName = columnName.charAt(0).toUpperCase() + columnName.substr(1);
			species = species.charAt(0).toLowerCase() + species.substr(1);
			species = species.replace(/\s/g, '');
      return this.runStudyDataQuery(this.state.tokens[tokenName], 10, species+'Data')
    });
  }

  setFacetPageData = (key) => {
    this.state.allSpeciesData.facets.forEach( (element, index) => {
      if ( element.columnName === key ){
        let stateObjectToAdd = { 
          count: element.facetValues.length, 
          facetValues: {...element.facetValues} 
        };
        this.setState( prevState => ({
          ...prevState,
          pageData: { ...prevState.pageData, [key]: {...stateObjectToAdd} }  
        }), () => {
          this.setSpeciesSelection();
        })
      }  
    })
  }

  setAllPageDataPoints = () => {
    let pageDataPoints = ['assay', 'tissue', 'analysisType', 'cellType','consortium','grant','isConsortiumAnalysis','isModelSystem','species','dataType','dataSubtype','assayTarget','organ','celltype','isMultiSpecimen','fileFormat' ];
    pageDataPoints.forEach( (element, index) => {
      this.setFacetPageData(element);  
    });
  }

	getSum = (total, num) => {
		return total + num;
	}

	getCountForSpecies = (speciesStateName, columnName) => {
		let totalCounts = [];
		speciesStateName.facets.forEach( (element) => {
			if(element.columnName === columnName){
				totalCounts.push( element.facetValues.length ) 
			}
		})
		totalCounts = totalCounts.reduce(this.getSum); 	
		return totalCounts;
	}

  getDataFromSynapse = () => {
		this.getSpeciesStudiesMetaData('Human', 'assay', 'humanToken')
		this.getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseToken')
		this.getSpeciesStudiesMetaData('Rat', 'assay', 'ratToken')
		this.getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyToken')
    this.setUpQueryToken().then(token => { 
      this.runStudyDataQuery(this.state.tokens.allSpecies, 1, "allSpeciesData")
    });
  }


  setSpeciesSelection = () => {
    let speciesObject = this.state.pageData.species.facetValues; 
    let speciesArray = this.convertObjectValsToArray(speciesObject);
    speciesArray.unshift("All Species");
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

  componentDidMount(){
    console.log(defaultData);
		this.setAllPageDataPoints();
  }

  render(){
    return (
      <div className="row amp-ad">
        <div className="col-xs-12 main">
          <Header />
          <Welcome />
					<SearchBar generateDropdown={this.generateSelectionDropdown(this.state.speciesSelection)} />
					<PiesBelowHeader 
						pageData={this.state.pageData} 
						allSpeciesAssayCount={this.getCountForSpecies(this.state.allSpeciesData, 'assay')}
						mouseAssayCount={this.getCountForSpecies(this.state.mouseData, 'assay')}
						humanAssayCount={this.getCountForSpecies(this.state.humanData, 'assay')}
						ratAssayCount={this.getCountForSpecies(this.state.ratData, 'assay')}
						flyAssayCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'assay')}

						allSpeciesTissueCount={this.getCountForSpecies(this.state.allSpeciesData, 'tissue')}
						mouseTissueCount={this.getCountForSpecies(this.state.mouseData, 'tissue')}
						humanTissueCount={this.getCountForSpecies(this.state.humanData, 'tissue')}
						ratTissueCount={this.getCountForSpecies(this.state.ratData, 'tissue')}
						flyTissueCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'tissue')}

						allSpeciesAnalysisTypeCount={this.getCountForSpecies(this.state.allSpeciesData, 'analysisType')}
						mouseAnalysisTypeCount={this.getCountForSpecies(this.state.mouseData, 'analysisType')}
						humanAnalysisTypeCount={this.getCountForSpecies(this.state.humanData, 'analysisType')}
						ratAnalysisTypeCount={this.getCountForSpecies(this.state.ratData, 'analysisType')}
						flyAnalysisTypeCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'analysisType')}
					/>
        
          <section className="popular-data-requests row center-xs">
            <div className="col-xs-12 col-sm-10">
              <div className="row">
                <h2>Popular Data Requests</h2>
              </div>
              <div className="row most-popular-data start-xs">
                <div className="col-sm-3 popular-col">
                  <h5>Most Popular Assays</h5>
                </div>
                <div className="col-sm-3 popular-col">
                  <h5>Most Popular Tissues</h5>
                </div>
              </div>
            </div>
          </section>

					<section className="analyses row">
            <div></div> 
          </section>
        </div>
      </div>
    );
  }
}

export default App;
