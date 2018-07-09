import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route } from "react-router-dom"

// non component js
import study from "./defaultData/Study"
import {
  reduceCountsByKey,
  filterByKey,
  filterByValue,
  setBase64Link,
  keysToValues,
  printNames,
  filterRowsByKeyAndValue,
  //countBioSamples,
  //gatherCounts,
  //filterBySpecies,
} from "./controller/PrepRawSynapseData"

import { getBioSampleCount } from "./queries/queryForData"

// component js
// import all components for use with react router
import Header from "./Header"
import Home from "./Home"
import AboutPrograms from "./AboutPrograms"
import AboutStudies from "./AboutStudies"
import AboutDataUseRequirements from "./AboutDataUseRequirements"

import ProgramsAmpAd from "./components/Programs-AMP-AD"
import ProgramsM2OVE from "./components/Programs-M2OVE"
import ProgramsResilienceAD from "./components/Programs-ResilienceAD"
import ProgramsModelAD from "./components/Programs-ModelAD"

// scripts
import { shrinkHeader } from "./view/domScripts"

const pageDataPoints = ["assay", "tissue", "dataType", "diagnoses"]

class App extends Component {
  state = {
    filters: {
      assay: false,
      tissue: false,
    },
    pageData: study,
    diagnosesSelectionOptions: [],
    speciesDropdownSelection: "All species",
    diagnosesDropdownSelection: "All diagnoses",
  };

  componentDidMount() {
    this.setDiagnosesMenu(this.props, this.state)
    this.setPageDataPoints(pageDataPoints)
    this.queryAndSetBioSampleCount()
    shrinkHeader()
  }

  componentDidUpdate() {}

  getSpeciesDropdownOptions = (rawData) => {
    const speciesDropdownOptions = []
    if (rawData !== undefined) {
      const speciesObj = rawData.facets.filter(
        row => row.columnName === "species",
      )
      console.log(speciesObj)
      speciesObj[0].facetValues.forEach((element) => {
        speciesDropdownOptions.push(element.value)
      })
      speciesDropdownOptions[0] = "All species"
    }
    return speciesDropdownOptions
  };

  getDiagnosesDropdownOptions = (rawData, species) => {
    const diagnosesRows = filterByValue(filterByKey(rawData, "diagnosis"), [
      species,
    ])
    let diagnosesList = reduceCountsByKey(
      keysToValues(diagnosesRows),
      "diagnoses",
    )
    diagnosesList = printNames(diagnosesList, "diagnoses")
    return diagnosesList
  };

  setDiagnosesMenu = (props, state) => {
    let selection = state.speciesDropdownSelection
    if (selection === "All species") {
      selection = null
    }

    const diagnoses = this.getDiagnosesDropdownOptions(
      this.props.appData,
      selection,
    )
    diagnoses.splice(0, 0, "All diagnoses")

    this.handleChanges("diagnosesSelectionOptions", diagnoses)
  };

  returnAllSpeciesArray = () => {
    return [null, "Rat", "Human", "Mouse", "Human Cell Line", "Fruit fly"]
  };

  convertUserDiagnosesSelection = (diagnoses, diagnosesArray) => {
    let diagnosesFilterKey
    if (diagnoses === "All diagnoses" && diagnosesArray[0] !== null) {
      diagnosesArray.splice(0, 0, null)
      diagnosesFilterKey = diagnosesArray
    } else {
      let newDiagnoses = diagnoses
      if (diagnoses === "All diagnoses") {
        newDiagnoses = null
      }
      diagnosesFilterKey = [newDiagnoses]
    }
    return diagnosesFilterKey
  };

  filterRowsAndAddBase64Link = (
    speciesDataFiltered,
    diagnosesFilterKey,
    dataType,
  ) => {
    return reduceCountsByKey(
      setBase64Link(
        filterRowsByKeyAndValue(
          speciesDataFiltered,
          diagnosesFilterKey,
          "diagnoses",
        ),
      ),
      dataType,
    )
  };

  setMainDropdownFilter = (
    species,
    diagnoses,
    dataObject,
    diagnosesArray,
    dataType,
  ) => {
    let speciesFilterKey
    if (species === "All species") {
      speciesFilterKey = this.returnAllSpeciesArray()
    } else {
      speciesFilterKey = [species]
    }

    const speciesFiltered = filterRowsByKeyAndValue(
      keysToValues(dataObject.queryResult.queryResults.rows),
      speciesFilterKey,
      "species",
    )

    const diagnosesFilterKey = this.convertUserDiagnosesSelection(
      diagnoses,
      diagnosesArray,
    )

    const filteredRows = this.filterRowsAndAddBase64Link(
      speciesFiltered,
      diagnosesFilterKey,
      dataType,
    )
    return filteredRows
  };

  setFlattenedData = (
    pageKey,
    speciesKey,
    dataObject,
    diagnosesKey,
    diagnosesArray,
  ) => {
    const chartPageData = this.setMainDropdownFilter(
      speciesKey,
      diagnosesKey,
      dataObject,
      diagnosesArray,
      pageKey,
    )

    const stateObjectToAdd = {
      count: chartPageData.length,
      facetValues: [...chartPageData],
    }

    this.setState(prevState => ({
      ...prevState,
      pageData: { ...prevState.pageData, [pageKey]: stateObjectToAdd },
    }))
  };

  setBioSampleCount = (newCount, pageKey) => {
    const stateKey = `biosamples${pageKey}Count`
    this.setState(prevState => ({
      ...prevState,
      pageData: { ...prevState.pageData, [stateKey]: newCount },
    }))
  };

  setPageDataPoints = (dataPoints) => {
    if (this.props.appData !== undefined) {
      dataPoints.forEach((element) => {
        this.setFlattenedData(
          element,
          this.state.speciesDropdownSelection,
          this.props.appData,
          this.state.diagnosesDropdownSelection,
          this.state.diagnosesSelectionOptions,
        )
      })
    }
  };

  getSum = (total, num) => total + num;

  getColumnCountForSpecies = (speciesPropName, columnName) => {
    let totalCounts = []
    speciesPropName.facets.forEach((element) => {
      if (element.columnName === columnName) {
        totalCounts.push(element.facetValues.length)
      }
    })
    totalCounts = totalCounts.reduce(this.getSum)
    return totalCounts
  };

  queryForBioSamples = (state, props) => {
    return getBioSampleCount(
      state.speciesDropdownSelection,
      "syn12532774",
      props.loginToken,
    )
  };

  queryAndSetBioSampleCount = () => {
    ["assay", "tissue"].forEach((element) => {
      this.queryForBioSamples(this.state, this.props).then((count) => {
        this.setBioSampleCount(parseInt(count, 10), element)
      })
    })
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  toggleSeeAll = (event) => {
    const key = event.target.name
    const value = event.target.dataset.value === "false"
    this.setState(prevState => ({
      ...prevState,
      buttonState: {
        ...prevState.buttonState,
        [key]: value,
      },
    }))
  };

  handleReactDropdownEvent = (event) => {
    const key = event.value[0]
    this.setState(
      {
        [key]: event.label,
      },
      () => {
        this.setDiagnosesMenu(this.props, this.state)
        this.setPageDataPoints(pageDataPoints)
        this.queryAndSetBioSampleCount()
      },
    )
  };

  handleChangeEvent = (event) => {
    const key = event.target.name
    this.setState(
      {
        [key]: event.target.value,
      },
      () => {
        this.setDiagnosesMenu(this.props, this.state)
        this.setPageDataPoints(pageDataPoints)
        this.queryAndSetBioSampleCount()
      },
    )
  };

  homeMarkup = () => (
    <Home
      setDiagnosesMenu={this.setDiagnosesMenu}
      speciesSelectionOptions={this.getSpeciesDropdownOptions(
        this.props.appData,
      )}
      speciesDropdownSelection={this.state.speciesDropdownSelection}
      diagnosesSelectionOptions={this.state.diagnosesSelectionOptions}
      diagnosesDropdownSelection={this.state.diagnosesDropdownSelection}
      toggleSeeAll={this.toggleSeeAll}
      getSum={this.getSum}
      getColumnCountForSpecies={this.getColumnCountForSpecies}
      pageData={this.state.pageData}
      handleChangeEvent={this.handleChangeEvent}
      handleReactDropdownEvent={this.handleReactDropdownEvent}
    />
  );

  ReturnAboutPrograms = props => (
    <AboutPrograms
      // programData={this.props.wikiProgramData}
      // contributorData={this.props.wikiContributorsData}
      handleChangeEvent={this.handleChangeEvent}
      parentState={this.state}
      {...props}
    />
  );

  ReturnAboutDataUse = props => (
    <AboutDataUseRequirements
      // dataUseRequirements={this.props.wikiDataUseData}
      {...props}
    />
  );

  render() {
    return (
      <Router>
        <div className="row amp-ad">
          <Header />
          <div className="col-xs-12 main">
            <Route exact path="/" component={this.homeMarkup} />

            <Route path="/Research/AMP-AD" component={ProgramsAmpAd} />
            <Route path="/Research/M2OVE" component={ProgramsM2OVE} />
            <Route path="/Research/Model-AD" component={ProgramsModelAD} />
            <Route
              path="/Research/Resilience-AD"
              component={ProgramsResilienceAD}
            />

            <Route path="/About/" component={AboutStudies} />
            <Route
              path="/DataUseRequirements"
              component={this.ReturnAboutDataUse}
            />
          </div>
          <footer className="row center-xs middle-xs">
            <div className="col-xs-12 col-sm-1">
              <a href="/">
Forum
              </a>
            </div>
            <div className="col-xs-12 col-sm-1">
              <a href="/">
Contact
              </a>
            </div>
            <div className="col-xs-12 col-sm-1">
              <a href="/">
Help
              </a>
            </div>
            <div className="col-xs-12 col-sm-2">
              <a href="/">
Terms & Privacy
              </a>
            </div>
          </footer>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  loginToken: PropTypes.object.isRequired,
  appData: PropTypes.object.isRequired,
}

export default App
