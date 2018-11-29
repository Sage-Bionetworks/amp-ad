import React, { Component } from "react"
import PropTypes from "prop-types"

class WhatIsAmpAD extends Component {
  render() {
    return (
      <div className="container about-page">
        <div className="">
          <section className="row">
            <div className="col-xs-12 col-sm-11  col-lg-9 col-centered">
              <h1>About</h1>
              <this.props.SynapseComponents.Markdown
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
  token: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default WhatIsAmpAD
