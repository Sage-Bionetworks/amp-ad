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

const buildSection = (index, key, markdown) => {
  if (markdown.length > 0) {
    const synapseMarkdown = (
      <div key={makeid()}>
        <SynapseComponents.Markdown
          markdown={markdown[index] !== undefined ? markdown[index][key] : ""}
          hasSynapseResources={false}
          errorMessageView={<div>error</div>}
        />
      </div>
    )
    return synapseMarkdown
  }
  return ""
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

const returnJsxFromMarkdown = (markdown) => {
  if (markdown.length > 0) {
    return (
      <SynapseComponents.Markdown
        markdown={markdown !== undefined ? markdown : ""}
        hasSynapseResources={false}
        errorMessageView={<div>error</div>}
      />
    )
  }
  return ""
}

const printSections = (markdownArray, token, limit = 200, callback) => {
  const content = markdownArray.map((section, index) => {
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
  return content
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

const printShowHideSections = (markdownArray, token) => {
  return markdownArray.map((element) => {
    return (
      <ShowHideSection
        content={returnJsxFromMarkdown(element[Object.keys(element)[0]], token)}
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
