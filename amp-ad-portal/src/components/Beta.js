import React from "react"

const BetaHeader = () => {
  return (
    <section className="row beta-banner">
      <div className="col-xs-12 col-sm-9 content">
        <button className="btn-light" type="button">
          BETA
        </button>
        <h2>
          AMP-AD portal is a new service. Please
          {" "}
          <a href="mailto:ampadportal@sagebionetworks.org">
contact us
          </a>
          {" "}
with
          questions or feedback.
        </h2>
      </div>
    </section>
  )
}

export default BetaHeader
