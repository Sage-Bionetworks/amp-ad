import React from "react"
import PropTypes from "prop-types"
import { SynapseComponents } from "synapse-react-client"

const DataUseCertificates = (props) => {
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
            <SynapseComponents.Markdown
              token={props.token.sessionToken}
              ownerId="syn12666371"
              wikiId="585318"
            />
          </div>
        </section>
      </div>
    </div>
  )
}

DataUseCertificates.propTypes = {
  token: PropTypes.object.isRequired,
}

export default DataUseCertificates
