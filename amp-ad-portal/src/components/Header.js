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

import { slide as Menu } from "react-burger-menu"

const logoImage = require("../images/amp-ad-logo.svg")

const styles = {
  bmBurgerButton: {
    zIndex: "1100",
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px",
  },
  bmBurgerBars: {
    background: "#373a47",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: "#bdc3c7",
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em",
  },
  bmMorphShape: {
    fill: "#373a47",
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
  },
  bmItem: {
    display: "inline-block",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)",
    zIndex: "1200",
  },
  bmMenuWrap: {
    zIndex: "1300",
    overflowY: "scroll",
  },
}

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DataAccess: false,
      Explore: false,
      Open: false,
      activeUnderBar: "",
      isOpen: false,
      menuOpen: false,
    }
  }

  componentDidMount() {
    this.handleLocalChanges("activeUnderBar", this.props.hash)

    if (window.location.hash === "#/") {
      styles.bmBurgerButton.top = "100px"
    } else styles.bmBurgerButton.top = "21px"
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hash !== this.props.hash) {
      this.handleLocalChanges("activeUnderBar", this.props.hash)
    }
    if (window.location.hash === "#/") {
      styles.bmBurgerButton.top = "100px"
    } else styles.bmBurgerButton.top = "21px"

    this.lockwindowScroll(this.state.menuOpen)
  }

  lockwindowScroll = (isOpen) => {
    const body = document.querySelector("body")
    if (isOpen) {
      body.style.overflow = "hidden"
      //body.style.overflow = "hidden"
      body.style.height = "100%"
    } else {
      body.style.overflowY = "scroll"
      body.style.overflowX = "hidden"
      body.style.height = "unset"
    }
  };

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

  closeHamburger = () => {
    this.setState({ menuOpen: false })
  };

  handleStateChange = (state) => {
    this.setState({ menuOpen: state.isOpen })
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
    <div>
      <Link
        name="About"
        to="/About"
        className={
          this.props.hash.includes("#/About")
            ? "home nav-item main-nav-item active"
            : "home nav-item main-nav-item"
        }
        onClick={() => {
          this.closeNavigation("#/About")
        }}
      >
        About
      </Link>
      <div
        className={
          this.props.hash.includes("#/About")
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
        <Menu
          className="burger-menu"
          isOpen={this.state.menuOpen}
          styles={styles}
          onStateChange={state => this.handleStateChange(state)}
        >
          <Link to="/" onClick={() => this.closeHamburger()}>
            Home
          </Link>
          <h4>Explore</h4>
          <Link
            className="inset"
            to="/Explore/Programs"
            onClick={() => this.closeHamburger()}
          >
            Programs
          </Link>
          <Link
            className="inset"
            to="/Explore/Projects"
            onClick={() => this.closeHamburger()}
          >
            Projects
          </Link>
          <Link
            className="inset"
            to="/Explore/Studies"
            onClick={() => this.closeHamburger()}
          >
            Studies
          </Link>
          <Link
            className="inset"
            to="/Explore/Data"
            onClick={() => this.closeHamburger()}
          >
            Data Files
          </Link>
          <Link
            className="inset"
            to="/Explore/Publications"
            onClick={() => this.closeHamburger()}
          >
            Publications
          </Link>
          <Link
            className="inset"
            to="/Explore/People"
            onClick={() => this.closeHamburger()}
          >
            People
          </Link>
          <Link to="/ResearchTools" onClick={() => this.closeHamburger()}>
            Research Tools
          </Link>
          <h4>Data Access</h4>
          <Link
            className="inset"
            to="/DataAccess/Instructions"
            onClick={() => this.closeHamburger()}
          >
            Getting Access to Data
          </Link>
          <Link
            className="inset"
            to="/DataAccess/AcknowledgementStatements"
            onClick={() => this.closeHamburger()}
          >
            Acknowledging Data Use
          </Link>
          <Link to="/About" onClick={() => this.closeHamburger()}>
            About
          </Link>
        </Menu>

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
                <li
                  onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "ResearchTools")
                  }
                  onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
                  }
                >
                  {this.ResearchTools()}
                </li>
                <li>{this.DataAccessDropdown()}</li>
                <li
                  className="about-dropdown"
                  onMouseEnter={() => this.handleLocalChanges("activeUnderBar", "About")
                  }
                  onMouseLeave={() => this.handleLocalChanges("activeUnderBar", this.props.hash)
                  }
                >
                  {this.AboutMenu()}
                </li>
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
