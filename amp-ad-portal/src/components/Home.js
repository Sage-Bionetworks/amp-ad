import React from "react"
import PropTypes from "prop-types"

import Welcome from "./Welcome"
//import SearchBar from "./SearchBar"
//import PiesBelowHeader from "./PiesBelowHeader.jsx"
import Programs from "./Programs"
import Analyses from "./Analyses"
import WhatsNew from "./WhatsNew.jsx"
import Explore from "./HomeExplore-Syn.js"
//import PopularDataRequests from "./PopularDataRequests"
//import ContributeYourData from "./ContributeYourData"
//

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
  welcomeHeaderMarkdown: PropTypes.string.isRequired,
  welcomeHeaderMarkdownText: PropTypes.string.isRequired,
}

export default Home
