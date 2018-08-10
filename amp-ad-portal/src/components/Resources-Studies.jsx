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
import ShowHideSection from "./ShowHideSection"
import { detectIfUserHasScrolledToBottom } from "../view/domScripts"
import { getColumnNameIndex } from "../controller/PrepRawSynapseData"

const ReactMarkdown = require("react-markdown")

class Studies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      bottom: false,
      page: 10,
    }
  }

  componentDidMount() {
    if (!this.props.markdown.length) {
      this.getAndSetAllTableData().then(() => {
        this.setState({
          loading: false,
        })
      })
    }
    if (this.props.markdown.length > 1) {
      this.setState({
        loading: false,
        studiesRows: this.props.markdown,
      })
    }
  }

  componentDidUpdate() {}

  setStudiesRows = (synapseData = this.state.pageData) => {
    const studiesRows = []
    synapseData.queryResult.queryResults.rows.forEach(row => studiesRows.push(row))
    //this.setState({
    //studiesRows,
    //})
    this.props.handleChanges("studiesRows", studiesRows)
  };

  setPayload = (synapseTableResponse, stateName, payloadIndex) => {
    const payloadStudy = this.assembleEntityHeaderPayload(
      synapseTableResponse,
      payloadIndex,
    )
    console.log(payloadStudy)
    //this.setState({
    //[stateName]: payloadStudy,
    //})
    this.props.handleChanges(stateName, payloadStudy)
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
        const AssayIndex = getColumnNameIndex(response, "Assay")
        const StudyIndex = getColumnNameIndex(response, "Study")
        const IndividualsIndex = getColumnNameIndex(
          response,
          "Number_of_Individuals",
        )
        const SampleTypeIndex = getColumnNameIndex(response, "Sample_Type")

        this.props.handleChanges("studiesAssayIndex", AssayIndex)
        this.props.handleChanges("studiesStudyIndex", StudyIndex)
        this.props.handleChanges("studiesIndividualsIndex", IndividualsIndex)
        this.props.handleChanges("studiesSampleTypeIndex", SampleTypeIndex)

        this.setStudiesRows(response)
        this.setUniqueStudiesRows(this.props.studiesRows)
        //this.setStudiesNames()
        //this.setStudiesDataTypes()

        this.setPayload(
          response.queryResult.queryResults.rows,
          "studiesNames",
          this.props.studyIndex,
        )
        this.setPayload(
          this.props.uniqueStudiesRows,
          "studiesDataTypes",
          this.props.assayIndex,
        )
      })
      .then(() => {
        console.log(this.props.studiesDataTypes)
        getEntityHeader(
          this.props.token.sessionToken,
          this.props.studiesDataTypes,
        ).then((results) => {
          this.setNames(results.results, "studiesNames")
        })
      })
      .then(() => {
        this.getWikiIdsAndMarkdown(this.props.uniqueStudiesRows)
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
    this.props.handleChanges("studiesUniqueRows", uniqueRows)
  };

  getWikiIdsAndMarkdown = async (tableData) => {
    const wikiIdsArr = []
    return asyncForEach(tableData, async (row) => {
      await waitFor(20)
      this.setState({
        loading: true,
      })
      return getWikiKey(
        this.props.token.sessionToken,
        row.values[this.props.studyIndex],
      ).then((result) => {
        getMarkdownSegment(
          this.props,
          result.wikiPageId,
          "studies",
          result.ownerObjectId,
        )
        this.props.handleNestedChanges(
          "studiesWikiIds",
          row.values[this.props.studyIndex],
          result,
        )
      })
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
      if (typeof row.values[index] === "object") {
        row.values[index].forEach((id) => {
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

  makeUniqueSynIdsArray = (rows) => {
    let foundIds = []

    rows.forEach((row) => {
      const synId = row.values[this.props.studyIndex]
      foundIds.push(synId)
    })
    foundIds = this.uniqueArray(foundIds)
    return foundIds
  };

  makeUniqueStudiesRows = (rows) => {
    const outputRows = []
    let distinctAssayIds
    let distinctSampleTypes
    let distinctRows
    let distinctIndividuals

    const uniqueSynIds = this.makeUniqueSynIdsArray(rows)

    uniqueSynIds.forEach((Id) => {
      distinctRows = []
      distinctAssayIds = []
      distinctSampleTypes = []
      distinctIndividuals = []

      rows.forEach((studyNameRow) => {
        if (studyNameRow.values[this.props.studyIndex] === Id) {
          distinctRows.push(studyNameRow)
        }
      })
      distinctRows.forEach((idRow) => {
        const distinctAssayId = idRow.values[this.props.assayIndex]
        const distinctSampleType = idRow.values[this.props.sampleTypeIndex]
        const distinctIndividual = idRow.values[this.props.individualsIndex]
        distinctAssayIds.push(distinctAssayId)
        distinctSampleTypes.push(distinctSampleType)
        distinctIndividuals.push(distinctIndividual)
      })

      distinctRows[0].values.splice(this.props.assayIndex, 1, distinctAssayIds)
      distinctRows[0].values.splice(
        this.props.sampleTypeIndex,
        1,
        distinctSampleTypes,
      )
      distinctRows[0].values.splice(
        this.props.individualsIndex,
        1,
        distinctIndividuals,
      )
      outputRows.push(distinctRows[0])
    })
    return outputRows
  };

  buildDataTable = (row) => {
    return row[this.props.assayIndex].map((element, index) => {
      const key = `table-row${index}`
      return (
        <tr className="studies-table-row" key={key}>
          <td className="individuals">
            {row[this.props.individualsIndex][index]}
          </td>
          <td className="tissues">
            {row[this.props.sampleTypeIndex][index]}
          </td>
          <td className="data-types">
            <a
              href={`https://www.synapse.org/#!Synapse:${
                row[this.props.assayIndex][index]
              }`}
            >
              {this.getNameFromID(
                row[this.props.assayIndex][index],
                this.props.studiesNames,
              )}
            </a>
          </td>
        </tr>
      )
    })
  };

  buildEntries = (wikiIds, studiesRows, studiesNames, wikiMarkdownState) => {
    // builds user profiles
    //console.log(wikiIds, studiesRows, studiesNames, wikiMarkdownState)
    if (wikiIds.length > 0) {
      return wikiIds.map((element, index) => {
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
          return row.values[this.props.studyIndex] === synId
        })

        //console.log(objectData)
        const table = this.buildDataTable(objectData[0].values)

        const key = `table${index}`

        return (
          <div className="row" key={key}>
            <div className="col-xs-12 studies-col">
              <div className="row">
                <div className="col-xs-12 researchers studies-section">
                  <ShowHideSection
                    content={<ReactMarkdown source={wikiMarkdownCopy} />}
                  />
                </div>
              </div>

              <div className="study-overview">
                <table>
                  <thead className="">
                    <tr className="">
                      <th className="individuals">
Individuals
                      </th>
                      <th className="tissues">
Tissues
                      </th>
                      <th className="data-types">
Data Types
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {table}
                  </tbody>
                </table>
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
                this.props.wikiIds,
                this.props.uniqueStudiesRows,
                this.props.studiesNames,
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
