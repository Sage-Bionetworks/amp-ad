import React, { Component } from "react"
import PropTypes from "prop-types"

import { BarLoader } from "react-spinners"
import { SynapseComponents } from "synapse-react-client"
import { getParents } from "../view/domScripts"

class ExperimentalResources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      modal: false,
      modalContent: "",
    }
  }

  componentDidMount() {}

  componentDidUpdate() {
    //this.handleShowTable()
  }

  getTable = (event) => {
    const button = event.target
    const parents = getParents(button, ".react-markdown")
    const table = parents[0].querySelector("table")
    return table.outerHTML
  };

  createMarkup = (markup) => {
    return { __html: markup }
  };

  handleChanges = (stateKey, updatedState) => {
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

  addEventListeners = (elements) => {
    elements.forEach((element) => {
      element.addEventListener("click", (event) => {
        this.handleChanges("modalContent", this.getTable(event))
        this.toggleModal()
      })
    })
  };

  handleShowTable = () => {
    const buttonElements = document.querySelectorAll(".table-button")
    if (buttonElements[0] !== undefined && buttonElements[0] !== null) {
      this.addEventListeners(buttonElements)
    }
  };

  handleModalClose = () => {
    const modalWindow = document.querySelector(".modal-x-background-circle")
    modalWindow.addEventListener("click", () => {
      this.toggleModal()
    })
  };

  render() {
    return (
      <div className="row about experimental-resources">
        <div className={this.state.modal === true ? "modal show" : "modal"}>
          <div className="modal-container">
            <div className="modal-x-background-circle">
              <div className="modal-x" />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: this.state.modalContent }}
            />
          </div>
        </div>
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>Experimental Resources</h2>
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
              <SynapseComponents.Markdown
                token={this.props.token.sessionToken}
                ownerId="syn2580853"
                wikiId="409845"
                updateLoadState={() => this.handleChanges("loading", false)}
              />
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
  markdown: PropTypes.string,
  token: PropTypes.object.isRequired,
}

ExperimentalResources.defaultProps = {
  markdown: "loading",
}

export default ExperimentalResources
