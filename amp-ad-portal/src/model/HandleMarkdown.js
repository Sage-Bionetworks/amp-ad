import React from "react"
import PropTypes from "prop-types"

const ReactMarkdown = require("react-markdown")

const buildSection = (index, key, props) => {
  return (
    <ReactMarkdown
      source={
        props.markdown[index] !== undefined ? props.markdown[index][key] : ""
      }
      escapeHtml={false}
    />
  )
}

buildSection.propTypes = {
  markdown: PropTypes.array.isRequired,
}

export { buildSection }
