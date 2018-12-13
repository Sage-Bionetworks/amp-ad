import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class DataUseCertificates extends Component {
  state = {
    addedEventListeners: false,
    loading: true,
  };

  componentDidMount() {
    this.addDetailsFunctionality()
  }

  componentDidUpdate() {
    this.addDetailsFunctionality()
  }

  addDetailsFunctionality = () => {
    const details = document.querySelectorAll('details')

    if (details.length > 0) {
      details.forEach((carrot) => {
        carrot.addEventListener(
          'click',
          (e) => {
            const detailsNode = e.target.parentNode
            const state = !e.target.parentNode.open
            detailsNode.open = state
          },
          false,
        )
      })
      if (!this.state.addedEventListeners) {
        this.setState({
          addedEventListeners: true,
        })
      }
    }
  };

  handleChange = (newState) => {
    this.setState(newState)
  };

  returnMarkdown = (token = this.props.token.sessionToken) => {
    if (token) {
      return (
        <this.props.SynapseComponents.Markdown
          token={token}
          ownerId="syn12666371"
          wikiId="585318"
          updateLoadState={() => this.handleChange({ loading: false })}
        />
      )
    }
    if (
      !this.props.synapseLoaded
      && this.props.defaultData.dataUseCertificates
    ) {
      return (
        <this.props.SynapseComponents.Markdown
          markdown={this.props.defaultData.dataUseCertificates.markdown}
        />
      )
    }
    return <div />
  };

  returnBarLoader = () => {
    if (
      !this.props.synapseLoaded
      && this.props.defaultData.dataUseCertificates
    ) {
      return <div />
    }
    return <BarLoader color="#5BB0B5" loading={this.state.loading} />
  };

  render() {
    return (
      <div className="container about experimental-resources">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered table-container">
              <h2 className="header">Data Use Certificates</h2>
              {this.returnMarkdown()}
              {this.returnBarLoader()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}
DataUseCertificates.propTypes = {
  token: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default DataUseCertificates
