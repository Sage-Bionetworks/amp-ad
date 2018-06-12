import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <section className="row header middle-xs">
      <div className="col-xs-12">
        <div className="row between-xs">
          <div className="col-xs-4">
            <Link to="/">
							<img className="logo-header" src={require('./images/amp-ad-logo.svg')} alt="amp_ad_logo" />
						</Link>
          </div>
          <div className="col-xs-8">
            <ul className="nav row end-xs">
              <li><Link to="/" className="nav-item">Home</Link></li>
              <li><Link to="/tools" className="nav-item">Tools</Link></li>
              <li><Link to="/about" className="nav-item">About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header
