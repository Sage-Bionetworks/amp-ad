import React from 'react'

const PopularDataRequests = props => {
  return (
    <section className="popular-data-requests row center-xs">
      <div className="col-xs-12 col-sm-8">
        <div className="row start-xs">
          <div className="col-xs-12">
            <h2>Popular Data Requests</h2>
          </div>
        </div>
        <div className="row most-popular-data center-xs">
          <div className="col-sm-4 popular-col">
            <img src={require('./images/magnifying-glass.svg')} 
                alt="dna double helix"
                className="svg-large-icon"/>
            <div className="row">
              <div className="col-xs-12">
                <div className="pop-assay row middle-xs">
                  <h5>Most Popular Assays</h5>
                </div>
                <div className="pop-assay row center-xs middle-xs around-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">rnaSEQ: Human</p>
                </div>
                <div className="pop-assay row middle-xs around-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">LC-MSMS: Human</p>
                </div>
                <div className="pop-assay row middle-xs around-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">rnaSEQ: Mouse</p>
                </div>
              </div>
            </div>
        </div>

          <div className="col-sm-4 popular-col">
            <img src={require('./images/brain.svg')} 
                alt="two dna double helix and arrows going from one to the other in a circular pattern"
                className="svg-large-icon"/>

            <div className="row">
              <div className="col-xs-12">
                <div className="pop-assay row center-xs middle-xs">
                  <h5>Most Popular Tissues</h5>
                </div>
                <div className="pop-assay row center-xs middle-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">Temporal cortex: Human</p>
                </div>
                <div className="pop-assay row middle-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">Prefrontal cortex: Human</p>
                </div>
                <div className="pop-assay row middle-xs">
                  <div className="pop-circle col-xs"></div>
                  <p className="pop-list-item col-xs">Cerebellum: Human</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularDataRequests
