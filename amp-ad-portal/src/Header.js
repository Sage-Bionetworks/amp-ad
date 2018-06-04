import React from 'react';

const Header = () => {
  return (
    <section className="row header">
      <div className="col-xs-12">
        <div className="row between-xs">
          <div className="col-xs-4">
            <img className="logo-header" src={require('./images/amp-ad-logo.svg')} alt="amp_ad_logo" />
          </div>
          <div className="col-xs-8">
            <ul className="nav row end-xs">
              <li className="nav-item"><a href="">link 1</a></li>
              <li className="nav-item"><a href="">link 2</a></li>
              <li className="nav-item"><a href="">link 3</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header
