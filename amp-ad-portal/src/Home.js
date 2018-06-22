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
        setDiagnosisMenu={this.setDiagnosisMenu}
        dropdownSelection={props.speciesDropdownSelection}
        diagnosesSelection={props.diagnosesDropdownSelection}
        handleChange={props.handleChangeEvent}
        speciesSelectionOptions={props.speciesSelectionOptions} 
        diagnoseseSelectionOptions={props.diagnosesSelectionOptions}
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

      <section className="what-new row">
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

      <section className="contribute-your-data row center-xs">
        <div className="col-xs-12 col-sm-10">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <img alt="upload icon" src={require('./images/computing-cloud.svg')} /> 
            </div>
            <div className="content-block col-xs-12 col-sm-8">
              <h2>Contribute Your Data</h2>
              <p>Aliquam commodo arcu diam, in pharetra erat faucibus id. Donec vel pulvinar dui, nec pharetra ligula. Nunc volutpat, diam vel rutrum luctus, nisi metus maximus diam, dignissim tincidunt elit urna vitae purus. </p>
              <button className="btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;
