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
// study page
const AsyncStudyPage = asyncComponent(() => import('./components/Page-Study.js'))
// program page
const AsyncProgramPage = asyncComponent(() => import('./components/Page-Program.jsx'))
// Data access pages
const AsyncInstructions = asyncComponent(() => import('./components/DataAccess-Instructions'))
const AsyncDataUseCertificates = asyncComponent(() => import('./components/DataAccess-DataUseCertificates.js'))
const AsyncResearchTools = asyncComponent(() => import('./components/ResearchTools'))
const AsyncResourcesAcknowledgements = asyncComponent(() => import('./components/Resources-AcknowledgementStatements'))
const AsyncVersions = asyncComponent(() => import('./components/Versions'))

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
    wikiMarkdown: '',
    whatsNew: [],
    hash: '',
    defaultData: {},
    synapseLoaded: true,
    loading: true,
  };

  handleChanges = (KEY, NEWSTATE) => {
    this.setState({
      [KEY]: NEWSTATE,
    })
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
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnDataUseCertificates = () => {
    return (
      <AsyncDataUseCertificates
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnInstructions = () => {
    return (
      <AsyncInstructions
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        markdown={this.state.wikiMarkdown}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnResearchTools = () => {
    return (
      <AsyncResearchTools
        handleChanges={this.handleChanges}
        handleNestedChanges={this.handleNestedChanges}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnAboutAmpAd = () => {
    return (
      <AsyncAboutAmpAd
        handleChanges={this.handleChanges}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
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
    return (
      <AsyncExplore
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
    return (
      <AsyncStudyPage
        hash={window.location.hash}
        match={props.match}
        history={props.history}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
      />
    )
  };

  ReturnProgramPage = (props) => {
    return (
      <AsyncProgramPage
        hash={window.location.hash}
        match={props.match}
        history={props.history}
        SynapseConstants={SynapseConstants}
        SynapseComponents={SynapseComponents}
        defaultData={this.state.defaultData}
        synapseLoaded={this.state.synapseLoaded}
      />
    )
  };

  ReturnVersions = () => {
    return (
      <AsyncVersions hash={this.state.hash} />
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
        <Route path="/Versions" component={this.ReturnVersions} />
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
