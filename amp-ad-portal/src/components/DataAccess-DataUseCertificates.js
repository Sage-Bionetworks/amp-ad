import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"

class DataUseCertificates extends Component {
  state = {
    addedEventListeners: false,
    loaded: false,
  };

  componentDidMount() {
    this.addDetailsFunctionality()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true
    }
    if (this.props.token !== nextProps.token) {
      return true
    }
    return false
  }

  componentDidUpdate() {
    this.addDetailsFunctionality()
  }

  addDetailsFunctionality = () => {
    const details = document.querySelectorAll("details")

    if (details.length > 0) {
      details.forEach((carrot) => {
        carrot.addEventListener(
          "click",
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
        <SynapseComponents.Markdown
          token={token}
          ownerId="syn12666371"
          wikiId="585318"
          updateLoadState={() => this.handleChange({ loaded: true })}
        />
      )
    }
    return <div />
  };

  render() {
    return (
      <div className="container">
        <div className="">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-8 col-centered">
              <h2>Data Use Certificates</h2>
              <p />
            </div>
          </section>
          <section className="row">
            <div className="col-xs-12 col-sm-8 col-centered">
              {this.returnMarkdown()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}
DataUseCertificates.propTypes = {
  token: PropTypes.object.isRequired,
}

export default DataUseCertificates
