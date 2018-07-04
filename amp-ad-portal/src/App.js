import React, { Component } from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route } from "react-router-dom"

// non component js
import study from "./defaultData/Study"
import {
  gatherCounts,
  reduceCountsByKey,
  filterByKey,
  filterByValue,
  filterBySpecies,
  setBase64Link,
  keysToValues,
  printNames,
  filterRowsByKeyAndValue,
  countBioSamples,
} from "./controller/PrepRawSynapseData"

import { getBioSampleCount } from "./queries/queryForData"

// component js
import Header from "./Header"
import Home from "./Home"
import Tools from "./Tools"
import AboutPrograms from "./AboutPrograms"
import AboutStudies from "./AboutStudies"
import AboutDataUseRequirements from "./AboutDataUseRequirements"

// scripts
import { shrinkHeader } from "./view/domScripts"

class App extends Component {
  state = {
    filters: {
      assay: false,
      tissue: false,
    },
    pageData: study,
    studyTemplate: {},
    diagnosesSelectionOptions: [],
    speciesDropdownSelection: "All species",
    diagnosesDropdownSelection: "All diagnoses",
  };

  componentDidMount() {
    this.setAllPageDataPoints()
    this.setDiagnosesMenu(this.props, this.state)
    shrinkHeader()
  }

  componentDidUpdate() {}

  getSpeciesDropdownOptions = (rawData) => {
    const speciesDropdownOptions = []
    const speciesObj = rawData.facets.filter(
      row => row.columnName === "species",
    )
    speciesObj[0].facetValues.forEach((element) => {
      speciesDropdownOptions.push(element.value)
    })
    speciesDropdownOptions[0] = "All species"
    return speciesDropdownOptions
  };

  setDiagnosesMenu = (props, state) => {
    let selection = state.speciesDropdownSelection
    if (selection === "All species") {
      selection = null
    }
    const diagnosesRows = filterByValue(
      filterByKey(this.props.appData, "diagnoses"),
      [selection],
    )
    let diagnosesList = keysToValues(diagnosesRows)
    diagnosesList = reduceCountsByKey(diagnosesList, "diagnoses")

    const diagnoses = printNames(diagnosesList, "diagnoses")
    diagnoses.splice(0, 0, "All diagnoses")

    this.setState({
      diagnosesSelectionOptions: diagnoses,
    })
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
      speciesFilterKey = [
        null,
        "Rat",
        "Human",
        "Mouse",
        "Human Cell Line",
        "Fruit fly",
      ]
    } else {
      speciesFilterKey = [species]
    }

    const speciesFiltered = filterRowsByKeyAndValue(
      keysToValues(dataObject.queryResult.queryResults.rows),
      speciesFilterKey,
      "species",
    )
    //console.log(reduceCountsByKey(speciesFiltered, "assay"))

    let diagnosesFilterKey
    if (diagnoses === "All diagnoses") {
      diagnosesArray.splice(0, 0, null)
      diagnosesFilterKey = diagnosesArray
    } else {
      diagnosesFilterKey = [diagnoses]
    }
    //console.log(diagnosesFilterKey)

    const filteredRows = reduceCountsByKey(
      setBase64Link(
        filterRowsByKeyAndValue(
          speciesFiltered,
          diagnosesFilterKey,
          "diagnoses",
        ),
      ),
      dataType,
    )

    //console.log(dataType, filteredRows)

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

  queryForBioSamples = (state, props) => {
    return getBioSampleCount(
      state.speciesDropdownSelection,
      "syn12532774",
      props.loginToken,
    )
  };

  setBioSampleCount = (newCount, pageKey) => {
    const stateKey = `biosamples${pageKey}Count`
    this.setState(prevState => ({
      ...prevState,
      pageData: { ...prevState.pageData, [stateKey]: newCount },
    }))
  };

  setAllPageDataPoints = () => {
    const pageDataPoints = [
      "assay",
      "tissue",
      "diagnoses",
      "species",
      //"biosamplesCount",
      "diagnosesAssay",
      "diagnosesTissue",
    ]
    pageDataPoints.forEach((element) => {
      this.setFlattenedData(
        element,
        this.state.speciesDropdownSelection,
        this.props.appData,
        this.state.diagnosesDropdownSelection,
        this.state.diagnosesSelectionOptions,
      )
      //this.setFacetPageData(element, this.state)
      this.setDiagnosesMenu(this.props, this.state)
      this.queryForBioSamples(this.state, this.props).then((count) => {
        this.setBioSampleCount(parseInt(count, 10), element)
      })
    })
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

  setSelection = (STATE, stateKey, prependValue) => {
    const selectionObject = STATE.facetValues
    const selectionArray = this.convertObjectValsToArray(selectionObject)
    if (prependValue) {
      selectionArray.unshift(prependValue)
    }
    this.handleChanges(stateKey, selectionArray)
  };

  convertObjectValsToArray = (OBJECT) => {
    const mappedArray = []
    _.mapKeys(OBJECT, (value) => {
      if (value.value.length !== 41) {
        mappedArray.push(value.value)
      }
      return value.value
    })
    return mappedArray
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleChangeEvent = (event) => {
    const key = event.target.name
    this.setState(
      {
        [key]: event.target.value,
      },
      () => {
        this.setAllPageDataPoints()
      },
    )
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
        this.setAllPageDataPoints()
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
      // buttonState={this.state.buttonState}
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
            <Route path="/Tools" component={Tools} />
            <Route path="/Programs" component={this.ReturnAboutPrograms} />
            <Route path="/Studies" component={AboutStudies} />
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
  allSpeciesData: PropTypes.object.isRequired,
  humanData: PropTypes.object.isRequired,
  ratData: PropTypes.object.isRequired,
  mouseData: PropTypes.object.isRequired,
  humancelllineData: PropTypes.object.isRequired,
  flyData: PropTypes.object.isRequired,
  speciesSelection: PropTypes.array.isRequired,
  appData: PropTypes.object.isRequired,
}

export default App
