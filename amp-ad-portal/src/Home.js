import React from 'react'
import Welcome from './Welcome'
import SearchBar from './SearchBar'
import PiesBelowHeader from './PiesBelowHeader'
import Programs from './Programs'
import Analyses from './Analyses'
import PopularDataRequests from './PopularDataRequests'

const ReactMarkdown = require('react-markdown')

const Home = props => {
  return (
    <div> 
     <Welcome />
      <SearchBar 
        setDiagnosisMenu={this.setDiagnosisMenu}
        speciesSelection={props.speciesDropdownSelection}
        speciesSelectionOptions={props.speciesSelectionOptions} 
        diagnosesSelection={props.diagnosesDropdownSelection}
        diagnosesSelectionOptions={props.diagnosesSelectionOptions}

        handleChange={props.handleChangeEvent}
        handleReactDropdownEvent={props.handleReactDropdownEvent}
      />
      <PiesBelowHeader 
        toggleSeeAll={props.toggleSeeAll}
        buttonState={props.buttonState}
        diagnosesSelection={props.diagnosesDropdownSelection}
        speciesSelection={props.speciesDropdownSelection}
        getSum={props.getSum}
        getColumnCountForSpecies={props.getColumnCountForSpecies}
        getColumnNameTypeAndCount={props.getColumnNameDataTypeAndCount}
        pageData={props.pageData} 
        ratData={props.ratData}
        humanData={props.humanData}
        mouseData={props.mouseData}
        flyData={props.flyData}
      />
      <PopularDataRequests />
      <Analyses />
      <Programs />

      <section className="what-new row">
				<div className="content col-xs-12 col-sm-8">
					<div className="row title-row">
						<div className="col-xs-12"><h2>What's New</h2></div>
					</div>

					<div className="row new-row">
						<div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
              <img src={require('./images/plus-bell-icon.svg')} />
						</div>
						<div className="col-xs-12 col-sm-11 what-new-data">
              <h5>MAY 2018</h5>
              <h2>Data Release</h2>
              <h4>Additional Data for Previously Released Study</h4>
              <p>The ADMC_ADNI1 study. This release adds bile acid metabolomics to the previously released lipidomics and data from the p180 platform. All data in this study has been generated on the ADNI1 cohort and requires access approval through ADNI.</p>
						</div>
					</div>

          <div className="row new-row">
            <div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
              <img className="lightbulb" src={require('./images/lightbulb-on.svg')} />
            </div>
            <div className="col-xs-12 col-sm-11 what-new-data">
              <h5>April 2018</h5>
              <h2>Data Release</h2>
              <h4></h4>
              <p>The SUNYStrokeModel. Includes electrophysiological and behavioral data (Active Place Avoidance, Novel Object Recognition) in the following models: C57BL/6J - (WT), BKS.Cg-Dock7m+/+Leprdb/J, APP/PS1, J20, a/a Dock 7m+/Dock7m+, a/a Dock7m+/+Leprdb, where mice have been tested at 5 mo after a stroke or sham transient middle cerebral artery occlusion (tMCAo) procedure.</p>
            </div>
          </div>

          <div className="row new-row">
            <div className="col-xs-12 col-sm-1 what-new-data-icon vertical-line">
              <img src={require('./images/plus-bell-icon.svg')} />
            </div>
            <div className="col-xs-12 col-sm-11 what-new-data">
              <h5>April 2018</h5>
              <h2>Data Release</h2>
              <h4></h4>
              <p>The ROSMAP WGS data: 16 samples were identified that are either sex mismatches or discordant with previous array-based genotype data and recommended to be excluded. Samples are listed in WGS_sample_QC_info. Additional QC files can be found in the QC files.(https://www.synapse.org/#!Synapse:syn121779960 folder
The MSBB study: 55 RNAseq, 8 WES, 15 WGS samples are recommended to be excluded or remapped to the correct donor. Samples are listed in MSBB_RNAseq.WES.WGS_sample_QC_info</p>
            </div>
          </div>
				</div>
      </section>

      <section className="contribute-your-data row center-xs">
        <div className="col-xs-12 col-sm-10">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <img alt="upload icon" src={require('./images/computing-cloud.svg')} /> 
            </div>
            <div className="content-block col-xs-12 col-sm-8">
              <h2>Contribute Your Data</h2>
              <p>We encourage the research community to contribute data, analysis results, code and other resources that contributes to the AMP-AD Knowledge Portal research goals. Contact the Knowledge Portal admin team through the Discussion forum for further instructions.</p>
              <button className="btn">Learn More</button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;
