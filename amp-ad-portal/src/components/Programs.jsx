import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Programs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  handleChanges = (stateKey, updatedState) => {
    this.setState({
      [stateKey]: updatedState,
    })
  };

  QueryWrapper = () => {
    const sql = 'SELECT * FROM syn17024173'
    return (
      <this.props.SynapseComponents.CardContainerLogic
        sql={sql}
        type={this.props.SynapseConstants.AMP_CONSORTIUM}
      />
    )
  };

  render() {
    return (
      <section className="programs">
        <h2 className="header">Programs</h2>
        <this.QueryWrapper />
      </section>
    )
  }
}

Programs.propTypes = {
  token: PropTypes.string,
  SynapseConstants: PropTypes.object.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}
Programs.defaultProps = {
  token: '',
}

export default Programs
