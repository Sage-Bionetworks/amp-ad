import React from "react"
import { Link, withRouter } from "react-router-dom"

import Dropdown from "react-dropdown"
import "react-dropdown/style.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"

import "react-accessible-accordion/dist/minimal-example.css"
import "react-accessible-accordion/dist/fancy-example.css"

const aboutMenuOptions = [
  {
    label: (
      <Link name="Programs" to="/Programs" className="nav-item dropdown">
        Programs
      </Link>
    ),
    value: "one",
  },
  {
    label: (
      <Link
        name="Data Use"
        to="/DataUseRequirements"
        className="nav-item dropdown"
      >
        Data Use
      </Link>
    ),
    value: "two",
  },
  {
    label: (
      <Link name="Studies" to="/Studies" className="nav-item dropdown">
        Studies
      </Link>
    ),
    value: "three",
  },
]

const RouterDropDown = (options, placeholder, onChangeEvent) => {
  const menu = withRouter(({ history }) => (
    <Dropdown
      options={options}
      onChange={(event) => {
        console.log(event)
        history.push(event.label.props.to)
      }}
      placeholder={placeholder}
    />
  ))
  return menu
}

const Header = () => {
  const AboutMenu = RouterDropDown(aboutMenuOptions, "About")
  return (
    <header className="row between-xs header center-xs middle-xs">
      <div className="">
        <Link to="/">
          <img
            className="logo-header"
            src={require("./images/amp-ad-logo.svg")}
            alt="amp_ad_logo"
          />
        </Link>
      </div>
      <div className="col-xs-8 col-sm-6">
        <ul className="nav row end-xs">
          <li>
            <Link to="/" className="nav-item active">
              Home
            </Link>
          </li>
          <li>
            <Accordion>
              <AccordionItem>
                <AccordionItemTitle className="accordion-title top-level-accordion">
                  Programs
                </AccordionItemTitle>
                <AccordionItemBody className="accordion-body top-level-accordion">
                  <Accordion>
                    <AccordionItem className="row">
                      <AccordionItemTitle>
Program
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
                    <AccordionItem className="row">
                      <AccordionItemTitle>
                        Consortia Research
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
                  </Accordion>
                </AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </li>
          <li>
            <Link to="/tools" className="nav-item">
              Resources
            </Link>
          </li>
          <li>
            <AboutMenu />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
