import React, { Component } from "react"
import PropTypes from "prop-types"

class Instructions extends Component {
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
        <this.props.SynapseComponents.Markdown
          token={token}
          ownerId="syn12666371"
          wikiId="585317"
          updateLoadState={() => this.handleChange({ loaded: true })}
        />
      )
    }
    return <div />
  };

  render() {
    return (
      <div className="container">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered">
              <h1>Getting Access to Data</h1>
              {this.returnMarkdown()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}
Instructions.propTypes = {
  token: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default Instructions
