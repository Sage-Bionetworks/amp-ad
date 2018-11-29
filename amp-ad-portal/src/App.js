import React, { Component } from "react"
import { HashRouter as Router, Route } from "react-router-dom"
import ReactGA from "react-ga"
import createHistory from "history/createBrowserHistory"
import { SynapseComponents, SynapseConstants } from "synapse-react-client"
import * as SynapseClient from "./synapse/SynapseClient"

// non component js
import asyncComponent from "./components/AsyncComponent"
import ScrollToTop from "./components/ScrollToTop"

const login = async () => SynapseClient.login("mikeybkats", "guinness").then((keys) => {
  return keys
})

// about pages
const AsyncAboutAmpAd = asyncComponent(() => import("./components/About-WhatIsAmpAd"))
// resources pages
const AsyncInstructions = asyncComponent(() => import("./components/DataAccess-Instructions"))
// component js
const AsyncHome = asyncComponent(() => import("./components/Home"))
const AsyncHeader = asyncComponent(() => import("./components/Header"))
const Footer = asyncComponent(() => import("./components/Footer"))
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
    wikiMarkdown: "",
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
      />
    )
  };

  ReturnResourcesAcknowledgements = () => {
    return <AsyncResourcesAcknowledgements token={this.state.loginToken} />
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
    return (
      <AsyncExplore
        token={this.state.loginToken.sessionToken}
        history={props.history}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
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
