import React, { Component } from "react"
import _ from "lodash"
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

class App extends Component {
  state = {
    buttonState: {
      assayButtonAll: false,
      tissueButtonAll: false,
    },
    pageData: study,
    studyTemplate: {},
    diagnosesSelectionOptions: [],
    speciesDropdownSelection: "All species",
    diagnosesDropdownSelection: "All diagnoses",
  };

  componentDidMount() {
    this.setAllPageDataPoints()
    this.setDiagnosesMenu()
    this.shrinkHeader()
  }

  componentDidUpdate() {
    // console.log(this.props.humanData);
  }

  shrinkHeader = () => {
    window.addEventListener(
      "scroll",
      _.debounce(() => {
        // lodash debounce method.
        const supportPageOffset = window.pageXOffset !== undefined
        const isCSS1Compat = (document.compatMode || "") === "CSS1Compat"
        const scroll = {
          x: supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
              ? document.documentElement.scrollLeft
              : document.body.scrollLeft,
          y: supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
              ? document.documentElement.scrollTop
              : document.body.scrollTop,
        }

        if (scroll.y > 50) {
          console.log(scroll.y)
          // 3000px (arbitrary - put whatever point you need there.)
          const element = document.querySelector("header") // target element to change attribute
          element.setAttribute(
            "class",
            "row between-xs header center-xs middle-xs squish",
          ) // change the attribute.

          const main = document.querySelector("div.main")
          main.classList.add("squish")
        }
        if (scroll.y < 50) {
          console.log(scroll.y)
          // 3000px (arbitrary - put whatever point you need there.)
          const element = document.querySelector("header") // target element to change attribute
          element.setAttribute(
            "class",
            "row between-xs header center-xs middle-xs",
          ) // change the attribute.
          const main = document.querySelector("div.main")
          main.classList.remove("squish")
        }
      }, 50),
    ) // ms
  };

  setDiagnosesMenu = () => {
    let selection = this.state.speciesDropdownSelection
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
    const diagnoses = this.props[selection].diagnosesList
    this.setState({
      diagnosesSelectionOptions: diagnoses,
    })
  };

  setFacetPageData = (key) => {
    let propKey = `${this.state.speciesDropdownSelection
      .toLowerCase()
      .replace(/\s/g, "")}Data`
    if (this.state.speciesDropdownSelection.toLowerCase() === "all species") {
      propKey = "allSpeciesData"
    }
    if (
      this.state.speciesDropdownSelection === "Drosophila melanogaster"
      || this.state.speciesDropdownSelection === "Fruit fly"
    ) {
      propKey = "flyData"
    }
    this.setSubFacet(key, propKey)
  };

  setSubFacet = (key, speciesKey) => {
    let stateObjectToAdd
    if (typeof this.props[speciesKey][key] === "object") {
      stateObjectToAdd = {
        count: this.props[speciesKey][key].length,
        facetValues: { ...this.props[speciesKey][key] },
      }
    } else stateObjectToAdd = this.props[speciesKey][key]
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
    pageDataPoints.forEach((element, index) => {
      this.setFacetPageData(element)
      this.setDiagnosesMenu()
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

  handleReactDropdownEvent = (event) => {
    // console.log(event)
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

  convertObjectValsToArray = (OBJECT) => {
    const mappedArray = []
    _.mapKeys(OBJECT, (value, key) => {
      if (value.value.length !== 41) {
        mappedArray.push(value.value)
      }
      return value.value
    })
    return mappedArray
  };

  getColumnNameDataTypeAndCount = (columnName, pathToDataObject) => {
    const mappedArray = []
    // console.log(columnName, pathToDataObject)
    if (pathToDataObject[columnName] !== undefined) {
      _.mapKeys(pathToDataObject[columnName].facetValues, (object) => {
        if (object.value === "org.sagebionetworks.UNDEFINED_NULL_NOTSET") {
          object.value = "not set"
        }
        const flatData = {
          count: object.count,
          value: object.value,
          base64Link: object.base64Link,
          table: object.table,
        }
        return mappedArray.push(flatData)
      })
    }
    return mappedArray
  };

  homeMarkup = () => (
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
  );

  ReturnAboutPrograms = props => (
    <AboutPrograms
      programData={this.props.wikiProgramData}
      contributorData={this.props.wikiContributorsData}
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

export default App
