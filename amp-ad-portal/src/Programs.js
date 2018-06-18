import React from 'react'

const Programs = props => {
  return (
    <section className="programs row">
      <div className="content col-xs-12 col-sm-8">
        <div className="row between-xs middle-xs title-row">
          <div className="col-xs-6 col-sm-6"><h2>Programs</h2></div>
          <div className="col-xs-3 col-sm-2"><a href="/">See All Programs</a></div>
        </div>

        <div className="row around-xs center-xs middle-xs">
            <div className="programs box col-sm-3">
              <div className="box-text-image">
                <img src={require('./images/consortium.svg')} alt="consortium molecule" className="svg-large-icon"/>
                <h4>AMP-AD</h4>
                <p>Understand the variation associated with disease or other molecular data.</p>
              </div>
              <button className="btn">View</button>
            </div>

          <div className="programs box col-sm-3">
            <div className="box-text-image">
                <img src={require('./images/brain-heart.svg')} alt="an illustration of brain overlapping a heart" className="svg-large-icon"/>
              <h4>AMP-AD</h4>
              <p>Understand the variation associated with disease or other molecular data.</p>
            </div>
            <button className="btn">View</button>
          </div>

          <div className="programs box col-sm-3">
            <div className="box-text-image">
                <img src={require('./images/mouse.svg')} alt="illustration of mouse" className="svg-large-icon"/>
              <h4>AMP-AD</h4>
              <p>Understand the variation associated with disease or other molecular data.</p>
            </div>
            <button className="btn">View</button>
          </div>

          <div className="programs box col-sm-3">
            <div className="box-text-image">
                <img src={require('./images/dna.svg')} alt="dna double helix" className="svg-large-icon"/>
              <h4>AMP-AD</h4>
              <p>Understand the variation associated with disease or other molecular data.</p>
            </div>
            <button className="btn">View</button>
          </div>
        </div>
      </div> 
    </section>
  )
}

export default Programs
