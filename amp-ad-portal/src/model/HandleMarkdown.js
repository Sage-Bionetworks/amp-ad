import React from "react"
import PropTypes from "prop-types"
import ShowHideSection from "../ShowHideSection"

const ReactMarkdown = require("react-markdown")

const makeid = () => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const buildSection = (index, key, props) => {
  return (
    <ReactMarkdown
      source={
        props.markdown[index] !== undefined ? props.markdown[index][key] : ""
      }
      escapeHtml={false}
      key={makeid()}
    />
  )
}

const returnJsxFromMarkdown = (markdown) => {
  return (
    <ReactMarkdown
      source={markdown !== undefined ? markdown : ""}
      escapeHtml={false}
    />
  )
}

const printSections = (sectionArray, props) => {
  return sectionArray.map((section, index) => {
    return buildSection(index, Object.keys(section)[0], props)
  })
}

const printShowHideSections = (markdowns) => {
  // takes array with multiple markdown objects { synapse#: markdown }
  return markdowns.map((element) => {
    return (
      <ShowHideSection
        content={returnJsxFromMarkdown(element[Object.keys(element)[0]])}
        key={Object.keys(element)[0] + makeid()}
      />
    )
  })
}

buildSection.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export {
  buildSection,
  printSections,
  returnJsxFromMarkdown,
  printShowHideSections,
}
