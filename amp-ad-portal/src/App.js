import React, { Component } from "react"
import PropTypes from "prop-types"
import { HashRouter as Router, Route } from "react-router-dom"
import ReactGA from "react-ga"
import createHistory from "history/createBrowserHistory"

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
} from "./controller/PrepRawSynapseData"

import { getBioSampleCount } from "./queries/queryForData"

import asyncComponent from "./components/AsyncComponent"

// about pages
const AsyncAboutAmpAd = asyncComponent(() => import("./components/About-WhatIsAmpAd"))
const AsyncAboutPeople = asyncComponent(() => import("./components/About-People"))

// research pages
const AsyncProgramsM2OVE = asyncComponent(() => import("./components/Programs-M2OVE"))
const AsyncProgramsAmpAd = asyncComponent(() => import("./components/Programs-AMP-AD"))
const AsyncProgramsResilienceAD = asyncComponent(() => import("./components/Programs-ResilienceAD"))
const AsyncProgramsModelAD = asyncComponent(() => import("./components/Programs-ModelAD"))
const AsyncExternalResearchers = asyncComponent(() => import("./components/Research-ExternalResearchers"))
const AsyncResearchPublications = asyncComponent(() => import("./components/Research-Publications"))
const AsyncConsortiaDifferential = asyncComponent(() => import("./components/Consortia-DifferentialEx"))
const AsyncConsortiaGenetics = asyncComponent(() => import("./components/Consortia-Genetics"))
const AsyncConsortiaNetworks = asyncComponent(() => import("./components/Consortia-Networks"))

// resources pages
const AsyncResourcesData = asyncComponent(() => import("./components/Resources-Data"))
const AsyncResourcesAgora = asyncComponent(() => import("./components/Resources-Agora"))
const AsyncResourcesDataUse = asyncComponent(() => import("./components/Resources-DataUse"))
const AsyncResourcesExperimentalResources = asyncComponent(() => import("./components/Resources-Experimental-Resources"))
const AsyncResourcesStudies = asyncComponent(() => import("./components/Resources-Studies.jsx"))
const AsyncResourcesAcknowledgements = asyncComponent(() => import("./components/Resources-AcknowledgementStatements"))

// component js
const AsyncHome = asyncComponent(() => import("./components/Home"))
const AsyncHeader = asyncComponent(() => import("./components/Header"))

const pageDataPoints = ["assay", "tissue", "study", "dataType", "diagnoses"]

ReactGA.initialize("UA-29804340-3")

const history = createHistory()
history.listen((location) => {
  ReactGA.set({
    page: location.pathname + location.hash + location.search,
  })
  ReactGA.pageview(location.pathname + location.hash + location.search)
})

class App extends Component {
  state = {
    biosamplesLoading: true,
    filters: {
      assay: false,
      tissue: false,
    },
    pageData: study,
    diagnosesSelectionOptions: [
      "All diagnoses",
      "Alzheimer's Disease",
      "Amyothropic Lateral Sclerosis",
      "control",
      "Mild Cognitive Impairment",
      "other",
      "Parkinson's Disease",
      "Stroke Model",
      "AD Model",
      "Progressive Supranuclear Palsy",
      "Microglia-like Model",
    ],
    speciesDropdownSelection: "All species",
    diagnosesDropdownSelection: "All diagnoses",
    wikiMarkdown: "",
    welcomeHeaderMarkdown: "",
    welcomeHeaderMarkdownText: "",
    externalResearchers: [],
    researchPublications: [],
    studies: [],
    studiesWikiIds: [],
    studiesRows: [],
    studiesUniqueRows: [],
    studiesNames: [],
    studiesNamesPayload: {},
    studiesDataTypesPayload: {},
    studiesAssayIndex: 0,
    studiesStudyIndex: 0,
    studiesIndividualsIndex: 0,
    studiesSampleTypeIndex: 0,
    differentialExpressions: [],
    experimentalResources: "",
    programsAmpAd: [],
    programsM2OVE: [],
    programsModelAd: [],
    programsResilienceAD: [],
    whatsNew: [],
    hash: "",
  };

  componentDidMount() {
    this.setDiagnosesMenu(this.props, this.state)
    this.setPageDataPoints(pageDataPoints)
    this.queryAndSetBioSampleCount()
    this.setState({
      hash: window.location.hash,
    })
  }

  getSpeciesDropdownOptions = (rawData) => {
    const speciesDropdownOptions = []
    if (rawData !== undefined) {
      const speciesObj = rawData.facets.filter(
        row => row.columnName === "species",
      )
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
        newDiagnoses = diagnosesArray
      }
      diagnosesFilterKey = typeof newDiagnoses === "object" ? newDiagnoses : [newDiagnoses]
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
    if (dataType === "assay") {
      //console.log(speciesFilterKey)
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
    if (dataType === "assay") {
      //console.log(filteredRows)
    }
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

  queryForBioSamples = async (state, props) => {
    return getBioSampleCount(
      state.speciesDropdownSelection,
      state.diagnosesDropdownSelection,
      "syn12532774",
      props.loginToken,
    )
  };

  queryAndSetBioSampleCount = () => {
    ["assay", "tissue"].forEach((element) => {
      this.queryForBioSamples(this.state, this.props)
        .then((count) => {
          this.setBioSampleCount(parseInt(count, 10), element)
        })
        .then(() => {
          this.setState({
            biosamplesLoading: false,
          })
        })
    })
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleNestedChanges = (KEY, newStateKey, newState) => {
    //console.log(KEY, newStateKey, newState)
    const property = this.state[KEY]
    property.push({ [newStateKey]: newState })
    this.setState(prevState => ({
      ...prevState,
      property,
    }))
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
        biosamplesLoading: true,
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
        biosamplesLoading: true,
        [key]: event.target.value,
      },
      () => {
        this.setDiagnosesMenu(this.props, this.state)
        this.setPageDataPoints(pageDataPoints)
        this.queryAndSetBioSampleCount()
      },
    )
  };

  ReturnHome = () => {
    return (
      <AsyncHome
        setDiagnosesMenu={this.setDiagnosesMenu}
        speciesSelectionOptions={this.getSpeciesDropdownOptions(
          this.props.appData,
        )}
        biosamplesLoading={this.state.biosamplesLoading}
        welcomeHeaderMarkdown={this.state.welcomeHeaderMarkdown}
        welcomeHeaderMarkdownText={this.state.welcomeHeaderMarkdownText}
        token={this.props.loginToken}
        speciesDropdownSelection={this.state.speciesDropdownSelection}
        diagnosesSelectionOptions={this.state.diagnosesSelectionOptions}
        diagnosesDropdownSelection={this.state.diagnosesDropdownSelection}
        toggleSeeAll={this.toggleSeeAll}
        getSum={this.getSum}
        getColumnCountForSpecies={this.getColumnCountForSpecies}
        pageData={this.state.pageData}
        handleChanges={this.handleChanges}
        handleChangeEvent={this.handleChangeEvent}
        handleReactDropdownEvent={this.handleReactDropdownEvent}
        handleNestedChanges={this.handleNestedChanges}
        whatsNewMarkdownSegs={this.state.whatsNew}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnProgramsM2OVE = () => (
    <AsyncProgramsM2OVE
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsM2OVE}
    />
  );

  ReturnProgramsAmpAd = () => (
    <AsyncProgramsAmpAd
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsAmpAd}
    />
  );

  ReturnProgramsModelAD = () => (
    <AsyncProgramsModelAD
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsModelAd}
    />
  );

  ReturnProgramsResilienceAD = () => (
    <AsyncProgramsResilienceAD
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsResilienceAD}
    />
  );

  ReturnExternalResearchers = () => {
    return (
      <AsyncExternalResearchers
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.externalResearchers}
      />
    )
  };

  ReturnResearchPublications = () => {
    return (
      <AsyncResearchPublications
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
      />
    )
  };

  ReturnResourcesData = () => {
    return (
      <AsyncResourcesData
        biosamplesLoading={this.state.biosamplesLoading}
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
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
    )
  };

  ReturnResourcesAgora = () => {
    return (
      <AsyncResourcesAgora
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
      />
    )
  };

  ReturnResourcesAcknowledgements = () => {
    return (
      <AsyncResourcesAcknowledgements
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResourcesDataUse = () => {
    return (
      <AsyncResourcesDataUse
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResourcesExperimentalResources = () => {
    return (
      <AsyncResourcesExperimentalResources
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.experimentalResources}
      />
    )
  };

  ReturnResourcesStudies = () => {
    return (
      <AsyncResourcesStudies
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.studies}
        wikiIds={this.state.studiesWikiIds}
        studiesRows={this.state.studiesRows}
        assayIndex={this.state.studiesAssayIndex}
        studyIndex={this.state.studiesStudyIndex}
        individualsIndex={this.state.studiesIndividualsIndex}
        sampleTypeIndex={this.state.studiesSampleTypeIndex}
        uniqueStudiesRows={this.state.studiesUniqueRows}
        studiesNames={this.state.studiesNames}
        dataTypesPayload={this.state.studiesDataTypesPayload}
        namesPayload={this.state.studiesNamesPayload}
      />
    )
  };

  ReturnConsortiaDifferential = () => {
    return (
      <AsyncConsortiaDifferential
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnConsortiaGenetics = () => {
    return (
      <AsyncConsortiaGenetics
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnConsortiaNetworks = () => {
    return (
      <AsyncConsortiaNetworks
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AsyncAboutAmpAd
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnAboutPeople = () => {
    return (
      <AsyncAboutPeople
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
      />
    )
  };

  ReturnHeader = () => {
    return (
      <AsyncHeader handleChanges={this.handleChanges} hash={this.state.hash} />
    )
  };

  main = () => {
    return (
      <div>
        <Route exact path="/" component={this.ReturnHome} />

        <Route path="/Research/AMP-AD" component={this.ReturnProgramsAmpAd} />
        <Route path="/Research/M2OVE" component={this.ReturnProgramsM2OVE} />
        <Route
          path="/Research/Model-AD"
          component={this.ReturnProgramsModelAD}
        />
        <Route
          path="/Research/Resilience-AD"
          component={this.ReturnProgramsResilienceAD}
        />
        <Route
          path="/Research/ExternalResearchers"
          component={this.ReturnExternalResearchers}
        />
        <Route
          path="/Research/Publications"
          component={this.ReturnResearchPublications}
        />
        <Route
          path="/Research/DifferentialExpression"
          component={this.ReturnConsortiaDifferential}
        />
        <Route
          path="/Research/Genetics"
          component={this.ReturnConsortiaGenetics}
        />
        <Route
          path="/Research/Networks"
          component={this.ReturnConsortiaNetworks}
        />

        <Route path="/Resources/Data" component={this.ReturnResourcesData} />
        <Route path="/Resources/Agora" component={this.ReturnResourcesAgora} />
        <Route
          path="/Resources/DataUseRequirements"
          component={this.ReturnResourcesDataUse}
        />
        <Route
          path="/Resources/AcknowledgementStatements"
          component={this.ReturnResourcesAcknowledgements}
        />
        <Route
          path="/Resources/ExperimentalResources"
          component={this.ReturnResourcesExperimentalResources}
        />
        <Route
          path="/Resources/Studies"
          component={this.ReturnResourcesStudies}
        />

        <Route path="/About/AMP-AD" component={this.ReturnAboutAmpAd} />
        <Route path="/About/People" component={this.ReturnAboutPeople} />
      </div>
    )
  };

  render() {
    return (
      <Router>
        <div className="container">
          <div className="row amp-ad">
            <this.ReturnHeader />

            <div className="main">
              <h2>main content</h2>
            </div>

            <footer>
              <div className="container">
                <div className="row">
                  <a href="https://www.synapse.org/#!Synapse:syn2580853/discussion/default">
                    Forum
                  </a>
                  <a href="mailto:ampadportal@sagebionetworks.org">Contact</a>
                  <a href="http://docs.synapse.org/articles/governance.html">
                    Terms & Privacy
                  </a>
                </div>
              </div>
            </footer>
          </div>
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
