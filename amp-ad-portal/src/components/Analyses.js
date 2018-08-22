import React from "react"
import openUrl from "../model/OpenUrl"

const Analyses = (props) => {
  return (
    <section className="analyses row">
      <div className="content col-xs-12 col-sm-10">
        <div className="row between-xs title-row">
          <div className="col-xs-6 col-sm-6">
            <h2>Analyses</h2>
          </div>
          <div className="col-xs-3 col-sm-2 content-width">
            <a
              className="align-right"
              href="https://www.synapse.org/#!Synapse:syn11346063/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjExMzQ2MDYzIiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJ0aXNzdWUiLCAiZmFjZXRWYWx1ZXMiOltdfSx7ImNvbmNyZXRlVHlwZSI6Im9yZy5zYWdlYmlvbmV0d29ya3MucmVwby5tb2RlbC50YWJsZS5GYWNldENvbHVtblZhbHVlc1JlcXVlc3QiLCAiY29sdW1uTmFtZSI6ImFuYWx5c2lzVHlwZSIsICJmYWNldFZhbHVlcyI6WyJkaWZmZXJlbnRpYWxFeHByZXNzaW9uIiwiZW5yaWNobWVudEFuYWx5c2lzIiwicG9seWdlbmljUmlza1Njb3JlcyIsInN0YXRpc3RpY2FsTmV0d29ya1JlY29uc3RydWN0aW9uIiwiZXhwcmVzc2lvblF1YW50aXRhdGl2ZVRyYWl0TG9jaURldGVjdGlvbiIsImdlbm90eXBlSW1wdXRhdGlvbiJdfV0sICJpbmNsdWRlRW50aXR5RXRhZyI6dHJ1ZSwgImlzQ29uc2lzdGVudCI6dHJ1ZSwgIm9mZnNldCI6MCwgImxpbWl0IjoyNX0="
            >
              See All Analyses
            </a>
          </div>
        </div>

        <div className="row between-xs center-xs middle-xs">
          <div className="analyses box col-xs-12 col-sm-4">
            <div className="box-text-image">
              <img
                src={require("../images/dna.svg")}
                alt="dna double helix"
                className="svg-large-icon"
              />
              <h4>Genetics</h4>
              <p>
                Expression quantitative trait loci, imputed genotypes, and
                polygenic risk scores.
              </p>
            </div>
            <button
              className="btn"
              type="button"
              onClick={event => openUrl(event, "/#/Research/Genetics")}
            >
              View
            </button>
          </div>

          <div className="analyses box col-xs-12 col-sm-4">
            <div className="box-text-image">
              <img
                src={require("../images/differential-expressions.svg")}
                alt="dna double helix"
                className="svg-large-icon"
              />
              <h4>Differential Expression</h4>
              <p>Differential gene expression and enrichment analysis.</p>
            </div>
            <button
              className="btn"
              type="button"
              onClick={event => openUrl(event, "/#/Research/DifferentialExpression")
              }
            >
              View
            </button>
          </div>

          <div className="analyses box col-xs-12 col-sm-4">
            <div className="box-text-image">
              <img
                src={require("../images/networks.svg")}
                alt="dna double helix"
                className="svg-large-icon"
              />
              <h4>Networks</h4>
              <p>Gene and protein co-expression analysis.</p>
            </div>
            <button
              className="btn"
              type="button"
              onClick={event => openUrl(event, "/#/Research/Networks")}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Analyses
