import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"

class Button extends Component {
  state = {}

  changeRoute = (url) => {
    this.props.history.push(url)
  }

  render() {
    return (
      <div className="row flex justify-end explore-button">
        <button type="button" className="btn-explore" onClick={() => this.changeRoute(this.props.url)}>
          <h5>
            Explore
            {" "}
            {this.props.label}
          </h5>
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  url: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  label: PropTypes.string,
}

Button.defaultProps = {
  label: "",
}

export default withRouter(Button)
