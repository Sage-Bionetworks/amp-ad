import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"
//import { SynapseComponents } from "synapse-react-client"

import { getTable } from "../queries/queryForData"
import {
  getMarkdownSegment,
  waitFor,
  getWikiKey,
  getEntityHeader,
  asyncForEach,
} from "../queries/getWikiData"
import ShowHideSection from "./ShowHideSection"
import { getColumnNameIndex } from "../controller/PrepRawSynapseData"

const SynapseComponents = null

class Studies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    const synIds = this.props.markdown.length === nextProps.wikiIds.length
    return synIds
  }

  setStudiesRows = (synapseData = this.state.pageData) => {
    const studiesRows = []
    synapseData.queryResult.queryResults.rows.forEach(row => studiesRows.push(row))
    this.props.handleChanges("studiesRows", studiesRows)
  };

  setPayload = (synapseTableResponse, stateName, payloadIndex) => {
    const payloadStudy = this.assembleEntityHeaderPayload(
      synapseTableResponse,
      payloadIndex,
    )
    this.props.handleChanges(`${stateName}Payload`, payloadStudy)
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

        this.setPayload(
          this.props.uniqueStudiesRows,
          "studiesDataTypes",
          this.props.assayIndex,
        )
      })
      .then(() => {
        getEntityHeader(
          this.props.token.sessionToken,
          this.props.dataTypesPayload,
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
    if (synapseHeaderResults !== undefined) {
      synapseHeaderResults.forEach((element) => {
        names.push(element)
      })
      this.setState({
        [stateName]: names,
      })
      this.props.handleChanges(stateName, names)
    }
    return names
  };

  setUniqueStudiesRows = (studiesState) => {
    const uniqueRows = this.makeUniqueStudiesRows(studiesState)
    this.props.handleChanges("studiesUniqueRows", uniqueRows)
  };

  getWikiIdsAndMarkdown = async (tableData) => {
    return asyncForEach(tableData, async (row) => {
      await waitFor(20)
      this.setState({
        loading: true,
      })
      return getWikiKey(
        this.props.token.sessionToken,
        row.values[this.props.studyIndex],
      )
        .then((result) => {
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
        .then(async () => {
          await waitFor(20)
          this.setState({
            loading: false,
          })
        })
    })
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

  uniqueArray = (a) => {
    return a.filter((item, pos) => {
      return a.indexOf(item) === pos
    })
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
          <td className="tissues">{row[this.props.sampleTypeIndex][index]}</td>
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

  returnSynapseJSX = (markdown) => {
    if (SynapseComponents) {
      return (
        <SynapseComponents.Markdown
          token={this.props.token.sessionToken}
          markdown={markdown}
          hasSynapseResources={false}
          errorMessageView={<div>error</div>}
        />
      )
    }
  };

  getWikiMarkdownCopy = (wikiMarkdownState, wikiId) => {
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
    return wikiMarkdownCopy
  };

  buildEntries = (wikiIds, studiesRows, studiesNames, wikiMarkdownState) => {
    if (wikiIds.length > 0) {
      //console.log(this.props.wikiIds)
      return wikiIds.map((element, index) => {
        const synElement = element[Object.keys(element)[0]]
        const synId = synElement.ownerObjectId
        const wikiId = synElement.wikiPageId
        const wikiMarkdownCopy = this.getWikiMarkdownCopy(
          wikiMarkdownState,
          wikiId,
        )

        const objectData = studiesRows.filter((row) => {
          return row.values[this.props.studyIndex] === synId
        })

        const table = this.buildDataTable(objectData[0].values)

        const key = `table${index}`

        return (
          <div className="row" key={key}>
            <div className="col-xs-12 studies-col">
              <div className="row">
                <div className="col-xs-12 researchers studies-section">
                  <ShowHideSection content={this.returnSynapseJSX(wikiMarkdownCopy)} />
                </div>
              </div>

              <div className="study-overview">
                <table>
                  <thead className="">
                    <tr className="">
                      <th className="individuals">Individuals</th>
                      <th className="tissues">Tissues</th>
                      <th className="data-types">Data Types</th>
                    </tr>
                  </thead>
                  <tbody>{table}</tbody>
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
              <h2>Studies</h2>
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
          <div className="row center-xs loading-bar">
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
  handleChanges: PropTypes.func.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  wikiIds: PropTypes.array.isRequired,
  studiesRows: PropTypes.array.isRequired,
  assayIndex: PropTypes.number.isRequired,
  studyIndex: PropTypes.number.isRequired,
  individualsIndex: PropTypes.number.isRequired,
  uniqueStudiesRows: PropTypes.array.isRequired,
  studiesNames: PropTypes.array.isRequired,
  sampleTypeIndex: PropTypes.number.isRequired,
  dataTypesPayload: PropTypes.object.isRequired,
}

export default Studies
