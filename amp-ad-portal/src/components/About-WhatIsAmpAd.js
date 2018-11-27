import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
//import { getMarkdown } from "../queries/getWikiData"
//const ReactMarkdown = require("react-markdown")

class WhatIsAmpAD extends Component {
  componentDidMount() {
    //getMarkdown(this.props, "581939")
  }

  componentWillUnmount() {
    //this.props.handleChanges("wikiMarkdown", "")
  }

  render() {
    return (
      <div className="container about-page">
        <div className="">
          <section className="row">
            <div className="col-xs-12 col-sm-11  col-lg-9 col-centered">
              <h1>About</h1>
              <SynapseComponents.Markdown
                wikiId="581939"
                token={this.props.token.sessionToken}
                ownerId="syn12666371"
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  //markdown: PropTypes.string.isRequired,
  //handleChanges: PropTypes.func.isRequired,
  token: PropTypes.object.isRequired,
}

export default WhatIsAmpAD
