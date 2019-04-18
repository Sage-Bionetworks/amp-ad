import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class Tools extends Component {
  state = {
    loading: true,
  };

  handleChanges = (stateKey, updatedState) => {
    this.setState({
      [stateKey]: updatedState,
    })
  };

  returnMarkdown = () => {
    return (
      <this.props.SynapseComponents.Markdown
        token={this.props.token.sessionToken}
        ownerId="syn2580853"
        wikiId="409845"
        updateLoadState={() => this.handleChanges('loading', false)}
      />
    )
  };

  returnBarLoader = () => {
    return <BarLoader color="#5BB0B5" loading={this.state.loading} />
  };

  render() {
    return (
      <div className="container about experimental-resources">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered table-container">
              <h2 className="header">Research Tools</h2>
              {this.returnMarkdown()}
              {this.returnBarLoader()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}

Tools.propTypes = {
  token: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default Tools
