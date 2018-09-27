import React, { Component } from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"
import { getMarkdown } from "../queries/getWikiData"

class WhatIsAmpAD extends Component {
  componentDidMount() {
    getMarkdown(this.props, "581940")
  }

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>AMP-AD Knowledge Portal</h2>
            </div>
          </section>
          <section className="row around-xs">
            <div className="col-xs-12 col-sm-9">
              <SynapseComponents.Markdown
                token={this.props.token.sessionToken}
                ownerId="syn5702691"
                wikiId="583906"
                markdown={this.props.markdown}
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

WhatIsAmpAD.propTypes = {
  markdown: PropTypes.string.isRequired,
  token: PropTypes.object.isRequired,
}

export default WhatIsAmpAD
