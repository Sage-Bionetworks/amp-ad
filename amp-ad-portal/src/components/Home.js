import React from "react"
import PropTypes from "prop-types"

import Welcome from "./Welcome"
import SearchBar from "./SearchBar"
import PiesBelowHeader from "./PiesBelowHeader.jsx"
import Programs from "./Programs"
import Analyses from "./Analyses"
import WhatsNew from "./WhatsNew.jsx"
//import PopularDataRequests from "./PopularDataRequests"
import BetaHeader from "./Beta"
import ContributeYourData from "./ContributeYourData"

const Home = props => (
  <div>
    <BetaHeader />
    <Welcome
      markdown={props.welcomeHeaderMarkdown}
      markdownText={props.welcomeHeaderMarkdownText}
      token={props.token}
      handleChanges={props.handleChanges}
    />
    <SearchBar
      setDiagnosisMenu={props.setDiagnosesMenu}
      speciesSelection={props.speciesDropdownSelection}
      speciesSelectionOptions={props.speciesSelectionOptions}
      diagnosesSelection={props.diagnosesDropdownSelection}
      diagnosesSelectionOptions={props.diagnosesSelectionOptions}
      handleChange={props.handleChangeEvent}
      handleReactDropdownEvent={props.handleReactDropdownEvent}
    />
    <PiesBelowHeader
      biosamplesLoading={props.biosamplesLoading}
      toggleSeeAll={props.toggleSeeAll}
      diagnosesSelection={props.diagnosesDropdownSelection}
      speciesSelection={props.speciesDropdownSelection}
      getSum={props.getSum}
      getColumnCountForSpecies={props.getColumnCountForSpecies}
      pageData={props.pageData}
    />
    <Analyses />
    <Programs />
    <WhatsNew
      markdown={props.whatsNewMarkdownSegs}
      token={props.token}
      handleNestedChanges={props.handleNestedChanges}
    />
    <ContributeYourData />
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
}

export default Home