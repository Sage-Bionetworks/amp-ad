import React from "react"
import PropTypes from "prop-types"

import Welcome from "./Welcome"
import Programs from "./Programs"
import WhatsNew from "./WhatsNew.jsx"
import Explore from "./HomeExplore-Syn.js"

const Home = props => (
  <div>
    <Welcome
      markdown={props.welcomeHeaderMarkdown}
      markdownText={props.welcomeHeaderMarkdownText}
      token={props.token}
      handleChanges={props.handleChanges}
    />
    <Explore token={props.token.sessionToken} />
    <Programs />
    <WhatsNew
      markdown={props.whatsNewMarkdownSegs}
      token={props.token}
      handleNestedChanges={props.handleNestedChanges}
    />
  </div>
)

Home.propTypes = {
  token: PropTypes.object.isRequired,
  handleChanges: PropTypes.func.isRequired,
  whatsNewMarkdownSegs: PropTypes.array.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
}

export default Home
