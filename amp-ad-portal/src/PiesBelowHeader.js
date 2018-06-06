import React, { Component } from 'react'
import PieChart from "react-svg-piechart"

class PiesBelowHeader extends Component{
  render(){
    return (
      <section className="pie-charts-welcome row">
        <div className="col-xs-12">
          <div className="row center-xs">
            <div className="assays pie-chart-welcome col-xs-12 col-sm-4">
							<PieChart 
								data={
									[{title: "human", value: this.props.humanAssayCount, color: "#89C889"},
									{title: "mouse", value: this.props.mouseAssayCount, color: "#FCCB6F"},
									{title: "fly", value: this.props.flyAssayCount, color: "#907FBA"},
									{title: "rat", value: this.props.ratAssayCount, color: "#77AFD4"}]
								}
								expandOnHover={false}
								expandSize={0}
								shrinkOnTouchEnd={false}
								strokeColor="#fff"
								strokeLinejoin="round"
								strokeWidth={0}
								viewBoxSize={50}
							/>
              <h1 className="count">{this.props.pageData.assay.count} Assays</h1>
            </div>
            <div className="tissues pie-chart-welcome col-xs-12 col-sm-4">
							<PieChart 
								data={
									[{title: "human", value: this.props.humanTissueCount, color: "#89C889"},
									{title: "mouse", value: this.props.mouseTissueCount, color: "#FCCB6F"},
									{title: "fly", value: this.props.flyTissueCount, color: "#907FBA"},
									{title: "rat", value: this.props.ratTissueCount, color: "#77AFD4"}]
								}
								expandOnHover={false}
								expandSize={0}
								shrinkOnTouchEnd={false}
								strokeColor="#fff"
								strokeLinejoin="round"
								strokeWidth={0}
								viewBoxSize={50}
							/>
              <h1 className="count">{this.props.pageData.tissue.count} Tissues</h1>
            </div>
            <div className="analyses pie-chart-welcome col-xs-12 col-sm-4">
							<PieChart 
								data={
									[{title: "human", value: this.props.humanAnalysisTypeCount, color: "#89C889"},
									{title: "mouse", value: this.props.mouseAnalysisTypeCount, color: "#FCCB6F"},
									{title: "fly", value: this.props.flyAnalysisTypeCount, color: "#907FBA"},
									{title: "rat", value: this.props.ratAnalysisTypeCount, color: "#77AFD4"}]
								}
								expandOnHover={false}
								expandSize={0}
								shrinkOnTouchEnd={false}
								strokeColor="#fff"
								strokeLinejoin="round"
								strokeWidth={0}
								viewBoxSize={50}
							/>
              <h1 className="count">{this.props.pageData.analysisType.count} Analyses</h1>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

export default PiesBelowHeader;
