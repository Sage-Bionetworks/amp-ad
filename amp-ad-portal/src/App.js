import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import ReactGA from 'react-ga'
import createHistory from 'history/createBrowserHistory'
import {
  SynapseComponents,
  SynapseConstants,
} from 'synapse-react-client'

// non component js
import asyncComponent from './components/AsyncComponent'
import ScrollToTop from './components/ScrollToTop'

// about pages
const AsyncAboutAmpAd = asyncComponent(() => import('./components/About-WhatIsAmpAd'))
// component js
const AsyncHome = asyncComponent(() => import('./components/Home'))
const AsyncHeader = asyncComponent(() => import('./components/Header'))
const Footer = asyncComponent(() => import('./components/Footer'))
// explore
const AsyncExplore = asyncComponent(() => import('./components/Explore.jsx'))
// Data access pages
const AsyncInstructions = asyncComponent(() => import('./components/DataAccess-Instructions'))
const AsyncDataUseCertificates = asyncComponent(() => import('./components/DataAccess-DataUseCertificates.js'))
const AsyncResearchTools = asyncComponent(() => import('./components/ResearchTools'))
const AsyncResourcesAcknowledgements = asyncComponent(() => import('./components/Resources-AcknowledgementStatements'))
const AsyncVersions = asyncComponent(() => import('./components/Versions'))
const AsyncProgramPage = asyncComponent(() => import('./components/Page-Program.jsx'))


// ReactGA is a google analytics node package
ReactGA.initialize('UA-29804340-3')

// tracking the location path with Google analytics
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
    wikiMarkdown: '',
    whatsNew: [],
    hash: '',
    synapseLoaded: true,
    loading: true,
  };

  componentDidMount() {
    this.setState({
      hash: window.location.hash,
    })
  }

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
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnDataUseCertificates = () => {
    return (
      <AsyncDataUseCertificates
        token={this.state.loginToken}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        synapseLoaded={this.state.synapseLoaded}
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
        synapseLoaded={this.state.synapseLoaded}
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
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AsyncAboutAmpAd
        token={this.state.loginToken}
        handleChanges={this.handleChanges}
        SynapseComponents={SynapseComponents}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnHeader = () => {
    return (
      <AsyncHeader handleChanges={this.handleChanges} hash={this.state.hash} />
    )
  };

  ReturnExplore = (props) => {
    const token = ''
    return (
      <AsyncExplore
        token={token}
        history={props.history}
        hash={window.location.hash}
        match={props.match}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnVersions = () => {
    return (
      <AsyncVersions hash={this.state.hash} />
    )
  };

  ReturnAsyncProgramPage = () => {
    return (
      <AsyncProgramPage
        SynapseComponents={SynapseComponents}
        SynapseConstants={SynapseConstants}
      />
    )
  };

  Main = () => {
    return (
      <div className="main-content">
        <div className="spacer" />
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
        <Route
          exact
          path="/Explore/Programs/:handle"
          component={this.ReturnAsyncProgramPage}
        />
        <Route exact path="/Explore/:handle" component={this.ReturnExplore} />
        <Route path="/About" component={this.ReturnAboutAmpAd} />
        <Route path="/Versions" component={this.ReturnVersions} />
      </div>
    )
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <div className="amp-ad">
            {this.ReturnHeader()}
            <div className="wrapper">
              {this.Main()}
            </div>
            <Footer />
          </div>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
