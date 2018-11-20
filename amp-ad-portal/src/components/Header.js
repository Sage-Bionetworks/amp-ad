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
      DataAccess: false,
      Explore: false,
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
        DataAccess: false,
        Open: false,
        Explore: false,
        activeUnderBar,
      },
      () => {
        const body = document.querySelector("html")
        body.classList.remove("noScroll")
      },
    )
  };

  setOpenAccordion = (event, name) => {
    this.handleLocalChanges("activeUnderBar", event.target.innerHTML)
    this.closeNavigation()
    this.setState({
      [name]: true,
      Open: true,
    })
  };

  dropdownMenuAction = (event, name) => {
    event.preventDefault()
    this.setOpenAccordion(event, name)

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

  ExploreDropdown = () => (
    <Accordion>
      <AccordionItem
        className="top-level-accordion-item"
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Explore")
        }
        onMouseLeave={this.mouseLeaveBehavior()}
      >
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.Explore}
        >
          <a
            href="/"
            className={
              this.props.hash.includes("Explore")
                ? "nav-item main-nav-item active"
                : "nav-item main-nav-item"
            }
            onClick={event => this.dropdownMenuAction(event, "Explore")}
          >
            Explore
          </a>
          <div
            className={
              this.props.hash.includes("Explore")
              && this.state.activeUnderBar.includes("Explore")
                ? "under-bar active"
                : "under-bar"
            }
          />
        </AccordionItemTitle>
        <AccordionItemBody
          aria-hidden={this.state.Explore !== true}
          className={
            this.state.Explore === true
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
                      to="/Explore/Programs"
                      onClick={() => {
                        this.closeNavigation("#/Explore/Programs")
                      }}
                    >
                      Programs
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
                      to="/Explore/Projects"
                      onClick={() => {
                        this.closeNavigation("#/Explore/Projects")
                      }}
                    >
                      Projects
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
                      to="/Explore/Studies"
                      onClick={() => {
                        this.closeNavigation("#/Explore/Studies")
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
                      to="/Explore/Data"
                      onClick={() => {
                        this.closeNavigation("#/Explore/Data")
                      }}
                    >
                      Data Files
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
                      to="/Explore/Publications"
                      onClick={() => {
                        this.closeNavigation("#/Explore/Publications")
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
                  <div className="col-xs-12 accordion-sub-title">
                    <Link
                      name="Acknowledgement Statements"
                      to="/Explore/People"
                      onClick={() => {
                        this.closeNavigation("#/Explore/People")
                      }}
                    >
                      People
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

  ResearchTools = () => (
    <div>
      <Link
        name="Research-Tools"
        to="/ResearchTools"
        className={
          this.props.hash.includes("#/ResearchTools")
            ? "home nav-item main-nav-item active"
            : "home nav-item main-nav-item"
        }
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Home")}
        onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
        }
        onClick={() => {
          this.closeNavigation("#/ResearchTools")
        }}
      >
        Research Tools
      </Link>
      <div
        className={
          this.props.hash.includes("#/ResearchTools")
          && this.state.activeUnderBar.includes("#/")
            ? "under-bar active"
            : "under-bar"
        }
      />
    </div>
  );

  DataAccessDropdown = () => (
    <Accordion>
      <AccordionItem
        className="top-level-accordion-item"
        onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "DataAccess")
        }
        onMouseLeave={this.mouseLeaveBehavior()}
      >
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.DataAccess}
        >
          <a
            href="/"
            className={
              this.props.hash.includes("/DataAccess")
                ? "nav-item main-nav-item active"
                : "nav-item main-nav-item"
            }
            onClick={event => this.dropdownMenuAction(event, "DataAccess")}
          >
            Data Access
          </a>
          <div
            className={
              this.props.hash.includes("DataAccess")
              && this.state.activeUnderBar.includes("DataAccess")
                ? "under-bar active"
                : "under-bar"
            }
          />
        </AccordionItemTitle>
        <AccordionItemBody
          aria-hidden={this.state.DataAccess !== true}
          className={
            this.state.DataAccess === true
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
                      to="/DataAccess/Instructions"
                      onClick={() => {
                        this.closeNavigation("#/DataAccess/Instructions")
                      }}
                    >
                      Getting Access to Data
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
                      to="/DataAccess/AcknowledgementStatements"
                      onClick={() => {
                        this.closeNavigation(
                          "#/DataAccess/AcknowledgementStatements",
                        )
                      }}
                    >
                      Acknowledging Data Use
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

  AboutMenu = () => (
    <div
      onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Home")}
      onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
      }
    >
      <Link
        name="About"
        to="/About/AMP-AD"
        className={
          this.props.hash.includes("#/About")
            ? "home nav-item main-nav-item active"
            : "home nav-item main-nav-item"
        }
        onClick={() => {
          this.closeNavigation("#/About/AMP-AD")
        }}
      >
        About
      </Link>
      <div
        className={
          this.props.hash.includes("#/About/")
          && this.state.activeUnderBar.includes("#/")
            ? "under-bar active"
            : "under-bar"
        }
      />
    </div>
  );

  render() {
    return (
      <header className="header">
        <div className="container">
          {this.ReturnBetaHeader()}
          <div className="nav-row nav row" style={{ backgroundColor: "#fff" }}>
            <button
              className={!this.state.Open ? "menu-wall hidden" : "menu-wall"}
              type="button"
              onClick={() => {
                this.closeNavigation(window.location.hash)
              }}
            />
            <div className="logo">
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
            <div className="nav-buttons col-md-10 col-sm-9 flex end-xs clear-floats">
              <ul className="nav row end-xs">
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
                <li>{this.ExploreDropdown()}</li>
                <li>{this.ResearchTools()}</li>
                <li>{this.DataAccessDropdown()}</li>
                <li className="about-dropdown">{this.AboutMenu()}</li>
                <li
                  className="agora-nav-link"
                  onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "Home")
                  }
                  onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
                  }
                >
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
