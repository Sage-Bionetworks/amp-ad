// packages
import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// non component js
import study from './defaultData/Study';

// component js
import Header from './Header';
import Home from './Home';
import Tools from './Tools';
import About from './About';
import AboutStudies from './AboutStudies';
import AboutDataUseRequirements from './AboutDataUseRequirements';

class App extends Component {
  state = {
    buttonState: {
      assayButtonAll: false,
      tissueButtonAll: false
    },
    pageData: study,
    studyTemplate: {},
    speciesSelection: [], 
    diseasesSelection: [],
    speciesDropdownSelection: 'All species',
    diseasesDropdownSelection: ''
  }

  setFacetPageData = (key) => {
    let propKey = this.state.speciesDropdownSelection.toLowerCase() + 'Data'
    if(this.state.speciesDropdownSelection.toLowerCase() === 'all species'){
      propKey = 'allSpeciesData'
    }
    if(this.state.speciesDropdownSelection === 'Drosophila melanogaster'){
      propKey = 'flyData'
    }
    this.props[propKey].facets.forEach( (element, index) => {
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
    }, ()=> {
      this.setAllPageDataPoints();
    })
  }

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE
    })  
  }

  toggleSeeAll = (event) => {
    let key = event.target.name;
    let value = event.target.dataset.value === "false" ? true : false; 
    this.setState( prevState => ({
      ...prevState,
      buttonState: {
        ...prevState.buttonState, 
        [key]: value
      }
    })) 
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

	homeMarkup = () => {
		return (
			<Home 
        wikiNewsData={this.props.wikiNewsData}
				speciesDropdownSelection={this.state.speciesDropdownSelection}
				handleChangeEvent={this.handleChangeEvent}
				speciesSelection={this.state.speciesSelection}
				toggleSeeAll={this.toggleSeeAll}
				buttonState={this.state.buttonState}
				getSum={this.getSum}
				getColumnCountForSpecies={this.getColumnCountForSpecies}
				getColumnNameDataTypeAndCount={this.getColumnNameDataTypeAndCount}
				pageData={this.state.pageData}
				ratData={this.props.ratData}
				mouseData={this.props.flyData}
				flyData={this.props.flyData}
			/>
		)
	}

  componentDidMount(){
		this.setAllPageDataPoints();
  }

  componentDidUpdate(){
		//console.log(this.props.allSpeciesData);
  }

  render(){
    return (
			<Router>
      <div className="row amp-ad">
				<Header />
        <div className="col-xs-12 main">
					<Route exact path="/" component={this.homeMarkup}/>
					<Route path="/Tools" component={Tools}/>
					<Route path="/About" component={About}/>
					<Route path="/Studies" component={AboutStudies}/>
					<Route path="/DataUseRequirements" component={AboutDataUseRequirements}/>
				</div>
				<footer></footer>
			</div>
			</Router>
    );
  }
}


export default App;
