import React from "react"

const logoImage = require("../images/amp-footer-logo.svg")

const Footer = () => {
  return (
    <footer className="flex-row middle-xs">
      <div className="footer-background" />
      <div className="flex-row between-xs footer-row">
        <div className="flex-col-3 logo">
          <img className="logo-header" src={logoImage} alt="amp_ad_logo" />
        </div>
        <div className="flex-col-3 links">
          <div className="flex-row">
            <a href="https://www.synapse.org/#!Synapse:syn2580853/discussion/default">
              Forum
            </a>
            <a href="mailto:ampadportal@sagebionetworks.org">Contact</a>
            <a href="http://docs.synapse.org/articles/governance.html">
              Terms & Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
