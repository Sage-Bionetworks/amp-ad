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

const closeNavigation = () => {
  const openWindows = document.querySelectorAll("[aria-hidden='false']")
  openWindows.forEach((openWindow) => {
    //openWindow.removeAttribute("[aria-hidden='false']")
    openWindow.setAttribute("aria-hidden", "true")
    openWindow.classList.add("accordion__body--hidden")
  })
  const openDropdowns = document.querySelectorAll("[aria-selected='true']")
  openDropdowns.forEach((element) => {
    //element.removeAttribute("[aria-selected='true']")
    element.setAttribute("aria-selected", "false")
  })

  //const menuWall = document.querySelector(".menu-wall")
  //menuWall.classList.add("hidden")
}

//const eventFire = (el, etype) => {
//if (el.fireEvent) {
//el.fireEvent(`on${etype}`)
//} else {
//const evObj = document.createEvent("Events")
//evObj.initEvent(etype, true, false)
//el.dispatchEvent(evObj)
//}
//}

const dropdownMenuAction = (event) => {
  event.preventDefault()

  const accordionItems = document.querySelectorAll(".top-level-accordion-item")

  accordionItems.forEach((element) => {
    if (
      event.target.innerHTML
      !== element.querySelector(".main-nav-item").innerHTML
    ) {
      //console.log(element.querySelector(".main-nav-item").innerHTML)
      const openWindows = element.querySelectorAll("[aria-hidden='false']")
      openWindows.forEach((openWindow) => {
        openWindow.setAttribute("aria-hidden", "true")
        openWindow.classList.add("accordion__body--hidden")
      })
      const openDropdowns = element.querySelectorAll("[aria-selected='true']")
      openDropdowns.forEach((openDropdown) => {
        openDropdown.setAttribute("aria-selected", "false")
      })
    }
  })
}

const onClick = () => {
  //console.log("lolwat")
  closeNavigation()
  //setActiveNavigation()
}

class Header extends Component {
  componentDidUpdate() {
    setActiveNavigation()
  }

  render() {
    return (
      <header className="row between-xs header center-xs middle-xs">
        <button
          className="menu-wall hidden"
          onClick={closeNavigation}
          type="button"
        />
        <div className="col-xs-12 col-sm-3">
          <Link to="/" onClick={onClick}>
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
              <Link
                to="/"
                className="main-nav-item nav-item active"
                onClick={onClick}
              >
                Home
              </Link>
            </li>
            <li>
              <ProgramsDropdown />
            </li>
            <li>
              <ResourcesDropdown />
            </li>
            <li className="about-dropdown">
              <AboutMenuDropdown />
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const ProgramsDropdown = () => {
  return (
    <Accordion>
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={dropdownMenuAction}
          >
            Research
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
Programs
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
                      name="AMP-AD"
                      to="/Research/AMP-AD"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="M2OVE"
                      to="/Research/M2OVE"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="MODEL-AD"
                      to="/Research/Model-AD"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Resilience-AD"
                      to="/Research/Resilience-AD"
                      className="nav-item dropdown"
                      onClick={onClick}
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
                      onClick={onClick}
                    >
                      Genetics
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      Differential Expressions
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
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
                    Publications
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
                      onClick={onClick}
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
  )
}

const ResourcesDropdown = () => {
  return (
    <Accordion>
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={dropdownMenuAction}
          >
            Resources
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
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
                      onClick={onClick}
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={onClick}
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
  )
}

const AboutMenuDropdown = () => {
  return (
    <Accordion>
      <AccordionItem className="top-level-accordion-item">
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a
            href="/"
            className="nav-item main-nav-item"
            onClick={dropdownMenuAction}
          >
            About
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
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
  )
}

export default Header
