import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import "react-dropdown/style.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"
import BetaHeader from "./Beta"

import "react-accessible-accordion/dist/minimal-example.css"

const logoImage = require("../images/amp-ad-logo.svg")

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Research: false,
      Resources: false,
      About: false,
      Home: false,
      Open: false,
      activeUnderBar: "",
    }
  }

  componentDidMount() {
    this.handleLocalChanges("activeUnderBar", this.props.hash)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hash !== this.props.hash) {
      this.handleLocalChanges("activeUnderBar", this.props.hash)
    }
  }

  closeNavigation = (location) => {
    if (location !== undefined) {
      this.props.handleChanges("hash", location)
    }

    let activeUnderBar = window.location.hash

    if (this.state.Open && location === undefined) {
      activeUnderBar = this.state.activeUnderBar
    }

    this.setState(
      {
        Research: false,
        Resources: false,
        About: false,
        Home: false,
        Open: false,
        activeUnderBar,
      },
      () => {
        const body = document.querySelector("html")
        body.classList.remove("noScroll")
      },
    )
  };

  setOpenAccordion = (event) => {
    const accordionItems = document.querySelectorAll(
      ".top-level-accordion-item",
    )

    this.handleLocalChanges("activeUnderBar", event.target.innerHTML)

    accordionItems.forEach((element) => {
      if (
        event.target.innerHTML
        !== element.querySelector(".main-nav-item").innerHTML
      ) {
        this.setState({
          [element.querySelector(".main-nav-item").innerHTML]: false,
          Open: true,
        })
      } else {
        const newState = this.state[element.querySelector(".main-nav-item").innerHTML]
          !== true
        this.setState(prevState => ({
          ...prevState,
          [element.querySelector(".main-nav-item").innerHTML]: newState,
          Open: true,
        }))
      }
    })
  };

  dropdownMenuAction = (event) => {
    event.preventDefault()
    this.setOpenAccordion(event)

    if (this.state.Open === true) {
      this.closeNavigation()
    }
  };

  ReturnBetaHeader = () => {
    if (window.location.hash === "#/") {
      return <BetaHeader />
    }
    return ""
  };

  handleLocalChanges = (key, value) => {
    this.setState({
      [key]: value,
    })
  };

  mouseLeaveBehavior = () => {
    const behavior = this.state.Open === false
      ? () => this.handleLocalChanges("activeUnderBar", this.props.hash)
      : () => {}
    return behavior
  };

  ResearchDropdown = () => (
    <Accordion>
      <AccordionItem
        className="top-level-accordion-item"
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Research")
        }
        onMouseLeave={this.mouseLeaveBehavior()}
      >
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.Research}
        >
          <a
            href="/"
            className={
              this.props.hash.includes("Research")
                ? "nav-item main-nav-item active"
                : "nav-item main-nav-item"
            }
            onClick={this.dropdownMenuAction}
            onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Research")
            }
            onMouseLeave={this.mouseLeaveBehavior()}
          >
            Research
          </a>
          <div
            className={
              this.props.hash.includes("Research")
              && this.state.activeUnderBar.includes("Research")
                ? "under-bar active"
                : "under-bar"
            }
          />
        </AccordionItemTitle>
        <AccordionItemBody
          aria-hidden={this.state.Research !== true}
          className={
            this.state.Research === true
              ? "accordion-body top-level-accordion"
              : "accordion-body top-level-accordion accordion__body--hidden"
          }
        >
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-10 accordion-sub-title">Programs</div>
                  <div className="col-xs-1 carrot-icon">&gt;</div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  <li>
                    <Link
                      name="AMP-AD"
                      to="/Research/AMP-AD"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/AMP-AD")
                      }}
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="M2OVE"
                      to="/Research/M2OVE"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/M2OVE")
                      }}
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="MODEL-AD"
                      to="/Research/Model-AD"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/Model-AD")
                      }}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Resilience-AD"
                      to="/Research/Resilience-AD"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/Resilience-AD")
                      }}
                    >
                      Resilience-AD Program
                    </Link>
                  </li>
                </ul>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-10 accordion-sub-title">
                    Collaborative Research
                  </div>
                  <div className="col-xs-1 carrot-icon">&gt;</div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  <li>
                    <Link
                      name="Genetics"
                      to="/Research/Genetics"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/Genetics")
                      }}
                    >
                      Genetics
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Differential Expression"
                      to="/Research/DifferentialExpression"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation(
                          "#/Research/DifferentialExpression",
                        )
                      }}
                    >
                      Differential Expression
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Networks"
                      to="/Research/Networks"
                      className="nav-item dropdown"
                      onClick={() => {
                        this.closeNavigation("#/Research/Networks")
                      }}
                    >
                      Networks
                    </Link>
                  </li>
                </ul>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Research/Publications"
                      onClick={() => {
                        this.closeNavigation("#/Research/Publications")
                      }}
                    >
                      Publications
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-11 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Research/ExternalResearchers"
                      onClick={() => {
                        this.closeNavigation("#/Research/ExternalResearchers")
                      }}
                    >
                      Approved External Research
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>
          </Accordion>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );

  ResourcesDropdown = () => (
    <Accordion>
      <AccordionItem
        className="top-level-accordion-item"
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Resources")
        }
        onMouseLeave={this.mouseLeaveBehavior()}
      >
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.Resources}
        >
          <a
            href="/"
            className={
              this.props.hash.includes("Resources")
                ? "nav-item main-nav-item active"
                : "nav-item main-nav-item"
            }
            onClick={this.dropdownMenuAction}
            onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Resources")
            }
            onMouseLeave={this.mouseLeaveBehavior()}
          >
            Resources
          </a>
          <div
            className={
              this.props.hash.includes("Resources")
              && this.state.activeUnderBar.includes("Resources")
                ? "under-bar active"
                : "under-bar"
            }
          />
        </AccordionItemTitle>
        <AccordionItemBody
          aria-hidden={this.state.Resources !== true}
          className={
            this.state.Resources === true
              ? "accordion-body top-level-accordion"
              : "accordion-body top-level-accordion accordion__body--hidden"
          }
        >
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Resources/Data"
                      onClick={() => {
                        this.closeNavigation("#/Resources/Data")
                      }}
                    >
                      Data
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Resources/Studies"
                      onClick={() => {
                        this.closeNavigation("#/Resources/Studies")
                      }}
                    >
                      Studies
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Resources/ExperimentalResources"
                      onClick={() => {
                        this.closeNavigation(
                          "#/Resources/ExperimentalResources",
                        )
                      }}
                    >
                      Experimental Resources
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <a href="http://agora.ampadportal.org/">Agora</a>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Resources/DataUseRequirements"
                      onClick={() => {
                        this.closeNavigation("#/Resources/DataUseRequirements")
                      }}
                    >
                      Data Use Requirements
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle className="accordion__title link">
                <div className="row between-xs">
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="Acknowledgement Statements"
                      to="/Resources/AcknowledgementStatements"
                      onClick={() => {
                        this.closeNavigation(
                          "#/Resources/AcknowledgementStatements",
                        )
                      }}
                    >
                      Acknowledgement Statements
                    </Link>
                  </div>
                </div>
              </AccordionItemTitle>
            </AccordionItem>
          </Accordion>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );

  AboutMenuDropdown = () => (
    <Accordion>
      <AccordionItem
        className="top-level-accordion-item"
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "About")}
        onMouseLeave={this.mouseLeaveBehavior()}
      >
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.About}
        >
          <a
            href="/"
            className={
              this.props.hash.includes("About")
                ? "nav-item main-nav-item active"
                : "nav-item main-nav-item"
            }
            onClick={this.dropdownMenuAction}
            onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "About")
            }
            onMouseLeave={this.mouseLeaveBehavior()}
          >
            About
          </a>
          <div
            className={
              this.props.hash.includes("About")
              && this.state.activeUnderBar.includes("About")
                ? "under-bar active"
                : "under-bar"
            }
          />
        </AccordionItemTitle>
        <AccordionItemBody
          aria-hidden={this.state.About !== true}
          className={
            this.state.About === true
              ? "accordion-body top-level-accordion"
              : "accordion-body top-level-accordion accordion__body--hidden"
          }
        >
          <AccordionItem>
            <AccordionItemTitle className="accordion__title link">
              <div className="row between-xs">
                <div className="col-xs-12 accordion-sub-title">
                  <Link
                    name="AMP-AD"
                    to="/About/AMP-AD"
                    className="nav-item dropdown"
                    onClick={() => {
                      this.closeNavigation("#/About/AMP-AD")
                    }}
                  >
                    What is the AMP-AD portal
                  </Link>
                </div>
                <div className="col-xs-1" />
              </div>
            </AccordionItemTitle>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle className="accordion__title link">
              <div className="row between-xs">
                <div className="col-xs-12 accordion-sub-title">
                  <Link
                    name="About people"
                    to="/About/People"
                    className="nav-item dropdown"
                    onClick={() => {
                      this.closeNavigation("#/About/People")
                    }}
                  >
                    People
                  </Link>
                </div>
              </div>
            </AccordionItemTitle>
          </AccordionItem>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  );

  render() {
    return (
      <header className="row between-xs header center-xs middle-xs">
        <div className="col-xs-12">
          <div className="row center-xs">{this.ReturnBetaHeader()}</div>
          <div
            className="nav-row row between-xs center-xs middle-xs"
            style={{ backgroundColor: "#fff" }}
          >
            <button
              className={!this.state.Open ? "menu-wall hidden" : "menu-wall"}
              type="button"
              onClick={() => {
                this.closeNavigation(window.location.hash)
              }}
            />
            <div className="col-xs-12 col-sm-3">
              <Link
                to="/"
                onClick={() => {
                  this.closeNavigation("#/")
                }}
              >
                <img
                  className="logo-header"
                  src={logoImage}
                  alt="amp_ad_logo"
                />
              </Link>
            </div>
            <div className="nav-buttons col-xs-12 col-sm-7 col-md-8">
              <ul className="nav row end-sm center-xs">
                <li
                  onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Home")
                  }
                  onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
                  }
                >
                  <Link
                    to="/"
                    className={
                      this.props.hash === "#/"
                        ? "home nav-item main-nav-item active"
                        : "home nav-item main-nav-item"
                    }
                    onClick={() => {
                      this.closeNavigation("#/")
                    }}
                  >
                    Home
                  </Link>
                  <div
                    className={
                      this.props.hash === "#/"
                      && this.state.activeUnderBar.includes("#/")
                        ? "under-bar active"
                        : "under-bar"
                    }
                  />
                </li>
                <li>{this.ResearchDropdown()}</li>
                <li>{this.ResourcesDropdown()}</li>
                <li className="about-dropdown">{this.AboutMenuDropdown()}</li>
                <li className="agora-nav-link">
                  <div className="agora-border" />
                  <img
                    className="agora-logo"
                    alt="agora branding logo"
                    src={require("../images/agora-logo.svg")}
                  />
                  <a
                    className="home nav-item main-nav-item"
                    href="http://agora.ampadportal.org/"
                  >
                    Explore Results
                  </a>
                  <div className="under-bar" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  handleChanges: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
}

export default Header
