import React, { Component } from 'react';

class PiesBelowHeader extends Component {

  render(){
    return (
      <section className="pie-charts-welcome row">
        <div className="col-xs-12">
          <div className="row center-xs">
            <div className="assays pie-chart-welcome col-xs-12 col-sm-4">
              <h1 className="count">{this.props.pageData.assay.count} Assays</h1>
            </div>
            <div className="tissues pie-chart-welcome col-xs-12 col-sm-4">
              <h1 className="count">{this.props.pageData.tissue.count} Tissues</h1>
            </div>
            <div className="analyses pie-chart-welcome col-xs-12 col-sm-4">
              <h1 className="count">{this.props.pageData.analysisType.count} Analyses</h1>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

export default PiesBelowHeader;
