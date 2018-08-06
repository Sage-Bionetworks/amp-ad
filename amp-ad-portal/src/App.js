import React, { Component } from "react"
import PropTypes from "prop-types"
import { HashRouter as Router, Route } from "react-router-dom"

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

// component js
import Header from "./Header"
import Home from "./Home"

// research pages
import ProgramsAmpAd from "./components/Programs-AMP-AD"
import ProgramsM2OVE from "./components/Programs-M2OVE"
import ProgramsResilienceAD from "./components/Programs-ResilienceAD"
import ProgramsModelAD from "./components/Programs-ModelAD"
import ExternalResearchers from "./components/Research-ExternalResearchers"
import ResearchPublications from "./components/Research-Publications"
import ConsortiaDifferential from "./components/Consortia-DifferentialEx"
import ConsortiaGenetics from "./components/Consortia-Genetics"
import ConsortiaNetworks from "./components/Consortia-Networks"

// resources pages
import ResourcesData from "./components/Resources-Data"
import ResourcesAgora from "./components/Resources-Agora"
import ResourcesDataUse from "./components/Resources-DataUse"
import ResourcesExperimentalResources from "./components/Resources-Experimental-Resources"
import ResourcesStudies from "./components/Resources-Studies.jsx"
import ResourcesAcknowledgements from "./components/Resources-AcknowledgementStatements"

// about pages
import AboutAmpAd from "./components/About-WhatIsAmpAd"
import AboutPeople from "./components/About-People"

// scripts
import { setActiveNavigation, shrinkHeader } from "./view/domScripts"

const pageDataPoints = ["assay", "tissue", "study", "dataType", "diagnoses"]

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
    differentialExpressions: [],
    experimentalResources: [],
    programsAmpAd: [],
    programsM2OVE: [],
    programsModelAd: [],
    programsResilienceAD: [],
  };

  componentDidMount() {
    this.setDiagnosesMenu(this.props, this.state)
    this.setPageDataPoints(pageDataPoints)
    this.queryAndSetBioSampleCount()
    shrinkHeader()
    setActiveNavigation()
    console.log(this.props.appData)
  }

  componentDidUpdate() {
    setActiveNavigation()
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
    console.log(speciesFilterKey)

    const speciesFiltered = filterRowsByKeyAndValue(
      keysToValues(dataObject.queryResult.queryResults.rows),
      speciesFilterKey,
      "species",
    )

    console.log(speciesFiltered)

    const diagnosesFilterKey = this.convertUserDiagnosesSelection(
      diagnoses,
      diagnosesArray,
    )

    console.log(diagnosesFilterKey)

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

    if (pageKey === "assay") {
      console.log(
        "assay",
        speciesKey,
        diagnosesKey,
        diagnosesArray,
        pageKey,
        stateObjectToAdd,
      )
    }
    if (pageKey === "tissue") {
      console.log(
        "tissue",
        speciesKey,
        diagnosesKey,
        diagnosesArray,
        pageKey,
        stateObjectToAdd,
      )
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
    //console.log(this.state.diagnosesSelectionOptions)
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

  homeMarkup = () => (
    <Home
      setDiagnosesMenu={this.setDiagnosesMenu}
      speciesSelectionOptions={this.getSpeciesDropdownOptions(
        this.props.appData,
      )}
      biosamplesLoading={this.state.biosamplesLoading}
      welcomeHeaderMarkdown={this.state.welcomeHeaderMarkdown}
      welcomeHeaderMarkdownText={this.state.welcomeHeaderMarkdownText}
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
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

  ReturnProgramsM2OVE = () => (
    <ProgramsM2OVE
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsM2OVE}
    />
  );

  ReturnProgramsAmpAd = () => (
    <ProgramsAmpAd
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsAmpAd}
    />
  );

  ReturnProgramsModelAD = () => (
    <ProgramsModelAD
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsModelAd}
    />
  );

  ReturnProgramsResilienceAD = () => (
    <ProgramsResilienceAD
      token={this.props.loginToken}
      handleChanges={this.handleChanges}
      handleNestedChanges={this.handleNestedChanges}
      markdown={this.state.wikiMarkdown}
      markdownSegs={this.state.programsResilienceAD}
    />
  );

  ReturnExternalResearchers = () => {
    return (
      <ExternalResearchers
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.externalResearchers}
      />
    )
  };

  ReturnResearchPublications = () => {
    return (
      <ResearchPublications
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
      />
    )
  };

  ReturnResourcesData = () => {
    return (
      <ResourcesData
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
      <ResourcesAgora
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
      />
    )
  };

  ReturnResourcesAcknowledgements = () => {
    return (
      <ResourcesAcknowledgements
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResourcesDataUse = () => {
    return (
      <ResourcesDataUse
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResourcesExperimentalResources = () => {
    return (
      <ResourcesExperimentalResources
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.experimentalResources}
      />
    )
  };

  ReturnResourcesStudies = () => {
    return (
      <ResourcesStudies
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.studies}
      />
    )
  };

  ReturnConsortiaDifferential = () => {
    return (
      <ConsortiaDifferential
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnConsortiaGenetics = () => {
    return (
      <ConsortiaGenetics
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnConsortiaNetworks = () => {
    return (
      <ConsortiaNetworks
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AboutAmpAd
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnAboutPeople = () => {
    return (
      <AboutPeople
        token={this.props.loginToken}
        handleChanges={this.handleChanges}
      />
    )
  };

  render() {
    return (
      <Router>
        <div className="row amp-ad">
          <Header />
          <div className="col-xs-12 main">
            <Route exact path="/" component={this.homeMarkup} />

            <Route
              path="/Research/AMP-AD"
              component={this.ReturnProgramsAmpAd}
            />
            <Route
              path="/Research/M2OVE"
              component={this.ReturnProgramsM2OVE}
            />
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

            <Route
              path="/Resources/Data"
              component={this.ReturnResourcesData}
            />
            <Route
              path="/Resources/Agora"
              component={this.ReturnResourcesAgora}
            />
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

          <footer className="row center-xs middle-xs">
            <a href="https://www.synapse.org/#!Synapse:syn2580853/discussion/default">
              Forum
            </a>
            <a href="mailto:ampadportal@sagebionetworks.org">
Contact
            </a>
            <a href="http://docs.synapse.org/articles/governance.html">
              Terms & Privacy
            </a>
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
