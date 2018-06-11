import React, { Component } from 'react'
import PieChart from "react-svg-piechart"
import PropTypes from 'prop-types'

class PiesBelowHeader extends Component{
  getCountsList = columnName => {
    return this.props.getColumnNameTypeAndCount(columnName, this.props.pageData)
  }

  printCountsList = listArray => {
    let list = listArray.map( (element, index) => {
      if(index > 0){
        return (
          <div className="row" key={index}>
            <p>{element.value} ({element.count})</p>
          </div>
        ); 
      }
      return ''
    })  
    return <div className="row"><div className="col-xs-12">{list}</div></div>
  }

  componentDidUpdate(){
  }

  render(){
    return (
      <section className="pie-charts-welcome row center-xs">
        <div className="col-xs-12 col-sm-10">
          <div className="row center-xs">
            <div className="assays pie-chart-welcome col-xs-12 col-sm-5">
              <div className="pie-container">
                <h1 className="count">{this.props.pageData.assay.count} Assays</h1>
                <div className="chart-center-stat">
                  <h1 alt="count of samples">1010</h1>
                  <p>Samples</p>
                </div>
                <PieChart 
                  data={
                    [{title: "human", value: this.props.getColumnCountForSpecies(this.props.humanData, 'assay'), color: "#89C889"},
                    {title: "mouse", value: this.props.getColumnCountForSpecies(this.props.mouseData, 'assay'), color: "#FCCB6F"},
                    {title: "fly", value: this.props.getColumnCountForSpecies(this.props.flyData, 'assay'), color: "#907FBA"},

                    {title: "rat", value: this.props.getColumnCountForSpecies(this.props.ratData, 'assay'), color: "#77AFD4"}]
                  }
                  expandOnHover={false}
                  expandSize={0}
                  shrinkOnTouchEnd={false}
                  strokeColor="#fff"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  viewBoxSize={50}
                />
              </div>
              <div>{this.printCountsList(this.getCountsList("assay"))}</div>
              <button className="btn">See all assays</button>
            </div>
            <div className="tissues pie-chart-welcome col-xs-12 col-sm-5">
              <div className="pie-container">
                <h1 className="count">{this.props.pageData.tissue.count} Tissues</h1>
                <div className="chart-center-stat">
                  <h1 alt="count of samples">1101</h1>
                  <p>Samples</p>
                </div>
                <PieChart 
                  data={
                    [{title: "human", value: this.props.getColumnCountForSpecies(this.props.humanData, 'tissue'), color: "#89C889"},
                    {title: "mouse", value: this.props.getColumnCountForSpecies(this.props.mouseData, 'tissue'), color: "#FCCB6F"},
                    {title: "fly", value: this.props.getColumnCountForSpecies(this.props.flyData, 'tissue'), color: "#907FBA"},
                    {title: "rat", value: this.props.getColumnCountForSpecies(this.props.ratData, 'tissue'), color: "#77AFD4"}]
                  }
                  expandOnHover={false}
                  expandSize={0}
                  shrinkOnTouchEnd={false}
                  strokeColor="#fff"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  viewBoxSize={50}
                />
              </div>
              <div>{this.printCountsList(this.getCountsList('tissue'))}</div>
              <button className="btn">See all tissues</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

PiesBelowHeader.propTypes = {
	allSpeciesAssayCount: PropTypes.number.isRequired,
	humanAssayCount: PropTypes.number.isRequired,
	mouseAssayCount: PropTypes.number.isRequired,
	ratAssayCount: PropTypes.number.isRequired,
	flyAssayCount: PropTypes.number.isRequired
}

export default PiesBelowHeader;
