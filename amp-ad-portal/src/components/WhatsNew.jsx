import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BarLoader } from 'react-spinners'

class WhatsNew extends Component {
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

  returnMarkdown = () => {
    return (
      <this.props.SynapseComponents.Markdown
        token={this.props.token}
        ownerId="syn12666371"
        wikiId="582408"
        updateLoadState={() => this.handleChanges('loading', false)}
      />
    )
  };

  returnBarLoader = () => {
    if (!this.props.synapseLoaded && this.props.defaultData.whatsNew) {
      return <div />
    }
    return <BarLoader color="#5BB0B5" loading={this.state.loading} />
  };

  render() {
    return (
      <section className="what-new flex-row">
        <div className="content-row-width flex-col-full">
          <div className="title-row between-xs">
            <div className="">
              <h2 className="header">What&apos;s New</h2>
            </div>
            <div className="content">{this.returnMarkdown()}</div>
            {this.returnBarLoader()}
          </div>
        </div>
      </section>
    )
  }
}

WhatsNew.propTypes = {
  token: PropTypes.string.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
  whatsNew: PropTypes.object,
}

WhatsNew.defaultProps = {
  whatsNew: {},
}

export default WhatsNew
