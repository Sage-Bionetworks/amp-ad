import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class AcknowledgementStatements extends Component {
  state = {
    loading: true,
  };

  handleChange = (newState) => {
    this.setState(newState)
  };

  returnMarkdown = (token = this.props.token.sessionToken) => {
    if (token) {
      return (
        <this.props.SynapseComponents.Markdown
          token={this.props.token.sessionToken}
          ownerId="syn2580853"
          wikiId="584597"
          updateLoadState={() => this.handleChange({ loading: false })}
        />
      )
    }
    if (
      !this.props.synapseLoaded
      && this.props.defaultData.acknowledgementStatements
    ) {
      return (
        <this.props.SynapseComponents.Markdown
          markdown={this.props.defaultData.acknowledgementStatements.markdown}
        />
      )
    }
    return <div />
  };

  returnBarLoader = () => {
    if (
      !this.props.synapseLoaded
      && this.props.defaultData.acknowledgementStatements
    ) {
      return <div />
    }
    return <BarLoader color="#5BB0B5" loading={this.state.loading} />
  };

  render() {
    return (
      <div className="container ">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered">
              <h2 className="header">Acknowledgement Statements</h2>
              {this.returnMarkdown()}
              {this.returnBarLoader()}
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
