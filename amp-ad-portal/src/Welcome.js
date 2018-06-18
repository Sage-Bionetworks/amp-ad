import React from 'react';

const Welcome = () => {
  return (
    <section className="row welcome center-xs middle-xs">
      <div className="col-xs-12 col-sm-6 welcome-message">
        <h1>Welcome to the AMP-AD Knowledge Portal</h1>
        <h3>This portal shares data and analyses across a variety of human studies, animal and cellular model systems. There are 12,000 types of data (human, drosophila, mouse, celluar) and 900 types of anaylses within the Alzheimer’s Portal.</h3>
        <p>Help guide your interpretation of AMP AD and analysis</p>
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
