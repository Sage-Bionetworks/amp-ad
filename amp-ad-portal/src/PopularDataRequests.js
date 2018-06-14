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
  )
}

export default PopularDataRequests
