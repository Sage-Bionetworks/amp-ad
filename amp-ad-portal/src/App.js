import React, { Component } from "react"
import _ from "lodash"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Route } from "react-router-dom"

// non component js
import study from "./defaultData/Study"

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

  setDiagnosesMenu = (props, state) => {
    let selection = state.speciesDropdownSelection
    if (selection === "All species") {
      selection = "allSpecies"
    }
    if (selection === "Drosophila melanogaster" || selection === "Fruit fly") {
      selection = "fly"
    }
    if (selection !== "allSpecies") {
      selection = selection.toLowerCase()
    }
    selection = selection.replace(/\s/g, "")
    selection += "Data"
    const diagnoses = props[selection].diagnosesList
    this.setState({
      diagnosesSelectionOptions: diagnoses,
    })
  };

  setFacetPageData = (key, state) => {
    let propKey = `${state.speciesDropdownSelection
      .toLowerCase()
      .replace(/\s/g, "")}Data`
    if (state.speciesDropdownSelection.toLowerCase() === "all species") {
      propKey = "allSpeciesData"
    }
    if (
      state.speciesDropdownSelection === "Drosophila melanogaster"
      || state.speciesDropdownSelection === "Fruit fly"
    ) {
      propKey = "flyData"
    }
    this.setSubFacet(key, propKey, this.props)
  };

  setSubFacet = (key, speciesKey, props) => {
    let stateObjectToAdd
    if (typeof props[speciesKey][key] === "object") {
      stateObjectToAdd = {
        count: props[speciesKey][key].length,
        facetValues: { ...props[speciesKey][key] },
      }
    } else stateObjectToAdd = props[speciesKey][key]
    this.setState(prevState => ({
      ...prevState,
      pageData: { ...prevState.pageData, [key]: stateObjectToAdd },
    }))
  };

  setAllPageDataPoints = () => {
    const pageDataPoints = [
      "assay",
      "tissue",
      "diagnoses",
      "species",
      "biosamplesCount",
      "diagnosesAssay",
      "diagnosesTissue",
    ]
    pageDataPoints.forEach((element) => {
      this.setFacetPageData(element, this.state)
      this.setDiagnosesMenu(this.props, this.state)
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

  getColumnNameDataTypeAndCount = (columnName, pathToDataObject) => {
    const mappedArray = []
    if (pathToDataObject[columnName] !== undefined) {
      _.mapKeys(pathToDataObject[columnName].facetValues, (obj) => {
        const flatData = {
          count: obj.count,
          value:
            obj.value === "org.sagebionetworks.UNDEFINED_NULL_NOTSET"
              ? "not set"
              : obj.value,
          base64Link: obj.base64Link,
          table: obj.table,
        }
        return mappedArray.push(flatData)
      })
    }
    return mappedArray
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
      speciesSelectionOptions={this.props.speciesSelection}
      speciesDropdownSelection={this.state.speciesDropdownSelection}
      diagnosesSelectionOptions={this.state.diagnosesSelectionOptions}
      diagnosesDropdownSelection={this.state.diagnosesDropdownSelection}
      toggleSeeAll={this.toggleSeeAll}
      // buttonState={this.state.buttonState}
      getSum={this.getSum}
      getColumnCountForSpecies={this.getColumnCountForSpecies}
      getColumnNameDataTypeAndCount={this.getColumnNameDataTypeAndCount}
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
}

export default App
