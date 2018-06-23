// packages
import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// non component js
import study from './defaultData/Study';

// component js
import Header from './Header'
import Home from './Home'
import Tools from './Tools'
import AboutPrograms from './AboutPrograms'
import AboutStudies from './AboutStudies'
import AboutDataUseRequirements from './AboutDataUseRequirements'

class App extends Component {
  state = {
    buttonState: {
      assayButtonAll: false,
      tissueButtonAll: false
    },
    pageData: study,
    studyTemplate: {},
    diagnosesSelectionOptions: [],
    speciesDropdownSelection: 'All species',
    diagnosesDropdownSelection: 'All diagnoses'
  }

  componentDidMount(){
		this.setAllPageDataPoints();
    this.setDiagnosesMenu();
  }

  componentDidUpdate(){
		//console.log(this.props.humanData);
  }

  setDiagnosesMenu = () => {
    let selection = this.state.speciesDropdownSelection
    if(selection === "All species"){ selection = 'allSpecies' }
    if(selection === "Drosophila melanogaster" || selection === "Fruit Fly"){ selection = 'fly' }
    if(selection !== 'allSpecies'){ selection = selection.toLowerCase() }
    selection = selection + "Data"
    let diagnoses = this.props[selection].diagnosesList
    this.setState({
      diagnosesSelectionOptions: diagnoses
    }) 
  }

  setFacetPageData = (key) => {
    let propKey = this.state.speciesDropdownSelection.toLowerCase() + 'Data'
    if(this.state.speciesDropdownSelection.toLowerCase() === 'all species'){
      propKey = 'allSpeciesData'
    }
    if(this.state.speciesDropdownSelection === 'Drosophila melanogaster' || this.state.speciesDropdownSelection === "Fruit Fly"){
      propKey = 'flyData'
    }
    this.setSubFacet(key, propKey)
  }
  setSubFacet = (key, speciesKey) => {
    let stateObjectToAdd = { 
      count: this.props[speciesKey][key].length,
      facetValues: {...this.props[speciesKey][key]} 
    }
    this.setState( prevState => ({
      ...prevState,
      pageData: { ...prevState.pageData, [key]: {...stateObjectToAdd} }  
    }), () => {
      //this.setSelection(this.state.pageData.species, "speciesSelection", "All Species")
      //this.setSelection(this.state.pageData.diseases, "diseasesSelection", "All Diseases")
    })
  }

  setAllPageDataPoints = () => {
    let pageDataPoints = ['assay', 'tissue', 'diagnoses', 'species', 'diagnosesAssay', 'diagnosesTissue' ];
    pageDataPoints.forEach( (element, index) => {
      this.setFacetPageData(element)  
      this.setDiagnosesMenu()
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

  handleReactDropdownEvent = (event) => {
    //console.log(event)
    let key = event.value[0]
    this.setState({
      [key]: event.label 
    }, ()=> {
      this.setAllPageDataPoints();
    })
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
    //console.log(columnName, pathToDataObject)
    if(pathToDataObject[columnName] !== undefined){
      _.mapKeys(pathToDataObject[columnName].facetValues, (object) => {
        if( object.value !== 'org.sagebionetworks.UNDEFINED_NULL_NOTSET' ){
          let flatData = { 
            count: object.count, 
            value: object.value
          }
          return mappedArray.push(flatData);
        }
      })
    }
    return mappedArray;
  }

	homeMarkup = () => {
		return (
			<Home 
        setDiagnosesMenu={this.setDiagnosesMenu}
				speciesSelectionOptions={this.props.speciesSelection}
				speciesDropdownSelection={this.state.speciesDropdownSelection}

        diagnosesSelectionOptions={this.state.diagnosesSelectionOptions}
        diagnosesDropdownSelection={this.state.diagnosesDropdownSelection}

        wikiNewsData={this.props.wikiNewsData}
				toggleSeeAll={this.toggleSeeAll}
				buttonState={this.state.buttonState}
				getSum={this.getSum}
				getColumnCountForSpecies={this.getColumnCountForSpecies}
				getColumnNameDataTypeAndCount={this.getColumnNameDataTypeAndCount}
				pageData={this.state.pageData}
				ratData={this.props.ratData}
				mouseData={this.props.flyData}
				flyData={this.props.flyData}
				
        handleChangeEvent={this.handleChangeEvent}
        handleReactDropdownEvent={this.handleReactDropdownEvent}
			/>
		)
	}

	ReturnAboutPrograms = (props) => {
		return (
			<AboutPrograms 
				programData={this.props.wikiProgramData}
				contributorData={this.props.wikiContributorsData}
				handleChangeEvent={this.handleChangeEvent}
				parentState={this.state}
				{...props}
			/>
		)	
	}

	ReturnAboutDataUse = props => {
		return (
			<AboutDataUseRequirements 
				//dataUseRequirements={this.props.wikiDataUseData}
				{...props}
			/>
		)	
	}

  render(){
    return (
			<Router>
      <div className="row amp-ad">
				<Header />
        <div className="col-xs-12 main">
					<Route exact path="/" component={this.homeMarkup}/>
					<Route path="/Tools" component={Tools}/>
						<Route path="/Programs" component={this.ReturnAboutPrograms}/>
						<Route path="/Studies" component={AboutStudies}/>
						<Route path="/DataUseRequirements" component={this.ReturnAboutDataUse}/>
				</div>
				<footer className="row center-xs middle-xs">
					<div className="col-xs-12 col-sm-1">
						<a href="/">Forum</a>
					</div>
					<div className="col-xs-12 col-sm-1">
						<a href="/">Help</a>
					</div>
					<div className="col-xs-12 col-sm-2">
						<a href="/">Terms & Privacy</a>
					</div>
				</footer>
			</div>
			</Router>
    );
  }
}

export default App;
