import React from 'react';
import ShowHideSection from './ShowHideSection'

const AboutPrograms = props => {
  return (
    <div className="row about">
      <div className="col-xs-12">
        <section className="row child-page-hero">
          <div className="col-xs-12 col-sm-10 content">
            <h2>Programs</h2>
            <p>The following NIA programs and contributors have support the content provided.</p>
          </div>
        </section>
				<section className="row center-xs about-intro-section">
					<div className="col-xs-12 col-sm-10">
						<h2>AMP-AD Target Discovery and Preclinical Validation Project</h2>
						<p>The Accelerating Medicines Partnership-Alzheimer’s Disease Target Discovery and Preclinical Validation Project is a component of the AMP-AD program, an NIA-led precompetitive, public private partnership, managed by the FNIH. The central goal of the Project is to shorten the time between the discovery of potential drug targets and the development of new drugs for Alzheimer’s disease treatment and prevention, by integrating the analyses of large-scale molecular data from human brain samples with network modeling approaches and experimental validation. The project brings together 6 multi-institutional, multidisciplinary academic teams, 4 industry partners and 4 non-profit organizations. The academic teams, supported by NIA grants are applying cutting-edge systems and network biology approaches to integrate multidimensional human “omic” data (genomic, epigenomic, RNAseq, proteomic) from more than 2,000 human brains at all stages of the disease with clinical and pathological data to: 1) discover novel therapeutic targets for Alzheimer’s disease, 2) gain a systems-level understanding of the gene, protein, and metabolic networks within which these novel targets operate, 3) evaluate their druggability in multiple model organisms</p>
					</div>
				</section>
        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-10">
            <div className="row heading-section">
              <div className="col-xs-12">
								<h2>Data Contributors</h2>
              </div>
            </div>
						<ShowHideSection content={dataContributors()} />
					</div>
          <div className="programs-col col-xs-12 col-sm-8">
          </div>
        </section>
        
        <section className="row about-section-content select-publications center-xs">
          <div className="about-col col-xs-12 col-sm-10">
            <div className="row heading-section">
              <div className="col-xs-12">
								<h2>Select Publications</h2>
              </div>
            </div>
            <ShowHideSection content={selectPublications()} />
          </div>
        </section>
      </div>
    </div>
  )
}

const selectPublications = () => {
  return (
    <div>
      <div className="row publications-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <h2>April 5, 2017</h2>
              <a href="/"><h2>Metabolic network failures in Alzheimer's disease—A biochemical road map</h2></a>
              <h2>Jon B. Toledo, Matthias Arnold, Gabi Kastenmüller et al., Alzheimers & Dementia.</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <h2>April 5, 2017</h2>
              <a href="/"><h2>Metabolic network failures in Alzheimer's disease—A biochemical road map</h2></a>
              <h2>Jon B. Toledo, Matthias Arnold, Gabi Kastenmüller et al., Alzheimers & Dementia.</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const dataContributors = () => {
  return (
    <div>
      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/"><h2>U01AG046152</h2></a>
              <a href="/"><h2>Pathway discovery, validation and compound identification for Alzheimer’s disease</h2></a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">Group Leads</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Institutions</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Contributed Studies</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
          </div>
          <div className="row"><button className="btn-light">Read Abstract</button></div>
        </div>
      </div>

      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/"><h2>U01AG046152</h2></a>
              <a href="/"><h2>Pathway discovery, validation and compound identification for Alzheimer’s disease</h2></a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">Group Leads</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Institutions</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Contributed Studies</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
          </div>
          <div className="row"><button className="btn-light">Read Abstract</button></div>
        </div>
      </div>

      <div className="row program-row">
        <div className="col-xs-12">
          <div className="row">
            <div className="col-xs-12">
              <a href="/"><h2>U01AG046152</h2></a>
              <a href="/"><h2>Pathway discovery, validation and compound identification for Alzheimer’s disease</h2></a>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <ul>
                <li className="heading">Group Leads</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Institutions</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
            <div className="col-sm-4">
              <ul>
                <li className="heading">Contributed Studies</li>
                <li>list item</li>
                <li>list item</li>
                <li>list item</li>
              </ul>
            </div>
          </div>
          <div className="row"><button className="btn-light">Read Abstract</button></div>
        </div>
      </div>
    </div>
  )
}

export default AboutPrograms
