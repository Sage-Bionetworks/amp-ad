import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

class ExperimentalResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleChanges = (stateKey, updatedState) => {
    this.setState({
      [stateKey]: updatedState,
    })
  };

  returnMarkdown = () => {
    if (this.props.token) {
      return (
        <this.props.SynapseComponents.Markdown
          token={this.props.token.sessionToken}
          ownerId="syn2580853"
          wikiId="409845"
          updateLoadState={() => this.handleChanges("loading", false)}
        />
      )
    }
    return <div />
  };

  render() {
    return (
      <div className="container about experimental-resources">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered table-container">
              <h1>Research Tools</h1>
              {this.returnMarkdown()}
              <BarLoader color="#5BB0B5" loading={this.state.loading} />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

ExperimentalResources.propTypes = {
  token: PropTypes.object.isRequired,
  handleChanges: PropTypes.func.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

ExperimentalResources.defaultProps = {}

export default ExperimentalResources
