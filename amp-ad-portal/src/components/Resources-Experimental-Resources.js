import React, { Component } from "react"
import PropTypes from "prop-types"

import { SynapseComponents } from "synapse-react-client"
import { BarLoader } from "react-spinners"
import { getWikiMarkdownSegments } from "../queries/getWikiData"
import { printSections } from "../model/HandleMarkdown"
import { getParents } from "../view/domScripts"

const returnSynapseMarkdown = (sessionToken) => {
  return (
    <div>
      <div className="react-markdown">
        <SynapseComponents.Markdown
          token={sessionToken}
          ownerId="syn12666371"
          wikiId="582125"
        />
      </div>
      <div className="react-markdown">
        <SynapseComponents.Markdown
          token={sessionToken}
          ownerId="syn12666371"
          wikiId="582124"
        />
      </div>
      <div className="react-markdown">
        <SynapseComponents.Markdown
          token={sessionToken}
          ownerId="syn12666371"
          wikiId="582123"
        />
      </div>
      <div className="react-markdown">
        <SynapseComponents.Markdown
          token={sessionToken}
          ownerId="syn12666371"
          wikiId="581965"
        />
      </div>
    </div>
  )
}

class ExperimentalResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      modal: false,
      modalContent: "",
      eventListenersAdded: 0,
    }
  }

  componentDidMount() {
    getWikiMarkdownSegments(
      "576287",
      "experimentalResources",
      this.props,
      "syn12666371",
      10,
    ).then(() => {
      this.setState({
        loading: false,
      })
    })
    this.handleModalClose()
  }

  componentDidUpdate() {
    if (this.state.eventListenersAdded < 5) {
      console.log(this.state.eventListenersAdded)
      this.handleShowTable()
    }
  }

  getTable = (event) => {
    const button = event.target
    const parents = getParents(button, ".react-markdown")
    console.log(parents)
    const table = parents[0].querySelector("table")
    return table.outerHTML
  };

  createMarkup = (markup) => {
    return { __html: markup }
  };

  handleChanges = (stateKey, updatedState) => {
    //console.log(updatedState)
    this.setState({
      [stateKey]: updatedState,
    })
  };

  toggleModal = () => {
    const body = document.querySelector("html")
    const modalState = this.state.modal === false
    if (!modalState) {
      body.classList.remove("noScroll")
    }
    if (modalState) {
      body.classList.add("noScroll")
    }
    this.setState({
      modal: modalState,
    })
  };

  handleShowTable = () => {
    const buttonElements = document.querySelectorAll(".table-button")
    console.log(buttonElements)
    if (buttonElements[0] !== undefined && buttonElements[0] !== null) {
      buttonElements.forEach((element) => {
        element.addEventListener("click", (event) => {
          this.handleChanges("modalContent", this.getTable(event))
          this.toggleModal()
        })
      })
      const count = this.state.eventListenersAdded + 1
      this.setState({
        eventListenersAdded: count,
      })
    }
  };

  handleModalClose = () => {
    const modalWindow = document.querySelector(".modal")
    modalWindow.addEventListener("click", () => {
      this.toggleModal()
    })
  };

  render() {
    return (
      <div className="row about experimental-resources">
        <div className={this.state.modal === true ? "modal show" : "modal"}>
          <div
            className="modal-content"
            dangerouslySetInnerHTML={{ __html: this.state.modalContent }}
          />
        </div>
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
Experimental Resources
              </h2>
              <p>
                In addition to data and analysis, AMP-AD investigators
                contribute other experimental resources of value to the
                community. As these become available they will be listed on this
                page. Follow the links in the summary below for more details.
              </p>
            </div>
          </section>
          <section className="row center-xs researchers-content">
            <div className="col-xs-12 col-sm-9">
              {//printSections(this.props.markdown, this.props)
                returnSynapseMarkdown(this.props.token.sessionToken)}
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

ExperimentalResources.propTypes = {
  markdown: PropTypes.array.isRequired,
  token: PropTypes.object.isRequired,
}

export default ExperimentalResources
