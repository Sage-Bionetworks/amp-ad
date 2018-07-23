import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

import { getTable } from "../queries/queryForData"
import {
  getMarkdownSegment,
  waitFor,
  getWikiKey,
  getEntityHeader,
  asyncForEach,
} from "../queries/getWikiData"
import ShowHideSection from "../ShowHideSection"

const ReactMarkdown = require("react-markdown")

//import { getColumnNameIndex } from "../controller/PrepRawSynapseData"

class Studies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payloadStudy: { references: [] },
      //payloadAssay: { references: [] },
      studiesNames: [],
      //assayNames: [],
      tableData: {},
      wikiIds: [],
      loading: true,
    }
  }

  componentDidMount() {
    getTable("syn9886254", this.props.token, "SELECT * FROM syn9886254")
      .then((response) => {
        const payloadStudy = this.assembleEntityHeaderPayload(response, 4)
        //const payloadAssay = this.assembleEntityHeaderPayload(response, 5)
        this.setState({ payloadStudy, tableData: response })
      })
      .then(() => {
        if (this.state.payloadStudy.references.length > 0) {
          getEntityHeader(
            this.props.token.sessionToken,
            this.state.payloadStudy,
          ).then((results) => {
            this.setState({
              studiesNames: results.results,
            })
          })
        }
        //if (this.state.payloadAssay.references.length > 0) {
        //getEntityHeader(
        //this.props.token.sessionToken,
        //this.state.payloadAssay,
        //).then((results) => {
        //this.setState({
        //studiesNames: results.results,
        //})
        //})
        //}
      })
      .then(() => {
        this.getWikiIdsAndMarkdown(
          this.state.tableData.queryResult.queryResults.rows,
        )
      })
  }

  componentDidUpdate() {}

  getWikiIdsAndMarkdown = async (tableData) => {
    const wikiIdsArr = []
    return asyncForEach(tableData, async (row) => {
      await waitFor(20)
      this.setState({
        loading: true,
      })
      return getWikiKey(this.props.token.sessionToken, row.values[4]).then(
        (result) => {
          getMarkdownSegment(
            this.props,
            result.wikiPageId,
            "studies",
            result.ownerObjectId,
          )
          wikiIdsArr.push({ [row.values[4]]: result })
          this.setState({
            loading: false,
            wikiIds: [...this.state.wikiIds, { [row.values[4]]: result }],
          })
        },
      )
    })
  };

  assembleEntityHeaderPayload = (tableResponse, index) => {
    const payload = { references: [] }
    tableResponse.queryResult.queryResults.rows.forEach((row) => {
      payload.references.push({
        targetId: row.values[index],
        targetVersionNumber: 1,
      })
    })
    return payload
  };

  buildEntries = (wikiIds, tableData, studiesNames, wikiMarkdownState) => {
    // studiesNames has id: "synId" and name: ""
    // wikiIds
    // syn9702085: { ownerObjectId: "syn9702085", ownerObjectType: "ENTITY", wikiPageId: "425119" };
    if (wikiIds.length > 5) {
      return wikiIds.map((element) => {
        //console.log(element[Object.keys()[0]])
        const synElement = element[Object.keys(element)[0]]
        const synId = synElement.ownerObjectId
        const wikiId = synElement.wikiPageId
        let wikiMarkdownCopy = ""

        if (wikiMarkdownState.length > 0) {
          wikiMarkdownCopy = wikiMarkdownState.filter((markdownObj) => {
            return Object.keys(markdownObj)[0] === wikiId
          })
        }

        if (wikiMarkdownCopy[0] !== undefined) {
          wikiMarkdownCopy = wikiMarkdownCopy[0][parseInt(wikiId, 10)]
        }

        let title = studiesNames.filter(study => study.id === synId)
        title = title[0].name

        const objectData = tableData.queryResult.queryResults.rows.filter(
          (row) => {
            return row.values[4] === synId
          },
        )

        return (
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 studies-section">
                  <ShowHideSection
                    content={<ReactMarkdown source={wikiMarkdownCopy} />}
                  />
                </div>
              </div>
              <div className="row study-overview">
                <div className="col-sm-3">
                  <ul>
                    <li>
Individuals
                    </li>
                    <li>
                      {objectData[0].values[10]}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <ul>
                    <li>
Tissues
                    </li>
                    <li>
                      {objectData[0].values[6]}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <ul>
                    <li>
Data Types
                    </li>
                    <li>
                      {objectData[0].values[5]}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    return <div />
  };

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Studies
              </h2>
              <p>
                This page details the research studies that have contributed
                data to the Knowledge Portal, along with which NIH grant
                supported the work.
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
              {this.buildEntries(
                this.state.wikiIds,
                this.state.tableData,
                this.state.studiesNames,
                this.props.markdown,
              )}
            </div>
          </section>
          <div className="row center-xs">
            <BarLoader color="#47357B" loading={this.state.loading} />
          </div>
        </div>
      </div>
    )
  }
}

Studies.propTypes = {
  markdown: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
}

export default Studies
