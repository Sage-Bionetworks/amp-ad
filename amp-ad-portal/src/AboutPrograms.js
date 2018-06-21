import React from 'react';
import ShowHideSection from './ShowHideSection'

const AboutPrograms = props => {
  return (
    <div>
    <div className="row about programs">
      <div className="col-xs-12">
        <section className="row child-page-hero">
          <div className="col-xs-12 col-sm-9 content">
            <h2>Programs</h2>
            <p>The following NIA programs and contributors have support the content provided.</p>
          </div>
        </section>
				<section className="row center-xs about-intro-section">
					<div className="col-xs-12 col-sm-9">
						<h2>AMP-AD Target Discovery and Preclinical Validation Project</h2>
						<p>The Accelerating Medicines Partnership-Alzheimer’s Disease Target Discovery and Preclinical Validation Project is a component of the AMP-AD program, an NIA-led precompetitive, public private partnership, managed by the FNIH. The central goal of the Project is to shorten the time between the discovery of potential drug targets and the development of new drugs for Alzheimer’s disease treatment and prevention, by integrating the analyses of large-scale molecular data from human brain samples with network modeling approaches and experimental validation. The project brings together 6 multi-institutional, multidisciplinary academic teams, 4 industry partners and 4 non-profit organizations. The academic teams, supported by NIA grants are applying cutting-edge systems and network biology approaches to integrate multidimensional human “omic” data (genomic, epigenomic, RNAseq, proteomic) from more than 2,000 human brains at all stages of the disease with clinical and pathological data to: 1) discover novel therapeutic targets for Alzheimer’s disease, 2) gain a systems-level understanding of the gene, protein, and metabolic networks within which these novel targets operate, 3) evaluate their druggability in multiple model organisms</p>
					</div>
				</section>
        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-9">
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
          <div className="about-col col-xs-12 col-sm-9">
            <div className="row heading-section">
              <div className="col-xs-12">
								<h2>Select Publications</h2>
              </div>
            </div>
            <ShowHideSection content={selectPublications()} />
          </div>
        </section>

				<section className="row center-xs about-m2ove-intro-section">
					<div className="col-xs-12 col-sm-9">
						<h2>M2OVE-AD Consortium</h2>
						<p>The Molecular Mechanisms of the Vascular Etiology of Alzheimer’s Disease (M²OVE-AD) Consortium is a result of a collaboration between the NIA and NINDS.. The participating, multi-institutional, cross-disciplinary research teams will be generating various “omics” data (post and ante-mortem) from brain tissue and peripheral fluids collected through several natural history and population studies and use network biology approaches to integrate these data with data on neuroimaging, vascular physiology and cognitive measures. Predictions about molecular mechanisms will be explored in various animal models (AD models and models of vascular/metabolic risk factors).</p>
            <ul>
              <li>The goals of this initiative are to:</li>
              <li>Enable rapid and broad sharing of data</li>
              <li>Generate a deeper understanding of the phenotypes of risk and the molecular mechanisms linking vascular risk factors, cerebrovascular disease and AD</li>
              <li>Discover new disease-relevant therapeutic targets for prevention</li>
              <li>Identify molecular signatures that can be non-invasively measured and used for patient stratification.</li>
            </ul>
					</div>
				</section>
        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-9">
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
          <div className="about-col col-xs-12 col-sm-9">
            <div className="row heading-section">
              <div className="col-xs-12">
								<h2>Select Publications</h2>
              </div>
            </div>
            <ShowHideSection content={selectPublications()} />
          </div>
        </section>
  
				<section className="row center-xs about-m2ove-intro-section">
					<div className="col-xs-12 col-sm-9">
						<h2>Model AD Program</h2>
						<p>The Translational Center for Model Development and Evaluation for Late Onset AD (MODEL-AD) is an interdisciplinary effort among Indiana University, Jackson Laboratory and Sage Bionetworks funded through NIA’s initiative RFA AG16-014. The Center seeks to generate and characterize new animal models of AD, assess their relevance to human disease and develop translatable biomarkers. In addition the Center will create a pipeline for rigorous preclinical efficacy testing to accelerate the process by which candidate therapeutics can be advanced to human trials. One of the central goals of this new translational infrastructure program is to bridge the preclinical to clinical development gap by making data, analytical results and research models available rapidly and broadly for use in therapy development for AD.</p>
					</div>
				</section>
        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-9">
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
          <div className="about-col col-xs-12 col-sm-9">
            <div className="row heading-section">
              <div className="col-xs-12">
								<h2>Select Publications</h2>
              </div>
            </div>
            <ShowHideSection content={selectPublications()} />
          </div>
        </section>

				<section className="row center-xs about-resilience-intro-section">
					<div className="col-xs-12 col-sm-9">
						<h2>Resilience-AD Program</h2>
						<p>The central goal of the Resilience Program is to complement and expand existing efforts aimed at building predictive molecular models of AD to inform the discovery of novel targets and biomarkers, being carried out within the AMP-AD and M2OVE-AD Consortia. This program aims to generate deeper understanding of the mechanisms by which gene-environment interactions lead to cognitively resilient phenotypes in the presence of high risk for disease and identify new therapeutic targets amenable to pharmacologic and non-pharmacologic prevention strategies. The program will:</p>
					</div>
				</section>
        <section className="row about-section-content contributors center-xs">
          <div className="about-col col-xs-12 col-sm-9">
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
          <div className="about-col col-xs-12 col-sm-9">
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
              <h4>April 5, 2017</h4>
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
