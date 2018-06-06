import React, { Component } from 'react';
import _ from 'lodash';

// non component js
import study from './defaultData/Study.js';
import defaultData from './defaultData/DefaultData.js';
import defaultMouseData from './defaultData/DefaultMouseData.js';
import defaultRatData from './defaultData/DefaultRatData.js';
import defaultHumanData from './defaultData/DefaultHumanData.js';
import defaultFlyData from './defaultData/DefaultFlyData.js';
import getStudyData from './GetStudyData.js';
import getToken from './Token.js';

// component js
import PiesBelowHeader from './PiesBelowHeader.js';
import Header from './Header.js';
import Welcome from './Welcome.js';

class App extends Component {
  state = {
    pageData: study,
    studyData: defaultData,
		drosophilamelanogasterData: defaultFlyData,
		humanData: defaultHumanData,
		mouseData: defaultMouseData,
		ratData: defaultRatData,
    studyTemplate: {},
    speciesSelection: [], 
    tissueSelection: [],
    tokens: {
      allStudies: '0',
    },
    columnNameSelection: ''
  }

  setUpQueryToken = (searchBool, columnName, facetValue, queryString, tokenName = "allStudies") => {
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

	getSum = (total, num) => {
		return total + num;
	}

	//getCountForSpecies = (speciesStateName, columnName) => {
		//let totalCounts = [];
		//speciesStateName.facets.forEach( (element) => {
			//if(element.columnName === columnName){
				//element.facetValues.forEach( (element) => {
					//totalCounts.push(element.count);
				//})	
			//}	
		//});
		//totalCounts = totalCounts.reduce(this.getSum); 	
		//return totalCounts;
	//}
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

	getSetAllAssayCounts = () => {
		console.log( this.state.studyData );
		console.log(
		this.getCountForSpecies(this.state.studyData, 'assay'),
		this.getCountForSpecies(this.state.mouseData, 'assay'),
		this.getCountForSpecies(this.state.humanData, 'assay'),
		this.getCountForSpecies(this.state.ratData, 'assay'),
		this.getCountForSpecies(this.state.drosophilamelanogasterData, 'assay')
		)
		console.log(
		this.getCountForSpecies(this.state.studyData, 'tissue'),
		this.getCountForSpecies(this.state.mouseData, 'tissue'),
		this.getCountForSpecies(this.state.humanData, 'tissue'),
		this.getCountForSpecies(this.state.ratData, 'tissue'),
		this.getCountForSpecies(this.state.drosophilamelanogasterData, 'tissue')
		);
	}

  componentDidMount(){
		this.setAllPageDataPoints();

		this.getSpeciesStudiesMetaData('Human', 'assay', 'humanAssayToken')
		this.getSpeciesStudiesMetaData('Mouse', 'assay', 'mouseAssayToken')
		this.getSpeciesStudiesMetaData('Rat', 'assay', 'ratAssayToken')
		this.getSpeciesStudiesMetaData('Drosophila melanogaster', 'assay', 'flyAssayToken')

    this.setUpQueryToken().then(token => { 
			this.setSpeciesSelection();
			this.getSetAllAssayCounts();
      this.runStudyDataQuery(this.state.tokens.allStudies, 100, "studyData")
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

  render(){
    return (
      <div className="row amp-ad">
        <div className="col-xs-12">
          <Header />
          <Welcome />
					<PiesBelowHeader 
						pageData={this.state.pageData} 
						allSpeciesAssayCount={this.getCountForSpecies(this.state.studyData, 'assay')}
						mouseAssayCount={this.getCountForSpecies(this.state.mouseData, 'assay')}
						humanAssayCount={this.getCountForSpecies(this.state.humanData, 'assay')}
						ratAssayCount={this.getCountForSpecies(this.state.ratData, 'assay')}
						flyAssayCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'assay')}

						allSpeciesTissueCount={this.getCountForSpecies(this.state.studyData, 'tissue')}
						mouseTissueCount={this.getCountForSpecies(this.state.mouseData, 'tissue')}
						humanTissueCount={this.getCountForSpecies(this.state.humanData, 'tissue')}
						ratTissueCount={this.getCountForSpecies(this.state.ratData, 'tissue')}
						flyTissueCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'tissue')}

						allSpeciesAnalysisTypeCount={this.getCountForSpecies(this.state.studyData, 'analysisType')}
						mouseAnalysisTypeCount={this.getCountForSpecies(this.state.mouseData, 'analysisType')}
						humanAnalysisTypeCount={this.getCountForSpecies(this.state.humanData, 'analysisType')}
						ratAnalysisTypeCount={this.getCountForSpecies(this.state.ratData, 'analysisType')}
						flyAnalysisTypeCount={this.getCountForSpecies(this.state.drosophilamelanogasterData, 'analysisType')}
					/>
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
