import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"

class AcknowledgementStatements extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.token !== nextProps.token) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className="container ">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered">
              <h1>Acknowledgement Statements</h1>
              <SynapseComponents.Markdown
                token={this.props.token.sessionToken}
                ownerId="syn2580853"
                wikiId="584597"
                updateLoadState={() => this.handleChange({ loaded: true })}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

AcknowledgementStatements.propTypes = {
  token: PropTypes.object.isRequired,
}

export default AcknowledgementStatements
