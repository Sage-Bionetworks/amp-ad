import React from "react"
import { SynapseComponents } from "synapse-react-client"
import ShowHideSection from "../components/ShowHideSection"

const ReactMarkdown = require("react-markdown")

const makeid = () => {
  let text = ""
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const buildSection = (index, key, markdown, token = "", callback) => {
  return (
    <div key={makeid()}>
      <SynapseComponents.Markdown
        token={token}
        markdown={markdown[index] !== undefined ? markdown[index][key] : ""}
        hasSynapseResources={false}
        errorMessageView={<div>error</div>}
        updateLoadState={callback}
      />
    </div>
  )
}

const buildSectionReactMarkdown = (index, key, markdown) => {
  return (
    <ReactMarkdown
      source={markdown[index] !== undefined ? markdown[index][key] : ""}
      escapeHtml={false}
      key={makeid()}
      className="react-markdown"
    />
  )
}

const returnJsxFromMarkdown = (markdown, token = undefined) => {
  return (
    <SynapseComponents.Markdown
      token={token}
      markdown={markdown !== undefined ? markdown : ""}
      hasSynapseResources={false}
      errorMessageView={<div>error</div>}
    />
  )
}

const printSections = (markdownArray, token, limit = 200, callback) => {
  return markdownArray.map((section, index) => {
    if (index < limit) {
      return buildSection(
        index,
        Object.keys(section)[0],
        markdownArray,
        token,
        callback,
      )
    }
    const keyName = `${index}index`
    return <div key={keyName} />
  })
}

const printSectionsReactMarkdown = (markdownArray, limit = 200) => {
  return markdownArray.map((section, index) => {
    if (index < limit) {
      return buildSectionReactMarkdown(
        index,
        Object.keys(section)[0],
        markdownArray,
      )
    }
    const keyName = `${index}index`
    return <div key={keyName} />
  })
}
const printShowHideSections = (markdownArray) => {
  return markdownArray.map((element) => {
    return (
      <ShowHideSection
        content={returnJsxFromMarkdown(element[Object.keys(element)[0]])}
        key={Object.keys(element)[0] + makeid()}
      />
    )
  })
}

export {
  buildSection,
  printSections,
  returnJsxFromMarkdown,
  printShowHideSections,
  buildSectionReactMarkdown,
  printSectionsReactMarkdown,
}
