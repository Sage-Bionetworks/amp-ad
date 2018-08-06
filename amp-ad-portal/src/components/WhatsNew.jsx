import React, { Component } from "react"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"

const bellIcon = require("../images/plus-bell-icon.svg")
const lightBulbIcon = require("../images/lightbulb-on.svg")

class WhatsNew extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    getWikiMarkdownSegments(
      "582408",
      "whatsNew",
      this.props,
      "syn12666371",
      131,
      10,
    )
  }

  render() {
    return (
      <section className="what-new row">
        <div className="content col-xs-12 col-sm-9">
          <div className="row title-row">
            <div className="col-xs-12">
              <h2>
What&apos;s New
              </h2>
            </div>
          </div>

          {printSections(this.props.markdown, this.props, 3)}
        </div>
      </section>
    )
  }
}

const markup = () => {
  return (
    <section className="what-new row">
      <div className="content col-xs-12 col-sm-8">
        <div className="row title-row">
          <div className="col-xs-12">
            <h2>
What&apos;s New
            </h2>
          </div>
        </div>

        <div className="row new-row">
          <div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
            <img className="bell-icon" alt="bell icon" src={bellIcon} />
          </div>
          <div className="col-xs-12 col-sm-11 what-new-data">
            <h5 className="date">
MAY 2018
            </h5>
            <h2 className="type-of-release">
Data Release
            </h2>
            <h4 className="sub-title">
              Additional Data for Previously Released Study
            </h4>
            <p className="description">
              The ADMC_ADNI1 study. This release adds bile acid metabolomics to
              the previously released lipidomics and data from the p180
              platform. All data in this study has been generated on the ADNI1
              cohort and requires access approval through ADNI.
            </p>
          </div>
        </div>

        <div className="row new-row">
          <div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
            <img
              className="lightbulb"
              alt="light bulb icon"
              src={lightBulbIcon}
            />
          </div>
          <div className="col-xs-12 col-sm-11 what-new-data">
            <h5>
April 2018
            </h5>
            <h2>
Data Release
            </h2>
            <p>
              The SUNYStrokeModel. Includes electrophysiological and behavioral
              data (Active Place Avoidance, Novel Object Recognition) in the
              following models: C57BL/6J - (WT), BKS.Cg-Dock7m+/+Leprdb/J,
              APP/PS1, J20, a/a Dock 7m+/Dock7m+, a/a Dock7m+/+Leprdb, where
              mice have been tested at 5 mo after a stroke or sham transient
              middle cerebral artery occlusion (tMCAo) procedure.
            </p>
          </div>
        </div>

        <div className="row new-row">
          <div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
            <img alt="bell icon" src={bellIcon} />
          </div>
          <div className="col-xs-12 col-sm-11 what-new-data">
            <h5>
April 2018
            </h5>
            <h2>
Data Release
            </h2>
            <p>
              The ROSMAP WGS data: 16 samples were identified that are either
              sex mismatches or discordant with previous array-based genotype
              data and recommended to be excluded. Samples are listed in
              WGS_sample_QC_info. Additional QC files can be found in the QC
              files.
              {" "}
              <a href="https://www.synapse.org/#!Synapse:syn12177996">
                https://www.synapse.org/#!Synapse:syn12177996
              </a>
              {" "}
              folder The MSBB study: 55 RNAseq, 8 WES, 15 WGS samples are
              recommended to be excluded or remapped to the correct donor.
              Samples are listed in MSBB_RNAseq.WES.WGS_sample_QC_info
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatsNew
