import React, { Component } from "react"
import { Link } from "react-router-dom"

import "react-dropdown/style.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"

import "react-accessible-accordion/dist/minimal-example.css"
import { setActiveNavigation } from "./view/domScripts"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Research: false,
      Resources: false,
      About: false,
    }
  }

  componentDidUpdate() {
    setActiveNavigation()
  }

  dropdownMenuAction = (event) => {
    event.preventDefault()

    const accordionItems = document.querySelectorAll(
      ".top-level-accordion-item",
    )

    accordionItems.forEach((element) => {
      if (
        event.target.innerHTML
        !== element.querySelector(".main-nav-item").innerHTML
      ) {
        this.setState({
          [element.querySelector(".main-nav-item").innerHTML]: false,
        })
      } else {
        const newState = this.state[element.querySelector(".main-nav-item").innerHTML]
          !== true
        this.setState(prevState => ({
          ...prevState,
          [element.querySelector(".main-nav-item").innerHTML]: newState,
        }))
      }
    })
  };

  ResearchDropdown = () => (
    <Accordion>
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.Research}
        >
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={this.dropdownMenuAction}
          >
            Research
          </a>
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
                  <div className="col-xs-6 accordion-sub-title">
Programs
                  </div>
                  <div className="col-xs-1 carrot-icon">
&gt;
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  <li>
                    <Link
                      name="AMP-AD"
                      to="/Research/AMP-AD"
                      className="nav-item dropdown"
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="M2OVE"
                      to="/Research/M2OVE"
                      className="nav-item dropdown"
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="MODEL-AD"
                      to="/Research/Model-AD"
                      className="nav-item dropdown"
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Resilience-AD"
                      to="/Research/Resilience-AD"
                      className="nav-item dropdown"
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
                  <div className="col-xs-6 accordion-sub-title">
                    Consortia Research
                  </div>
                  <div className="col-xs-1 carrot-icon">
&gt;
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Genetics
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Differential Expressions
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Networks
                    </Link>
                  </li>
                </ul>
              </AccordionItemBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Research/Publications"
                    >
                      Publications
                    </Link>
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
                    <Link
                      name="external researchers"
                      to="/Research/ExternalResearchers"
                    >
                      External Researchers
                    </Link>
                  </div>
                  <div className="col-xs-1" />
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
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.Resources}
        >
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={this.dropdownMenuAction}
          >
            Resources
          </a>
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
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
Data
                  </div>
                  <div className="col-xs-1">
&gt;
                  </div>
                </div>
              </AccordionItemTitle>
              <AccordionItemBody>
                <ul>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                    >
                      Resilience-AD Program
                    </Link>
                  </li>
                </ul>
              </AccordionItemBody>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
Studies
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
                    Experimental Resources
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
Agora
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
                    Data Use Requirements
                  </div>
                  <div className="col-xs-1" />
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
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle
          className="accordion-title top-level-accordion"
          aria-selected={this.state.About}
        >
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={this.dropdownMenuAction}
          >
            About
          </a>
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
            <AccordionItemTitle>
              <div className="row between-xs">
                <div className="col-xs-12 accordion-sub-title">
                  What is the AMP-AD portal
                </div>
                <div className="col-xs-1" />
              </div>
            </AccordionItemTitle>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <div className="row between-xs">
                <div className="col-xs-6 accordion-sub-title">
People
                </div>
                <div className="col-xs-1" />
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
        <button className="menu-wall hidden" type="button" />
        <div className="col-xs-12 col-sm-3">
          <Link to="/">
            <img
              className="logo-header"
              src={require("./images/amp-ad-logo.svg")}
              alt="amp_ad_logo"
            />
          </Link>
        </div>
        <div className="col-xs-12 col-md-7">
          <ul className="nav row end-xs">
            <li>
              <Link to="/" className="main-nav-item nav-item active">
                Home
              </Link>
            </li>
            <li>
              {this.ResearchDropdown()}
            </li>
            <li>
              {this.ResourcesDropdown()}
            </li>
            <li className="about-dropdown">
              {this.AboutMenuDropdown()}
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header
