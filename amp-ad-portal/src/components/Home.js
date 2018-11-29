import React from "react"
import PropTypes from "prop-types"
import asyncComponent from "./AsyncComponent"

const Welcome = asyncComponent(() => import("./Welcome"))
const Explore = asyncComponent(() => import("./HomeExplore-Syn.js"))
const Programs = asyncComponent(() => import("./Programs.jsx"))
const WhatsNew = asyncComponent(() => import("./WhatsNew.jsx"))

const Home = props => (
  <div>
    <Welcome
      markdown={props.welcomeHeaderMarkdown}
      markdownText={props.welcomeHeaderMarkdownText}
      token={props.token}
      handleChanges={props.handleChanges}
    />
    <Explore
      token={props.token.sessionToken}
      SynapseConstants={props.SynapseConstants}
      SynapseComponents={props.SynapseComponents}
    />
    <Programs
      token={props.token.sessionToken}
      SynapseConstants={props.SynapseConstants}
      SynapseComponents={props.SynapseComponents}
    />
    <WhatsNew
      markdown={props.whatsNewMarkdownSegs}
      token={props.token.sessionToken}
      handleNestedChanges={props.handleNestedChanges}
      SynapseComponents={props.SynapseComponents}
    />
  </div>
)

Home.propTypes = {
  token: PropTypes.object.isRequired,
  handleChanges: PropTypes.func.isRequired,
  whatsNewMarkdownSegs: PropTypes.array.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default Home
