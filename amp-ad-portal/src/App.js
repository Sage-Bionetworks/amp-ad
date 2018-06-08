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
    diseasesSelection: [],
    speciesDropdownSelection: 'All species',
    diseasesDropdownSelection: ''
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
          this.setSelection(this.state.pageData.species, "speciesSelection", "All Species");
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

	getColumnCountForSpecies = (speciesPropName, columnName) => {
		let totalCounts = [];
		speciesPropName.facets.forEach( (element) => {
			if(element.columnName === columnName){
				totalCounts.push( element.facetValues.length ) 
			}
		})
		totalCounts = totalCounts.reduce(this.getSum); 	
		return totalCounts;
	}

  setSelection = (STATE, stateKey, prependValue) => {
    let selectionObject = STATE.facetValues; 
    let selectionArray = this.convertObjectValsToArray(selectionObject);
    if(prependValue){
      selectionArray.unshift(prependValue);
    }
    this.handleChanges(stateKey, selectionArray);
  }

  handleChangeEvent = (event) => {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value 
    })
  }
  
  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE
    })  
  }

  convertObjectValsToArray = (OBJECT) => {
    let mappedArray = []
    _.mapKeys(OBJECT, (value, key) => { 
      if(value["value"].length !== 41){ mappedArray.push(value["value"]) }
      return value["value"] 
    });
    return mappedArray;
  }

  getColumnNameDataTypeAndCount = (columnName, pathToDataObject) => {
    let mappedArray = []
    if(pathToDataObject[columnName] !== undefined){
      _.mapKeys(pathToDataObject[columnName].facetValues, (object) => {
        let flatData = { 
          count: object.count, 
          value: object.value
        }
        return mappedArray.push(flatData);
      })
    }
    return mappedArray;
  }

  componentDidMount(){
		this.setAllPageDataPoints();
  }

  componentDidUpdate(){
    console.log(this.state.pageData)
  }

  render(){
    return (
      <div className="row amp-ad">
        <div className="col-xs-12 main">
          <Header />
          <Welcome />
					<SearchBar 
            dropdownSelection={this.state.speciesDropdownSelection}
            handleChange={this.handleChangeEvent}
            speciesSelection={this.state.speciesSelection} 
          />
					<PiesBelowHeader 
            getColumnCountForSpecies={this.getColumnCountForSpecies}
            getColumnNameTypeAndCount={this.getColumnNameDataTypeAndCount}
						pageData={this.state.pageData} 
						allSpeciesAssayCount={this.getColumnCountForSpecies(this.props.allSpeciesData, 'assay')}
						mouseAssayCount={this.getColumnCountForSpecies(this.props.mouseData, 'assay')}
						humanAssayCount={this.getColumnCountForSpecies(this.props.humanData, 'assay')}
						ratAssayCount={this.getColumnCountForSpecies(this.props.ratData, 'assay')}
						flyAssayCount={this.getColumnCountForSpecies(this.props.flyData, 'assay')}

						allSpeciesTissueCount={this.getColumnCountForSpecies(this.props.allSpeciesData, 'tissue')}
						mouseTissueCount={this.getColumnCountForSpecies(this.props.mouseData, 'tissue')}
						humanTissueCount={this.getColumnCountForSpecies(this.props.humanData, 'tissue')}
						ratTissueCount={this.getColumnCountForSpecies(this.props.ratData, 'tissue')}
						flyTissueCount={this.getColumnCountForSpecies(this.props.flyData, 'tissue')}
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
