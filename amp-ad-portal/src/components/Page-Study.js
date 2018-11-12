import React, { Component } from "react"
import PropTypes from "prop-types"

class StudyPage extends Component {
  state = {
    params: {},
  };

  componentDidMount() {
    this.setState({
      params: this.props.match.params,
    })
  }

  render() {
    return (
      <div>
        {this.props.hash}
        {this.props.token}
      </div>
    )
  }
}

StudyPage.propTypes = {
  token: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
}

export default StudyPage
