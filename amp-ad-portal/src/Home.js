import React from 'react'
import Welcome from './Welcome'
import SearchBar from './SearchBar'
import PiesBelowHeader from './PiesBelowHeader'
import Programs from './Programs'
import Analyses from './Analyses'
import PopularDataRequests from './PopularDataRequests'

const ReactMarkdown = require('react-markdown')

const Home = props => {
  return (
    <div> 
     <Welcome />
      <SearchBar 
        dropdownSelection={props.speciesDropdownSelection}
        handleChange={props.handleChangeEvent}
        speciesSelection={props.speciesSelection} 
      />
      <PiesBelowHeader 
        toggleSeeAll={props.toggleSeeAll}
        buttonState={props.buttonState}
        speciesSelection={props.speciesDropdownSelection}
        getSum={props.getSum}
        getColumnCountForSpecies={props.getColumnCountForSpecies}
        getColumnNameTypeAndCount={props.getColumnNameDataTypeAndCount}
        pageData={props.pageData} 
        ratData={props.ratData}
        humanData={props.humanData}
        mouseData={props.mouseData}
        flyData={props.flyData}
      />

      <PopularDataRequests />
      <Analyses />
      <Programs />

      <section className="what-new">
				<div className="content col-xs-12 col-sm-8">
					<div className="row title-row">
						<div className="col-xs-12"><h2>What's New</h2></div>
					</div>
					<div className="row">
						<div className="col-xs-12 what-new-data">
							<ReactMarkdown 
								source={props.wikiNewsData} 
							/>
						</div>
					</div>
				</div>
      </section>

    </div>
  )
}

export default Home;
