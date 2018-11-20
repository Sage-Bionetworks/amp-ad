import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import ReactGA from "react-ga"
import createHistory from "history/createBrowserHistory"

import * as SynapseClient from "./synapse/SynapseClient"

// non component js
import study from "./defaultData/Study"

import asyncComponent from "./components/AsyncComponent"

const login = async () => SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  return keys
})

// about pages
const AsyncAboutAmpAd = asyncComponent(() => import("./components/About-WhatIsAmpAd"))
// research pages
const AsyncResearchPublications = asyncComponent(() => import("./components/Research-Publications"))
// resources pages
const AsyncInstructions = asyncComponent(() => import("./components/DataAccess-Instructions"))
// component js
const AsyncHome = asyncComponent(() => import("./components/Home"))
const AsyncHeader = asyncComponent(() => import("./components/Header"))
// explore
const AsyncExplore = asyncComponent(() => import("./components/Explore.jsx"))
// study page
const AsyncStudyPage = asyncComponent(() => import("./components/Page-Study.js"))
// Data access pages
const AsyncDataUseCertificates = asyncComponent(() => import("./components/DataAccess-DataUseCertificates.js"))
const AsyncResearchTools = asyncComponent(() => import("./components/ResearchTools"))
const AsyncResourcesAcknowledgements = asyncComponent(() => import("./components/Resources-AcknowledgementStatements"))

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
    loginToken: {},
    pageData: study,
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
    login().then(token => this.handleChanges("loginToken", token))

    this.setState({
      hash: window.location.hash,
    })
  }

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

  ReturnHome = () => {
    return (
      <AsyncHome
        welcomeHeaderMarkdown={this.state.welcomeHeaderMarkdown}
        welcomeHeaderMarkdownText={this.state.welcomeHeaderMarkdownText}
        token={this.state.loginToken}
        toggleSeeAll={this.toggleSeeAll}
        handleChanges={this.handleChanges}
        handleChangeEvent={this.handleChangeEvent}
        handleNestedChanges={this.handleNestedChanges}
        whatsNewMarkdownSegs={this.state.whatsNew}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResearchPublications = () => {
    return (
      <AsyncResearchPublications
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.researchPublications}
      />
    )
  };

  ReturnResourcesAcknowledgements = () => {
    return <AsyncResourcesAcknowledgements token={this.state.loginToken} />
  };

  ReturnDataUseCertificates = () => {
    return <AsyncDataUseCertificates token={this.state.loginToken} />
  };

  ReturnInstructions = () => {
    return (
      <AsyncInstructions
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnResearchTools = () => {
    return (
      <AsyncResearchTools
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.experimentalResources}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AsyncAboutAmpAd
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        //handleNestedChanges={this.handleNestedChanges}
        //markdown={this.state.wikiMarkdown}
      />
    )
  };

  ReturnHeader = () => {
    return (
      <AsyncHeader handleChanges={this.handleChanges} hash={this.state.hash} />
    )
  };

  ReturnExplore = (props) => {
    return (
      <AsyncExplore
        token={this.state.loginToken.sessionToken}
        history={props.history}
      />
    )
  };

  ReturnStudyPage = (props) => {
    return (
      <AsyncStudyPage
        token={this.state.loginToken.sessionToken}
        hash={window.location.hash}
        match={props.match}
        history={props.history}
      />
    )
  };

  Main = () => {
    return (
      <div>
        <Route exact path="/" component={this.ReturnHome} />

        <Route path="/Resources/Data" component={this.ReturnResourcesData} />

        <Route
          path="/DataAccess/Instructions"
          component={this.ReturnInstructions}
        />
        <Route
          path="/DataAccess/AcknowledgementStatements"
          component={this.ReturnResourcesAcknowledgements}
        />
        <Route
          path="/DataAccess/DataUseCertificates"
          component={this.ReturnDataUseCertificates}
        />

        <Route path="/ResearchTools" component={this.ReturnResearchTools} />

        <Route
          path="/Resources/Studies"
          component={this.ReturnResourcesStudies}
        />
        <Route path="/Explore" component={this.ReturnExplore} />
        <Route
          path="/Explore/Studies/:handle"
          component={this.ReturnStudyPage}
        />

        <Route path="/About/AMP-AD" component={this.ReturnAboutAmpAd} />
      </div>
    )
  };

  render() {
    return (
      <Router>
        <div className="row amp-ad">
          <this.ReturnHeader />

          <div className="main">
            <this.Main />
          </div>

          <footer>
            <div className="container">
              <div className="row center-block col-centered">
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
      </Router>
    )
  }
}

export default App
