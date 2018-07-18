import React, { Component } from "react"
import PropTypes from "prop-types"

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
            wikiIds: [...this.state.wikiIds, { [row.values[4]]: result }],
          })
        },
      )
      //}).then(() => {
      //this.setState({
      //wikiIds: wikiIdsArr,
      //})
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
            //console.log(row, synId)
            return row.values[4] === synId
          },
        )
        //console.log(objectData)

        return (
          <div className="row">
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 studies-section">
                  <h2>
                    {title}
                  </h2>
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
                Researchers include members of all programs as well as external
                contributors. Research of this program was seeded by program
                specific research and expanded on by Consortia level research
                involving collaborations across consortia and external research
                performed by researchers reusing the AMP-AD portal resources.
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
