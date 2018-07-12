import React from "react"

const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />).
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: "language-", // CSS language prefix for fenced blocks. Can be
  linkify: true, // Autoconvert URL-like text to links
  typographer: true,
  quotes: "“”‘’",
  highlight(/*str, lang*/) {
    return ""
  },
})

const ReactMarkdown = require("react-markdown")

const About = (props) => {
  return (
    <div className="row about">
      <div className="col-xs-12">
        <section className="row child-page-hero">
          <div className="col-xs-12 col-sm-8 content">
            <h2>
Programs
            </h2>
            <p>
              The following NIA programs and contributors have support the
              content provided.
            </p>
          </div>
        </section>
        <section className="row about-section-content center-xs">
          <div className="about-col col-xs-12 col-sm-8">
            <ReactMarkdown source={props.programData} />
          </div>
          <div className="programs-col col-xs-12 col-sm-8">
            <ReactMarkdown
              source={formatMarkdown(props.contributorData)}
              escapeHtml={false}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default About
