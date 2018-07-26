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
import { detectIfUserHasScrolledToBottom } from "../view/domScripts"

const ReactMarkdown = require("react-markdown")

class Studies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //payloadStudy: { references: [] },
      studiesNames: [],
      studiesDataTypes: [],
      studiesRows: [],
      uniqueStudiesRows: [],
      //tableData: {},
      wikiIds: [],
      loading: true,
      bottom: false,
      page: 10,
    }
  }

  componentDidMount() {
    this.getAndSetAllTableData().then(() => {
      this.setState({
        loading: false,
      })
    })
  }

  componentDidUpdate() {}

  setStudiesRows = (synapseData = this.state.pageData) => {
    const studiesRows = []
    synapseData.queryResult.queryResults.rows.forEach(row => studiesRows.push(row))
    this.setState({
      studiesRows,
    })
  };

  setPayload = (synapseTableResponse, stateName, payloadIndex) => {
    console.log(synapseTableResponse)
    const payloadStudy = this.assembleEntityHeaderPayload(
      synapseTableResponse,
      payloadIndex,
    )
    this.setState({
      [stateName]: payloadStudy,
    })
  };

  setPayloadResponse = (
    synapseEntityHeaderResponse,
    pageNameState,
    pageNameStateKey,
  ) => {
    const names = []
    pageNameState.forEach(name => names.push(name))
    synapseEntityHeaderResponse.results.forEach(result => names.push(result))

    this.setState({
      [pageNameStateKey]: names,
    })
  };

  getAndSetAllTableData = async (pageCount = 0) => {
    return getTable(
      "syn9886254",
      this.props.token,
      "SELECT * FROM syn9886254",
      pageCount,
    )
      .then((response) => {
        this.setStudiesRows(response)
        this.setUniqueStudiesRows(this.state.studiesRows)
        this.setPayload(
          response.queryResult.queryResults.rows,
          "studiesNames",
          4,
        )
        this.setPayload(this.state.uniqueStudiesRows, "studiesDataTypes", 5)
      })
      .then(() => {
        getEntityHeader(
          this.props.token.sessionToken,
          this.state.studiesDataTypes,
        ).then((results) => {
          this.setNames(results.results, "studiesNames")
        })
      })
      .then(() => {
        this.getWikiIdsAndMarkdown(this.state.uniqueStudiesRows)
      })
  };

  setNames = (synapseHeaderResults, stateName) => {
    const names = []
    synapseHeaderResults.forEach((element) => {
      names.push(element)
    })
    this.setState({
      [stateName]: names,
    })
    return names
  };

  setUniqueStudiesRows = (studiesState) => {
    const uniqueRows = this.makeUniqueStudiesRows(studiesState)
    this.setState({
      uniqueStudiesRows: uniqueRows,
    })
  };

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

  uniqueArray = (a) => {
    return a.filter((item, pos) => {
      return a.indexOf(item) === pos
    })
  };

  handleScroll = () => {
    const bottomState = detectIfUserHasScrolledToBottom()
    this.setState({
      bottom: bottomState,
    })
    this.loadMoreMarkdownSegments()
  };

  loadMoreMarkdownSegments = (
    atBottom = this.state.bottom,
    loading = this.state.loading,
  ) => {
    if (atBottom && !loading && this.state.page < 120) {
      this.setState({
        loading: true,
      })
      const pageCount = this.state.page + 10
      this.getAndSetAllTableData(this.state.page).then(() => {
        this.setState({
          page: pageCount,
          loading: false,
        })
      })
    }
  };

  assembleEntityHeaderPayload = (tableResponse, index) => {
    const payload = { references: [] }
    tableResponse.forEach((row) => {
      //console.log(index, row)
      if (typeof row.values[index] === "object") {
        row.values[index].forEach((id) => {
          //console.log(index, row, id)
          if (id !== null) {
            payload.references.push({
              targetId: id,
              targetVersionNumber: 1,
            })
          }
        })
      } else {
        payload.references.push({
          targetId: row.values[index],
          targetVersionNumber: 1,
        })
      }
    })
    //console.log(payload)
    return payload
  };

  getNameFromID = (synId, stateObject) => {
    let matchedRow
    if (stateObject && stateObject.length > 0) {
      matchedRow = stateObject.filter(element => element.id === synId)
      if (matchedRow[0]) {
        return matchedRow[0].name
      }
    }
    return ""
  };

  makeUniqueStudiesRows = (rows) => {
    let distinctAssayIds
    let distinctRows
    const outputRows = []
    let foundIds = []
    rows.forEach((row) => {
      const synId = row.values[4]
      foundIds.push(synId)
    })
    foundIds = this.uniqueArray(foundIds)

    foundIds.forEach((foundId) => {
      distinctRows = []
      distinctAssayIds = []
      rows.forEach((studyNameRow) => {
        if (studyNameRow.values[4] === foundId) {
          distinctRows.push(studyNameRow)
        }
      })
      distinctRows.forEach((assayIdRow) => {
        const distinctAssayId = assayIdRow.values[5]
        distinctAssayIds.push(distinctAssayId)
      })

      distinctRows[0].values.splice(5, 1, distinctAssayIds)
      outputRows.push(distinctRows[0])
    })
    return outputRows
  };

  buildEntries = (wikiIds, studiesRows, studiesNames, wikiMarkdownState) => {
    // builds user profiles
    console.log(studiesRows)
    if (wikiIds.length > 0) {
      return wikiIds.map((element) => {
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
        if (typeof wikiMarkdownCopy === "object") {
          wikiMarkdownCopy = ""
        }

        const objectData = studiesRows.filter((row) => {
          return row.values[4] === synId
        })

        const synIds = objectData[0].values[5].map((id) => {
          return (
            <li key={id}>
              {this.getNameFromID(id, this.state.studiesNames)}
            </li>
          )
        })

        return (
          <div className="row" key={objectData[0].values[4]}>
            <div className="col-xs-12 studies-col">
              <div className="row">
                <div className="col-xs-12 researchers studies-section">
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
                      {objectData[0].values[8]}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul>
                    <li>
Tissues
                    </li>
                    <li>
                      {objectData[0].values[6]}
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4">
                  <ul>
                    <li>
Data Types
                    </li>
                    {synIds}
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
                this.state.uniqueStudiesRows,
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
