import React, { Component } from "react"
import PropTypes from "prop-types"

class ProgramPage extends Component {
  state = {
    params: {},
    query: "",
    cardQuery: "",
    name: "",
    wikiId: "",
    synId: "",
    jsonKey: "",
    wikiSubHero: "",
    defaultDataLength: 0,
  };

  componentDidMount() {
    this.setState(
      {
        params: this.props.match.params,
      },
      () => {
        this.contentRouter()
      },
    )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.defaultData[this.state.wikiSubHero])
    if (
      Object.keys(this.props.defaultData).length !== prevState.defaultDataLength
    ) {
      console.log(
        Object.keys(this.props.defaultData).length,
        this.state.defaultDataLength,
      )
      this.handleChanges({
        defaultDataLength: Object.keys(this.props.defaultData).length,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.defaultDataLength !== this.state.defaultDataLength) {
      return true
    }
    return true
  }

  handleChanges = (stateObj) => {
    this.setState(stateObj)
  };

  contentRouter = (handle = this.state.params.handle) => {
    let query
    let cardQuery
    let wikiId
    let jsonKey
    let wikiSubHero
    let offlineJSON
    const synId = "syn12666371"
    switch (handle) {
    case "AMP-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'AMP-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 where ( ( \"Program\" = 'AMP-AD' ) )"
      wikiId = "581895"
      wikiSubHero = "programAMPAD_wiki"
      offlineJSON = "syn17024229_programAMPAD"
      break
    case "M2OVE-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )"
      wikiId = "581894"
      wikiSubHero = "programM2OVEAD_wiki"
      offlineJSON = "syn17024229_programM2OVEAD"
      break
    case "MODEL-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'MODEL-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'MODEL-AD' ) )"
      wikiId = "581896"
      wikiSubHero = "programMODELAD_wiki"
      offlineJSON = "syn17024229_programMODELAD"
      break
    case "Resilience-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'Resilience-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'Resilience-AD' ) )"
      wikiId = "581898"
      wikiSubHero = "programResilienceAD_wiki"
      offlineJSON = "syn17024229_programResilienceAD"
      break
    default:
      query = "SELECT * FROM syn17024229"
    }
    this.handleChanges({
      query,
      cardQuery,
      name: handle,
      wikiId,
      synId,
      jsonKey,
      wikiSubHero,
      offlineJSON,
    })
    return query
  };

  returnSynapseChart = () => {
    if (this.props.synapseLoaded && this.props.token) {
      return (
        <div className="explore-publications">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={this.state.query}
            token={this.props.token}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_PROJECT}
              limit={50}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
        </div>
      )
    }
    return (
      <div className="explore-publications">
        <this.props.SynapseComponents.StaticQueryWrapper
          json={this.props.defaultData[this.state.offlineJSON]}
        >
          <this.props.SynapseComponents.SynapseTableCardView
            type={this.props.SynapseConstants.AMP_PROJECT}
            limit={50}
          />
        </this.props.SynapseComponents.StaticQueryWrapper>
      </div>
    )
  };

  style = () => {
    if (window.location.hash.includes("/Programs/")) {
      return {}
    }
    return {}
  };

  returnTitleCard = () => {
    return (
      <div className="hero-card">
        <div className="card-container">
          <this.props.SynapseComponents.StaticQueryWrapper
            sql={this.state.cardQuery}
            token={this.props.token}
          >
            <this.props.SynapseComponents.SynapseTableCardView
              type={this.props.SynapseConstants.AMP_CONSORTIUM}
            />
          </this.props.SynapseComponents.StaticQueryWrapper>
          {this.returnWikiData()}
        </div>
      </div>
    )
  };

  returnWikiData = () => {
    if (this.props.synapseLoaded && this.props.token) {
      return (
        <div className="container wiki-markdown">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <this.props.SynapseComponents.Markdown
                token={this.props.token}
                ownerId={this.state.synId}
                wikiId={this.state.wikiId}
              />
            </div>
          </div>
        </div>
      )
    }
    if (this.props.defaultData[this.state.wikiSubHero]) {
      return (
        <div className="container wiki-markdown">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <this.props.SynapseComponents.Markdown
                markdown={
                  this.props.defaultData[this.state.wikiSubHero].markdown
                }
              />
            </div>
          </div>
        </div>
      )
    }
    return <div />
  };

  render() {
    return (
      <section className="page program-page" style={this.style()}>
        <this.returnTitleCard />
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12" />
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <h2 className="header">
                Explore
                {` ${this.state.name}`}
              </h2>
              <this.returnSynapseChart />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProgramPage.propTypes = {
  token: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default ProgramPage
