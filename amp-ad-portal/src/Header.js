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
      <Link
        name="What is the AMP-AD portal"
        to="/Programs"
        className="nav-item dropdown"
      >
        Programs
      </Link>
    ),
    value: "one",
  },
  {
    label: (
      <Link
        name="People"
        to="/DataUseRequirements"
        className="nav-item dropdown"
      >
        Data Use
      </Link>
    ),
    value: "two",
  },
]

const dropdownMenuAction = (event) => {
  event.preventDefault()
  let active
  if (event.target.classList.contains("active")) {
    active = true
  }

  const activeNavItems = document.querySelectorAll("[class='nav-item active']")
  activeNavItems.forEach((navItem) => {
    navItem.classList.remove("active")
  })

  if (active) {
    active = false
    event.target.classList.remove("active")
  }

  //else {
  //event.target.classList.add("active")
  //}

  const openDropdowns = document.querySelectorAll("[aria-selected='true']")

  openDropdowns.forEach((element) => {
    element.removeAttribute("[aria-selected='true']")
    element.setAttribute("aria-selected", "false")
    const openWindows = document.querySelectorAll("[aria-hidden='false']")
    openWindows.forEach((openWindow) => {
      openWindow.removeAttribute("[aria-hidden='false']")
      openWindow.setAttribute("aria-hidden", "true")
      openWindow.setAttribute(
        "class",
        "accordion-body top-level-accordion accordion__body--hidden",
      )
    })
  })
}

const ProgramsDropdown = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a href="/" className="nav-item" onClick={dropdownMenuAction}>
            Programs
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6">
Program
                  </div>
                  <div className="col-xs-1 carrot-icon">
>
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
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6">
Consortia Research
                  </div>
                  <div className="col-xs-1 carrot-icon">
>
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
          </Accordion>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  )
}

const ResourcesDropdown = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a href="/" className="nav-item" onClick={dropdownMenuAction}>
            Resources
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6">
Data
                  </div>
                  <div className="col-xs-1">
>
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
                  <div className="col-xs-6">
Studies
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6">
Experimental Resources
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6">
Agora
                  </div>
                  <div className="col-xs-1" />
                </div>
              </AccordionItemTitle>
            </AccordionItem>

            <AccordionItem>
              <AccordionItemTitle>
                <div className="row between-xs">
                  <div className="col-xs-6">
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
  )
}

const AboutMenuDropdown = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a href="/" className="nav-item" onClick={dropdownMenuAction}>
            About
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <AccordionItem>
            <AccordionItemTitle>
              <div className="row between-xs">
                <div className="col-xs-6">
Studies
                </div>
                <div className="col-xs-1" />
              </div>
            </AccordionItemTitle>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <div className="row between-xs">
                <div className="col-xs-6">
Studies
                </div>
                <div className="col-xs-1" />
              </div>
            </AccordionItemTitle>
          </AccordionItem>
        </AccordionItemBody>
      </AccordionItem>
    </Accordion>
  )
}

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
            <ProgramsDropdown />
          </li>
          <li>
            <ResourcesDropdown />
          </li>
          <li>
            <AboutMenuDropdown />
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
