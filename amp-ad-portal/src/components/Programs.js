import React from "react"

import openUrl from "../model/OpenUrl"

const Programs = (props) => {
  return (
    <section className="programs flex-row">
      <div className="flex-col-full content-row-width">
        <div className="title-row between-xs">
          <div className="">
            <h2>Programs</h2>
          </div>
          <div className="" />
        </div>

        <div className="flex-row between-xs">
          <div className="programs box col-xs-12 col-sm-3">
            <div className="box-text-image">
              <img
                src={require("../images/consortium.svg")}
                alt="consortium molecule"
                className="svg-large-icon"
              />
              <h4>AMP-AD</h4>
              <p>
                Reduce time to discovery of drugs and potential drug targets for
                AD treatment and prevention through analyses, network modeling,
                and experimental validation of large-scale molecular data from
                human brain samples.
              </p>
            </div>
            <button
              className="btn-amp"
              type="button"
              onClick={event => openUrl(event, "/#/Research/AMP-AD")}
            >
              View
            </button>
          </div>

          <div className="programs box flex-col">
            <div className="box-text-image">
              <img
                src={require("../images/brain-heart.svg")}
                alt="an illustration of brain overlapping a heart"
                className="svg-large-icon"
              />
              <h4>M2OVE-AD Consortium</h4>
              <p>
                Generate a deeper understanding of the phenotypes of risk and
                the molecular mechanisms linking vascular risk factors,
                cerebrovascular disease and AD.
              </p>
            </div>
            <button
              className="btn-amp"
              type="button"
              onClick={event => openUrl(event, "/#/Research/M2OVE")}
            >
              View
            </button>
          </div>

          <div className="programs box flex-col">
            <div className="box-text-image">
              <img
                src={require("../images/mouse.svg")}
                alt="illustration of mouse"
                className="svg-large-icon"
              />
              <h4>Model AD Program</h4>
              <p>
                Bridge the preclinical to clinical development gap by developing
                AD animal models and a process for rigorous preclinical efficacy
                testing of biomarkers.
              </p>
            </div>
            <button
              className="btn-amp"
              type="button"
              onClick={event => openUrl(event, "/#/Research/Model-AD")}
            >
              View
            </button>
          </div>

          <div className="programs box flex-col">
            <div className="box-text-image">
              <img
                src={require("../images/dna.svg")}
                alt="dna double helix"
                className="svg-large-icon"
              />
              <h4>Resilience-AD Program</h4>
              <p>
                Understand the mechanisms by which gene-environment interactions
                lead to cognitive resilience in the presence of high risk for
                disease.
              </p>
            </div>
            <button
              className="btn-amp"
              type="button"
              onClick={event => openUrl(event, "/#/Research/Resilience-AD")}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Programs
