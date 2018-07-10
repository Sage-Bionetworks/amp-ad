import React from "react"
import { Link } from "react-router-dom"

import "react-dropdown/style.css"
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from "react-accessible-accordion"

import "react-accessible-accordion/dist/minimal-example.css"

const closeNavigation = () => {
  const openWindows = document.querySelectorAll("[aria-hidden='false']")
  openWindows.forEach((openWindow) => {
    openWindow.removeAttribute("[aria-hidden='false']")
    openWindow.setAttribute("aria-hidden", "true")
    openWindow.classList.add("accordion__body--hidden")
  })
  const openDropdowns = document.querySelectorAll("[aria-selected='true']")
  openDropdowns.forEach((element) => {
    element.removeAttribute("[aria-selected='true']")
    element.setAttribute("aria-selected", "false")
  })

  //const menuWall = document.querySelector(".menu-wall")
  //menuWall.classList.add("hidden")
}

const dropdownMenuAction = (event) => {
  event.preventDefault()
  //let active
  //if (event.target.classList.contains("active")) {
  //active = true
  //}

  //const menuWall = document.querySelector(".menu-wall")
  //menuWall.classList.remove("hidden")
  //console.log(menuWall.classList)

  //const activeNavItems = document.querySelectorAll("[class='nav-item active']")
  //activeNavItems.forEach((navItem) => {
  //navItem.classList.remove("active")
  //})

  //if (active) {
  //active = false
  //event.target.classList.remove("active")
  //}

  const openWindows = document.querySelectorAll("[aria-hidden='false']")
  openWindows.forEach((openWindow) => {
    openWindow.removeAttribute("[aria-hidden='false']")
    openWindow.setAttribute("aria-hidden", "true")
    openWindow.classList.add("hidden")
    openWindow.classList.add("accordion__body--hidden")
  })

  const openDropdowns = document.querySelectorAll("[aria-selected='true']")
  openDropdowns.forEach((element) => {
    console.log(element.classList)
    element.removeAttribute("[aria-selected='true']")
    element.setAttribute("aria-selected", "false")
  })
}

const ProgramsDropdown = () => {
  return (
    <Accordion>
      <AccordionItem>
        <AccordionItemTitle className="accordion-title top-level-accordion">
          <a href="/" className="nav-item" onClick={dropdownMenuAction}>
            Research
          </a>
        </AccordionItemTitle>
        <AccordionItemBody className="accordion-body top-level-accordion">
          <Accordion>
            <AccordionItem className="accordion-row row">
              <AccordionItemTitle>
                <div className="accordion-sub-row row between-xs">
                  <div className="col-xs-6 accordion-sub-title">
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
                      name="AMP-AD"
                      to="/Research/AMP-AD"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="M2OVE"
                      to="/Research/M2OVE"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="MODEL-AD"
                      to="/Research/Model-AD"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Resilience-AD"
                      to="/Research/Resilience-AD"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
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
                      onClick={closeNavigation}
                    >
                      Genetics
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      Differential Expressions
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
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
                    Eternal Researchers
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
                      onClick={closeNavigation}
                    >
                      AMP-AD Target Discovery and Preclinical Validation
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      M2OVE-AD Consortium
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
                    >
                      Model AD Program
                    </Link>
                  </li>
                  <li>
                    <Link
                      name="Programs"
                      to="/Programs"
                      className="nav-item dropdown"
                      onClick={closeNavigation}
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
                <div className="col-xs-6 accordion-sub-title">
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

const Header = () => {
  return (
    <header className="row between-xs header center-xs middle-xs">
      <button
        className="menu-wall hidden"
        onClick={closeNavigation}
        type="button"
      />
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
