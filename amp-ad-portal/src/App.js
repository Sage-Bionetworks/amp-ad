// packages
import React, { Component } from 'react';
import _ from 'lodash';

// non component js
import study from './defaultData/Study.js';

// component js
import PiesBelowHeader from './PiesBelowHeader.js';
import Header from './Header.js';
import Welcome from './Welcome.js';
import SearchBar from './SearchBar.js';

class App extends Component {
  state = {
    pageData: study,
    studyTemplate: {},
    speciesSelection: [], 
    tissueSelection: [],
    columnNameSelection: 'All species'
  }

  setFacetPageData = (key) => {
    this.props.allSpeciesData.facets.forEach( (element, index) => {
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
						allSpeciesAssayCount={this.getCountForSpecies(this.props.allSpeciesData, 'assay')}
						mouseAssayCount={this.getCountForSpecies(this.props.mouseData, 'assay')}
						humanAssayCount={this.getCountForSpecies(this.props.humanData, 'assay')}
						ratAssayCount={this.getCountForSpecies(this.props.ratData, 'assay')}
						flyAssayCount={this.getCountForSpecies(this.props.flyData, 'assay')}

						allSpeciesTissueCount={this.getCountForSpecies(this.props.allSpeciesData, 'tissue')}
						mouseTissueCount={this.getCountForSpecies(this.props.mouseData, 'tissue')}
						humanTissueCount={this.getCountForSpecies(this.props.humanData, 'tissue')}
						ratTissueCount={this.getCountForSpecies(this.props.ratData, 'tissue')}
						flyTissueCount={this.getCountForSpecies(this.props.flyData, 'tissue')}

						allSpeciesAnalysisTypeCount={this.getCountForSpecies(this.props.allSpeciesData, 'analysisType')}
						mouseAnalysisTypeCount={this.getCountForSpecies(this.props.mouseData, 'analysisType')}
						humanAnalysisTypeCount={this.getCountForSpecies(this.props.humanData, 'analysisType')}
						ratAnalysisTypeCount={this.getCountForSpecies(this.props.ratData, 'analysisType')}
						flyAnalysisTypeCount={this.getCountForSpecies(this.props.flyData, 'analysisType')}
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
