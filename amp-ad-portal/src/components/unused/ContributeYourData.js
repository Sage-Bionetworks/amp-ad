import React from "react"
import openUrl from "../model/OpenUrl"

const computingCloud = require("../images/computing-cloud.svg")

const ContributeYourData = () => {
  return (
    <section className="contribute-your-data row center-xs">
      <div className="col-xs-12 col-sm-9">
        <div className="row">
          <div className="col-xs-12 col-sm-4">
            <img alt="upload icon" src={computingCloud} />
          </div>
          <div className="content-block col-xs-12 col-sm-8">
            <h2>
Contribute Your Data
            </h2>
            <p>
              We encourage the research community to contribute data, analysis
              results, code and other resources that contributes to the AMP-AD
              Knowledge Portal research goals. Contact the Knowledge Portal
              admin team through the Discussion forum for further instructions.
            </p>
            <button
              className="btn"
              type="button"
              onClick={event => openUrl(event, "/#/About/AMP-AD")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContributeYourData
