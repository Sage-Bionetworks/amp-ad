import React, { Component } from "react"
import PropTypes from "prop-types"
import packageJson from '../.package.json'

const getAllDependencyNames = ({ dependencies, devDependencies }) => [
  ...Object.entries(dependencies),
  ...Object.entries(devDependencies)
];
const myDependencies = getAllDependencyNames(packageJson);

class Versions extends Component {
  
  state = {
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  };

  render() {
    return (
      <section className="page versions">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1 className="header">Version {packageJson.version}</h1>
              &nbsp;
              <h5 className="header">Dependencies</h5>
              <div>
                <ul>
                  {myDependencies.map(function(entry){
                    return <li>{entry[0]} : {entry[1]}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

Versions.propTypes = {
  token: PropTypes.object,
}

Versions.defaultProps = {
  token: "",
}

export default Versions
