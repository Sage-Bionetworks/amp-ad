import React from 'react';

const Welcome = () => {
  return (
    <section className="row welcome center-xs middle-xs">
      <div className="col-xs-12 col-sm-8 col-md-7 welcome-message">
        <h1>Welcome to the AMP-AD Knowledge Portal</h1>
        <h3>This portal shares data, analysis, and tools, relevant to the study of Alzheimer’s disease, contributed by grants funded through the AMP-AD, M²OVE-AD, MODEL-AD, and Resilience-AD Consortia. These are interconnected National Institue of Aging funded programs aiming to accelerate novel target and biomarker discovery and to identify mechanisms of disease risk and resilience.</h3>
        <h3>Use the Wall of Targets interactive results explorer to view information about Alzheimer’s targets nominated by AMP-AD Knowledge Portal investigators.</h3>
				<button className="btn-light">Explore Wall of Targets</button>
      </div>
      <div className="col-xs-12 col-sm-3 welcome-data">
        <ul>
          <li><span className="thin-large">50,000</span> Individuals</li>
          <li><span className="thin-large">70,000</span> Overall Biosamples</li>
          <li><span className="thin-large">50</span> Analyses</li>
          <li><span className="thin-large">50</span> Contributors</li>
          <li><span className="thin-large">50</span> Institutions</li>
          <li><span className="thin-large">50</span> Nominated Targets</li>
        </ul>
      </div>
    </section>
  );
}

export default Welcome;
