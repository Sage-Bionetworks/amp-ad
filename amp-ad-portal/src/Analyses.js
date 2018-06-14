import React from 'react'

const Analyses = props => {
  return (
    <section className="analyses row">
      <div className="content col-xs-12 col-sm-8">
        <div className="row between-xs title-row">
          <div className="col-xs-6 col-sm-6"><h2>Analyses</h2></div>
          <div className="col-xs-3 col-sm-2"><a href="/">See All Analyses</a></div>
        </div>

        <div className="row around-xs center-xs middle-xs">
            <div className="analyses box col-sm-4">
              <div className="box-text-image">
                <img src={require('./images/dna.svg')} alt="dna double helix" className="svg-large-icon"/>
                <h4>Genetics</h4>
                <p>Understand the variation associated with disease or other molecular data.</p>
              </div>
              <button className="btn">View</button>
            </div>

          <div className="analyses box col-sm-4">
            <div className="box-text-image">
              <img src={require('./images/differential-expressions.svg')} alt="dna double helix" className="svg-large-icon"/>
              <h4>Differential Expressions</h4>
              <p>Understand the variation associated with disease or other molecular data.</p>
            </div>
            <button className="btn">View</button>
          </div>

          <div className="analyses box col-sm-4">
            <div className="box-text-image">
              <img src={require('./images/networks.svg')} alt="dna double helix" className="svg-large-icon"/>
              <h4>Networks</h4>
              <p>Understand the variation associated with disease or other molecular data.</p>
            </div>
            <button className="btn">View</button>
          </div>
        </div>

      </div> 
    </section>
  )
}

export default Analyses
