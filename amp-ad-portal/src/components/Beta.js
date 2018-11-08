import React from "react"

const BetaHeader = () => {
  return (
    <section className="row beta-banner">
      <div className="center-block col-sm-7 col-centered">
        <button className="btn-light-small" type="button">
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
