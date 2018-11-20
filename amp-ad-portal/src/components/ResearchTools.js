import React, { Component } from "react"
import PropTypes from "prop-types"

import { BarLoader } from "react-spinners"
import { SynapseComponents } from "synapse-react-client"

class ExperimentalResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  handleChanges = (stateKey, updatedState) => {
    this.setState({
      [stateKey]: updatedState,
    })
  };

  render() {
    return (
      <div className="container about experimental-resources">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered hide-first-child table-container">
              <h1>Research Tools</h1>
              <SynapseComponents.Markdown
                token={this.props.token.sessionToken}
                ownerId="syn2580853"
                wikiId="409845"
                updateLoadState={() => this.handleChanges("loading", false)}
              />
            </div>
          </section>
          <div className="row center-xs">
            <BarLoader color="#47357B" loading={this.state.loading} />
          </div>
        </div>
      </div>
    )
  }
}

ExperimentalResources.propTypes = {
  token: PropTypes.object.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

ExperimentalResources.defaultProps = {}

export default ExperimentalResources
