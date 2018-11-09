import React from "react"

const BetaHeader = () => {
  return (
    <section className="row beta-banner">
      <div className="banner-message">
        <button className="btn-light-small col-sm-2" type="button">
          BETA
        </button>
      </div>
      <div className="banner-message">
        <h2 className="">
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
