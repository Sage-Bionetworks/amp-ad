import React from "react"

//AMP-AD portal is a new service. Please
//{" "}
//<a href="mailto:ampadportal@sagebionetworks.org">
//contact us
//</a>
//{" "}
//with
//questions or feedback.

const BetaHeader = () => {
  return (
    <section className="row beta-banner">
      <div className="col-xs-12 col-sm-9 content">
        <button className="btn-light" type="button">
          BETA
        </button>
        <h2>
          This updated AMP-AD Knowledge Portal is under development through the
          end of 2018. During this time, you can still use the
          {" "}
          <a href="https://www.synapse.org/#!Synapse:syn2580853/wiki/409840">
            original site.
          </a>
        </h2>
      </div>
    </section>
  )
}

export default BetaHeader
