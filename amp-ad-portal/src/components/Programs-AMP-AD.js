import React from "react"
import ShowHideSection from "../ShowHideSection"

import getWikiData from "../queries/getWikiData"

const ReactMarkdown = require("react-markdown")

const getMarkdown = (props) => {
  getWikiData("581895", props.token.sessionToken).then((data) => {
    props.handleChanges("wikiMarkdown", data.markdown)
  })
}

const DefaultCodeRenderer = ReactMarkdown.renderers.code

const CodeRenderer = (props) => {
  return (
    <div className="lolwat">
      <DefaultCodeRenderer {...props} />
    </div>
  )
}

const ProgramsAmpAd = (props) => {
  getMarkdown(props)
  return (
    <div className="row about">
      <div className="col-xs-12">
        <section className="row child-page-hero">
          <div className="col-xs-12 col-sm-9 content">
            <h2>
AMP-AD
            </h2>
            <p>
              The following NIA programs and contributors have support the
              content provided.
            </p>
          </div>
        </section>
        <ReactMarkdown
          source={props.markdown}
          renderers={{ code: CodeRenderer }}
          escapeHtml={false}
        />

        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-9">
            <div className="row heading-section">
              <div className="col-xs-12">
                <h2>
Data Contributors
                </h2>
              </div>
            </div>
            <ShowHideSection content={dataContributors()} />
          </div>
          <div className="programs-col col-xs-12 col-sm-8" />
        </section>
      </div>
    </div>
  )
}

const dataContributors = () => {
  return (
    <div>
      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/">
                <h2>
U01AG046152
                </h2>
              </a>
              <a href="/">
                <h2>
                  Pathway discovery, validation and compound identification for
                  Alzheimer’s disease
                </h2>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Group Leads
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Institutions
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Contributed Studies
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <button className="btn-light">
Read Abstract
            </button>
          </div>
        </div>
      </div>

      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/">
                <h2>
U01AG046152
                </h2>
              </a>
              <a href="/">
                <h2>
                  Pathway discovery, validation and compound identification for
                  Alzheimer’s disease
                </h2>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Group Leads
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Institutions
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Contributed Studies
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <button className="btn-light">
Read Abstract
            </button>
          </div>
        </div>
      </div>

      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/">
                <h2>
U01AG046152
                </h2>
              </a>
              <a href="/">
                <h2>
                  Pathway discovery, validation and compound identification for
                  Alzheimer’s disease
                </h2>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Group Leads
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Institutions
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">
Contributed Studies
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
                <li>
list item
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <button className="btn-light">
Read Abstract
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramsAmpAd
