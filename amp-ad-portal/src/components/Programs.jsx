import React, { Component } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/prefer-stateless-function
class Programs extends Component {
  render() {
    const sql = 'SELECT * FROM syn17024173'
    return (
      <section className="programs">
        <h2 className="header">Programs</h2>
        <this.props.SynapseComponents.CardContainerLogic
          sql={sql}
          type={this.props.SynapseConstants.AMP_CONSORTIUM}
        />
      </section>
    )
  }
}

Programs.propTypes = {
  SynapseConstants: PropTypes.object.isRequired,
}

export default Programs
