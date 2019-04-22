import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProgramPage extends Component {
  state = {
    name: '',
  };

  parameters = {
    'AMP-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'AMP-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 where ( ( \"Program\" = 'AMP-AD' ) )",
      wikiId: '581895',
      wikiSubHero: 'programAMPAD_wiki',
      offlineJSON: 'syn17024229_programAMPAD',
    },
    'M2OVE-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'M2OVE-AD' ) )",
      wikiId: '581894',
      wikiSubHero: 'programM2OVEAD_wiki',
      offlineJSON: 'syn17024229_programM2OVEAD',
    },
    'Resilience-AD': {
      query:
        "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'Resilience-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'Resilience-AD' ) )",
      wikiId: '581898',
      wikiSubHero: 'programResilienceAD_wiki',
      offlineJSON: 'syn17024229_programResilienceAD',
    },
    'MODEL-AD': {
      query: "SELECT * FROM syn17024229 WHERE ( ( \"Program\" = 'MODEL-AD' ) )",
      cardQuery:
        "SELECT * FROM syn17024173 WHERE ( ( \"Program\" = 'MODEL-AD' ) )",
      wikiId: '581896',
      wikiSubHero: 'programMODELAD_wiki',
      offlineJSON: 'syn17024229_programMODELAD',
    },
  };

  returnCards = (query) => {
    return (
      <div className="explore-publications">
        <this.props.SynapseComponents.CardContainerLogic
          type={this.props.SynapseConstants.AMP_PROJECT}
          sql={query}
          limit={50}
        />
      </div>
    )
  };

  returnTitleCard = (cardQuery, synId, wikiId) => {
    return (
      <div className="hero-card">
        <div className="card-container program-markdown-header">
          <this.props.SynapseComponents.CardContainerLogic
            sql={cardQuery}
            type={this.props.SynapseConstants.AMP_CONSORTIUM}
          />
          {this.returnWikiData(synId, wikiId)}
        </div>
      </div>
    )
  };

  returnWikiData = (synId, wikiId) => {
    return (
      <div className="container wiki-markdown">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-centered">
            <this.props.SynapseComponents.Markdown
              ownerId={synId}
              wikiId={wikiId}
            />
          </div>
        </div>
      </div>
    )
  };

  render() {
    const handle = window.location.hash.substring('#/Explore/Programs/'.length)
    const query = this.parameters[handle].query
    const cardQuery = this.parameters[handle].cardQuery
    const wikiId = this.parameters[handle].wikiId
    const synId = 'syn12666371'

    return (
      <section className="page program-page">
        {this.returnTitleCard(cardQuery, synId, wikiId)}
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-10 col-centered">
              <h2 className="header">
                Explore
                {' '}
                {handle}
              </h2>
              <div className="row">
                {this.returnCards(query)}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

ProgramPage.propTypes = {
  SynapseConstants: PropTypes.object.isRequired,
}

export default ProgramPage
