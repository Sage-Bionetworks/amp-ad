import React, { Component } from "react"
import PropTypes from "prop-types"

class ProgramPage extends Component {
  state = {
    params: {},
    query: "",
    name: "",
  };

  componentDidMount() {
    console.log("Program Page Mounting")
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
    console.log(handle)
    switch (handle) {
    case "AMP-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'AMP-AD' ) )"
      break
    case "M2OVE-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )"
      break
    case "MODEL-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'MODEL-AD' ) )"
      break
    case "Resilience-AD":
      query = "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'Resilience-AD' ) )"
      break
    default:
      query = "SELECT * FROM syn17024229"
    }
    this.handleChanges({ query, name: handle })
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

  //<div className="col-xs-12 col-sm-10">
  //<h1>{this.state.params.handle}</h1>
  //</div>
  render() {
    return (
      <section className="page explore" style={this.style()}>
        <div className="container">
          <div className="row">
            <h2 className="header">
              Explore
              {` ${this.state.name}`}
            </h2>
            <div className="col-xs-12 col-sm-12">
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
