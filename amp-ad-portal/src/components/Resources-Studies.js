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
      payloadStudy: { references: [] },
      studiesNames: [],
      studiesDataTypes: [],
      studiesRows: [],
      uniqueStudiesRows: [],
      tableData: {},
      wikiIds: [],
      loading: true,
      bottom: false,
      page: 10,
    }
  }

  componentDidMount() {
    this.getAndSetAllTableData().then(() => {
      const pageCount = this.state.page + 10

      this.setState({
        loading: false,
        page: pageCount,
      })

      //window.addEventListener("scroll", this.handleScroll)
    })
  }

  componentDidUpdate() {}

  setStudiesRows = (synapseData = this.state.pageData) => {
    const studiesRows = []
    this.state.studiesRows.forEach(row => studiesRows.push(row))
    synapseData.queryResult.queryResults.rows.forEach(row => studiesRows.push(row))
    this.setState({
      studiesRows,
    })
  };

  setStudiesPayload = (synapseTableResponse) => {
    const payloadStudy = this.assembleEntityHeaderPayload(
      synapseTableResponse,
      4,
    )
    this.setState({
      payloadStudy,
    })
  };

  setDataTypePayload = () => {};

  setStudiesNames = (
    synapseEntityHeaderResponse,
    pageNameState = this.state.studiesNames,
  ) => {
    const namesOfStudies = []
    pageNameState.forEach(name => namesOfStudies.push(name))
    synapseEntityHeaderResponse.results.forEach(result => namesOfStudies.push(result))

    this.setState({
      studiesNames: namesOfStudies,
    })
  };

  setStudiesDataTypes = (
    synapseEntityHeaderResponse,
    pageNameState = this.state.studiesDataTypes,
  ) => {
    const nameOfDataType = []
    pageNameState.forEach(name => nameOfDataType.push(name))
    synapseEntityHeaderResponse.results.forEach(result => nameOfDataType.push(result))
    this.setState({
      studiesDataTypes: nameOfDataType,
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
        this.setStudiesPayload(response)
      })
      .then(() => {
        //console.log(this.state.studiesRows)
        if (this.state.payloadStudy.references.length > 0) {
          getEntityHeader(
            this.props.token.sessionToken,
            this.state.payloadStudy,
          ).then((results) => {
            console.log(results)
            this.setStudiesNames(results)
          })
        }
      })
      .then(() => {
        const uniqueRows = this.makeUniqeStudiesRows(this.state.studiesRows)
        this.setState(
          {
            uniqueStudiesRows: uniqueRows,
          },
          () => {},
        )
      })
      .then(() => {
        this.setDataTypePayload(this.state.studiesRows)
      })
      .then(() => {
        this.getWikiIdsAndMarkdown(this.state.uniqueStudiesRows)
      })
  };

  // make set of unique studiesRows
  // then use the unique rows to search for wikiIdsAndMarkdown

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

  makeUniqeStudiesRows = (rows) => {
    let distinctAssayIds
    let distinctRows
    const outputRows = []
    // loop through each study
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

      //console.log("distinct rows: ", distinctRows)
      distinctRows.forEach((assayIdRow) => {
        const distinctAssayId = assayIdRow.values[5]
        distinctAssayIds.push(distinctAssayId)
      })

      distinctRows[0].values.splice(5, 1, distinctAssayIds)
      outputRows.push(distinctRows[0])
    })
    //console.log(this.uniqueArray(foundIds))
    return outputRows
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
    tableResponse.queryResult.queryResults.rows.forEach((row) => {
      payload.references.push({
        targetId: row.values[index],
        targetVersionNumber: 1,
      })
    })
    return payload
  };

  buildEntries = (wikiIds, studiesRows, studiesNames, wikiMarkdownState) => {
    // studiesNames has id: "synId" and name: ""
    // wikiIds
    // syn9702085: { ownerObjectId: "syn9702085", ownerObjectType: "ENTITY", wikiPageId: "425119" };
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
              {id}
            </li>
          )
        })

        return (
          <div className="row" key={objectData[0].values[4]}>
            <div className="col-xs-12">
              <div className="row">
                <div className="col-xs-12 studies-section">
                  <ShowHideSection
                    content={<ReactMarkdown source={wikiMarkdownCopy} />}
                  />
                </div>
              </div>
              <div className="row study-overview">
                <div className="col-sm-4">
                  <ul>
                    <li>
Individuals
                    </li>
                    <li>
                      {objectData[0].values[10]}
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
