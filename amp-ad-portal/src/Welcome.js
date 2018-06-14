import React from 'react';

const Welcome = () => {
  return (
    <section className="row welcome center-xs middle-xs">
      <div className="col-xs-12 col-sm-6 welcome-message">
        <h1>Welcome to the AMP-AD Knowledge Portal</h1>
        <h3>This portal shares data and analyses across a variety of human studies, animal and cellular model systems. There are 12,000 types of data (human, drosophila, mouse, celluar) and 900 types of anaylses within the Alzheimer’s Portal.</h3>
        <p>Help guide your interpretation of AMP AD and analysis</p>
				<button className="btn-light">Explore Results</button>
      </div>
      <div className="col-xs-12 col-sm-3 welcome-data">
        <ul>
          <li>data1</li>
          <li>data2</li>
          <li>data3</li>
          <li>data4</li>
          <li>data5</li>
          <li>data6</li>
        </ul>
      </div>
    </section>
  );
}

export default Welcome;
