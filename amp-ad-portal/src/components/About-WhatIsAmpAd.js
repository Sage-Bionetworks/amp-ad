import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class WhatIsAmpAD extends Component {
  state = {
    loading: true,
  };

  handleChange = (newState) => {
    this.setState(newState)
  };

  returnMarkdown = (token = this.props.token.sessionToken) => {
    return (
      <this.props.SynapseComponents.Markdown
        wikiId="581939"
        token={this.props.token.sessionToken}
        ownerId="syn12666371"
        updateLoadState={() => this.handleChange({ loading: false })}
      />
    )
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
      <div className="container about-page">
        <div className="">
          <section className="row">
            <div className="col-xs-12 col-sm-11  col-lg-9 col-centered">
              <h2 className="header">About</h2>
              {this.returnMarkdown()}
              {this.returnBarLoader()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  token: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default WhatIsAmpAD
