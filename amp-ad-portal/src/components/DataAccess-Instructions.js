import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class Instructions extends Component {
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
    if (this.state.addedEventListeners) {
      return
    }
    const details = document.querySelectorAll('details')

    if (details.length > 0) {
      details.forEach((carrot) => {
        carrot.addEventListener(
          'click',
          (e) => {
            const detailsNode = e.target.parentNode
            const state = e.target.parentNode.open
            detailsNode.open = !state
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

  returnMarkdown = () => {
    return (
      <this.props.SynapseComponents.Markdown
        ownerId="syn12666371"
        wikiId="585317"
        updateLoadState={() => this.handleChange({ loading: false })}
      />
    )
  };

  returnBarLoader = () => {
    return <BarLoader color="#5BB0B5" loading={this.state.loading} />
  };

  render() {
    return (
      <div className="container">
        <div className="page">
          <section className="row">
            <div className="col-xs-12 col-sm-11 col-lg-9 col-centered">
              <h2 className="header">Getting Access to Data</h2>
              {this.returnMarkdown()}
              {this.returnBarLoader()}
            </div>
          </section>
        </div>
      </div>
    )
  }
}
Instructions.propTypes = {
  SynapseComponents: PropTypes.object.isRequired,
}

export default Instructions
