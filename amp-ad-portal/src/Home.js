import React from 'react';
import Welcome from './Welcome.js';
import SearchBar from './SearchBar.js';
import PiesBelowHeader from './PiesBelowHeader.js';

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

      <section className="popular-data-requests row center-xs">
        <div className="col-xs-12 col-sm-10">
          <div className="row">
            <h2>Popular Data Requests</h2>
          </div>
          <div className="row most-popular-data center-xs around-xs">
            <div className="col-sm-4 popular-col">
              <img src={require('./images/dna.svg')} 
                  alt="dna double helix"
                  className="svg-large-icon"/>
              <h5>Most Popular Assays</h5>
            </div>
            <div className="col-sm-4 popular-col">
              <img src={require('./images/differential-expressions.svg')} 
                  alt="two dna double helix and arrows going from one to the other in a circular pattern"
                  className="svg-large-icon"/>
              <h5>Most Popular Tissues</h5>
            </div>
          </div>
        </div>
      </section>

      <section className="analyses row">
        <div className="col-xs-12">
          <div className="row between-xs">
            <div className="col-xs-12 col-sm-6"><h2>Analyses</h2></div>
            <div className="col-xs-12 col-sm-2"><a href="/">See All Analyses</a></div>
          </div>

          <div className="row"></div>
        </div> 
      </section>
    </div>
  )
}

export default Home;
