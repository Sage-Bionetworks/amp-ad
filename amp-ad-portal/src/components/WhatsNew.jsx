import React, { Component } from "react"
import PropTypes from "prop-types"

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

  componentShouldUpdate(nextProps) {
    if (nextProps.token !== this.props.token) {
      return true
    }
  }

  returnMarkdown = () => {
    if (this.props.token) {
      return (
        <this.props.SynapseComponents.Markdown
          token={this.props.token}
          ownerId="syn12666371"
          wikiId="582408"
          updateLoadState={() => this.handleChanges("loading", false)}
        />
      )
    }
    return <div />
  };

  render() {
    return (
      <section className="what-new flex-row">
        <div className="content-row-width flex-col-full">
          <div className="title-row between-xs">
            <div className="">
              <h2>What&apos;s New</h2>
            </div>
            <div className="content">{this.returnMarkdown()}</div>
          </div>
        </div>
      </section>
    )
  }
}

WhatsNew.propTypes = {
  token: PropTypes.string.isRequired,
  SynapseComponents: PropTypes.object.isRequired,
}

export default WhatsNew
