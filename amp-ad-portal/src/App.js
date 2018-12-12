import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import ReactGA from "react-ga"
import createHistory from "history/createBrowserHistory"
import {
  SynapseComponents,
  SynapseConstants,
  SynapseClient,
} from "synapse-react-client"
//import SynapseClient from "sy"

// non component js
import asyncComponent from "./components/AsyncComponent"
import ScrollToTop from "./components/ScrollToTop"

// to load default json
import { getStaticJSON } from "./queries/queryForData"

// about pages
const AsyncAboutAmpAd = asyncComponent(() => import("./components/About-WhatIsAmpAd"))
// component js
const AsyncHome = asyncComponent(() => import("./components/Home"))
const AsyncHeader = asyncComponent(() => import("./components/Header"))
const Footer = asyncComponent(() => import("./components/Footer"))
// explore
const AsyncExplore = asyncComponent(() => import("./components/Explore.jsx"))
// study page
const AsyncStudyPage = asyncComponent(() => import("./components/Page-Study.js"))
// program page
const AsyncProgramPage = asyncComponent(() => import("./components/Page-Program.jsx"))
// Data access pages
const AsyncInstructions = asyncComponent(() => import("./components/DataAccess-Instructions"))
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
    wikiMarkdown: "",
    whatsNew: [],
    hash: "",
    defaultData: {},
    synapseLoaded: true,
  };

  componentDidMount() {
    this.login()
      .then((token) => {
        if (!token) {
          this.handleChanges("synapseLoaded", false)
          return false
        }
        this.handleChanges("loginToken", token)
        this.handleChanges("synapseLoaded", true)
        return true
      })
      .then((response) => {
        if (!response) {
          console.log("getting backup data")
          getStaticJSON(
            "syn17024173",
            "defaultData",
            this.handleNestedChangesObj,
          )
          getStaticJSON(
            "syn17024229",
            "defaultData",
            this.handleNestedChangesObj,
          )
          getStaticJSON("whatsNew", "defaultData", this.handleNestedChangesObj)
          getStaticJSON(
            "explorePublications",
            "defaultData",
            this.handleNestedChangesObj,
          )
        }
      })

    this.setState({
      hash: window.location.hash,
    })
  }

  login = async () => SynapseClient.login("mikeybkats", "guinness")
    .then((response) => {
      let key = {}
      if (response.sessionToken) {
        key = response
      }
      return key
    })
    .catch(() => {
      return false
    });

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
  };

  handleNestedChangesObj = (KEY, newStateKey, newState) => {
    // this function lets you declare new object keys within a state object
    const property = this.state[KEY]
    property[newStateKey] = newState
    this.setState(prevState => ({
      ...prevState,
      property,
    }))
  };

  handleNestedChanges = (KEY, newStateKey, newState) => {
    // this function lets you push objects to an array within a state object
    const property = this.state[KEY]
    property.push({ [newStateKey]: newState })
    this.setState(prevState => ({
      ...prevState,
      property,
    }))
  };

  ReturnHome = () => {
    return (
      <AsyncHome
        token={this.state.loginToken}
        toggleSeeAll={this.toggleSeeAll}
        handleChanges={this.handleChanges}
        handleChangeEvent={this.handleChangeEvent}
        handleNestedChanges={this.handleNestedChanges}
        whatsNewMarkdownSegs={this.state.whatsNew}
        markdown={this.state.wikiMarkdown}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnResourcesAcknowledgements = () => {
    return (
      <AsyncResourcesAcknowledgements
        token={this.state.loginToken}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnDataUseCertificates = () => {
    return (
      <AsyncDataUseCertificates
        token={this.state.loginToken}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnInstructions = () => {
    return (
      <AsyncInstructions
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnResearchTools = () => {
    return (
      <AsyncResearchTools
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AsyncAboutAmpAd
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnHeader = () => {
    return (
      <AsyncHeader handleChanges={this.handleChanges} hash={this.state.hash} />
    )
  };

  ReturnExplore = (props) => {
    let token = ""
    if (this.state.loginToken) {
      token = this.state.loginToken.sessionToken
    }
    return (
      <AsyncExplore
        token={token}
        history={props.history}
        hash={window.location.hash}
        match={props.match}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnStudyPage = (props) => {
    let token = ""
    if (this.state.loginToken.sessionToken) {
      token = this.state.loginToken.sessionToken
    }
    return (
      <AsyncStudyPage
        token={token}
        hash={window.location.hash}
        match={props.match}
        history={props.history}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnProgramPage = (props) => {
    let token = ""
    if (this.state.loginToken.sessionToken) {
      token = this.state.loginToken.sessionToken
    }
    return (
      <AsyncProgramPage
        token={token}
        hash={window.location.hash}
        match={props.match}
        history={props.history}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
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

        <Route path="/Explore/:handle" component={this.ReturnExplore} />
        <Route
          path="/Explore/Studies/:handle"
          component={this.ReturnStudyPage}
        />
        <Route
          path="/Explore/Programs/:handle"
          component={this.ReturnProgramPage}
        />

        <Route path="/About" component={this.ReturnAboutAmpAd} />
      </div>
    )
  };

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="row amp-ad">
            <this.ReturnHeader />
            <div className="main">
              <this.Main />
            </div>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
