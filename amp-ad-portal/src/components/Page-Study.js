import React, { Component } from "react"
import PropTypes from "prop-types"

class StudyPage extends Component {
  state = {
    params: {},
    name: "",
  };

  componentDidMount() {
    this.setState({
      params: this.props.match.params,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row center-xs">
          <div className="col-xs-12 col-sm-10">
            <h1>{this.state.params.handle}</h1>
          </div>
        </div>
      </div>
    )
  }
}

StudyPage.propTypes = {
  token: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
}

export default StudyPage
