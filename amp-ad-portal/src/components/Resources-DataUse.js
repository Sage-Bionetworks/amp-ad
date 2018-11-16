import React, { Component } from "react"
import PropTypes from "prop-types"

import { getMarkdown } from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

class DataUse extends Component {
  state = {
    addedEventListeners: false,
  };

  componentDidMount() {
    getMarkdown(this.props, "576286")
  }

  componentWillUnmount() {
    this.props.handleChanges("wikiMarkdown", "")
  }

  componentDidUpdate() {
    if (!this.state.addedEventListeners) {
      this.addDetailsFunctionality()
    }
  }

  addDetailsFunctionality = () => {
    const details = document.querySelectorAll("details")

    if (details.length > 1) {
      details.forEach((dropdown) => {
        dropdown.addEventListener(
          "toggle",
          (event) => {
            console.log(dropdown)
            if (dropdown.open) {
              /* the element was toggled open */
              dropdown.open = "true"
            } else {
              /* the element was toggled closed */
              dropdown.open = "false"
            }
          },
          false,
        )
      })
      this.setState({
        addedEventListeners: true,
      })
    }
  };

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="flex-row child-page-hero center-xs">
            <div className="content">
              <h2>Data Access and Use Requirements</h2>
              <p>
                AMP-AD Knowledge Portal data and analyses are stored in Synapse,
                a collaborative research platform. Please follow the
                instructions below in order to gain access.
              </p>
            </div>
          </section>
          <div className="old-markdown container">
            <div className="flex-row">
              <div className="">
                <ReactMarkdown
                  source={this.props.markdown}
                  escapeHtml={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DataUse.propTypes = {
  markdown: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
}

export default DataUse
