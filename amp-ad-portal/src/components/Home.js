import React from "react"
import PropTypes from "prop-types"

import Welcome from "./Welcome"
import SearchBar from "./SearchBar"
import PiesBelowHeader from "./PiesBelowHeader.jsx"
import Programs from "./Programs"
import Analyses from "./Analyses"
import WhatsNew from "./WhatsNew.jsx"
//import Explore from "./HomeExplore.js";
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
    <Analyses />
    <Programs />
    <WhatsNew
      markdown={props.whatsNewMarkdownSegs}
      token={props.token}
      handleNestedChanges={props.handleNestedChanges}
    />
  </div>
)

Home.propTypes = {
  pageData: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  diagnosesDropdownSelection: PropTypes.string.isRequired,
  diagnosesSelectionOptions: PropTypes.array.isRequired,
  getColumnCountForSpecies: PropTypes.func.isRequired,
  getSum: PropTypes.func.isRequired,
  handleChangeEvent: PropTypes.func.isRequired,
  handleReactDropdownEvent: PropTypes.func.isRequired,
  handleChanges: PropTypes.func.isRequired,
  setDiagnosesMenu: PropTypes.func.isRequired,
  speciesDropdownSelection: PropTypes.string.isRequired,
  speciesSelectionOptions: PropTypes.array.isRequired,
  toggleSeeAll: PropTypes.func.isRequired,
  whatsNewMarkdownSegs: PropTypes.array.isRequired,
  handleNestedChanges: PropTypes.func.isRequired,
  welcomeHeaderMarkdown: PropTypes.string.isRequired,
  welcomeHeaderMarkdownText: PropTypes.string.isRequired,
  biosamplesLoading: PropTypes.bool.isRequired,
}

export default Home
