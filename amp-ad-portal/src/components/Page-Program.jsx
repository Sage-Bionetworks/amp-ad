import React, { Component } from "react"
import PropTypes from "prop-types"

class ProgramPage extends Component {
  state = {
    params: {},
    query: "",
    cardQuery: "",
    name: "",
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

  handleChanges = (stateObj) => {
    this.setState(stateObj)
  };

  contentRouter = (handle = this.state.params.handle) => {
    let query
    let cardQuery
    switch (handle) {
    case "AMP-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'AMP-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 where ( ( \"Program\" = 'AMP-AD' ) )"
      break
    case "M2OVE-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )"
      break
    case "MODEL-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'MODEL-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'MODEL-AD' ) )"
      break
    case "Resilience-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'Resilience-AD' ) )"
      cardQuery = "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'Resilience-AD' ) )"
      break
    default:
      query = "SELECT * FROM syn17024229"
    }
    this.handleChanges({ query, cardQuery, name: handle })
    return query
  };

  returnSynapseChart = () => {
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
        </div>
      </div>
    )
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
