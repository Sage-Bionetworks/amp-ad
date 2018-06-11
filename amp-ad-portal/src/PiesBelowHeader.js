import React, { Component } from 'react'
import PieChart from "react-svg-piechart"
import PropTypes from 'prop-types'

class PiesBelowHeader extends Component{
  getCountsList = columnName => {
    return this.props.getColumnNameTypeAndCount(columnName, this.props.pageData)
  }

  printTotalCounts = listArray => {
    let counts = [];
    let list = listArray.forEach( (element, index) => {
      if(index > 0){
        counts.push(element.count); 
      }
    }) 
    if( counts.length > 0 ){ 
      counts = counts.reduce(this.props.getSum);
    }
    return <div>{counts}</div>;
  }

  printCountsList = listArray => {
    let list = listArray.map( (element, index) => {
      if(index > 0){
        return (
          <div className="pie-list row" key={index}>
            <p className="pie-list-item">{element.value} ({element.count})</p>
          </div>
        ); 
      }
      return ''
    })  
    return <div className="row"><div className="col-xs-12">{list}</div></div>
  }

  buildPieData = (species = 'All Species', facetsList ) => {
    let colors = [
      '#89C889',
      '#F683B9',
      '#77AFD4',
      '#fca79a',
      '#907FBA',
      '#B4C6F9',
      '#FCCB6F',
      '#F5F5F5',
      '#EC7379',
      '#3CAB9F',
      '#5D69AC'
    ];
    if(species === 'All Species'){
      return (
        [{title: "human", value: this.props.getColumnCountForSpecies(this.props.humanData, 'assay'), color: "#89C889"},
        {title: "mouse", value: this.props.getColumnCountForSpecies(this.props.mouseData, 'assay'), color: "#FCCB6F"},
        {title: "fly", value: this.props.getColumnCountForSpecies(this.props.flyData, 'assay'), color: "#907FBA"},
        {title: "rat", value: this.props.getColumnCountForSpecies(this.props.ratData, 'assay'), color: "#77AFD4"}]
      )
    } else return (
      facetsList.map( (element, index) => {
        return {title: element.value, value: element.count, color: colors[index%colors.length]}
      })
    )
  } 

  buildPieSection = (speciesDropdownSelection, dataType) => {
    let pieData = this.buildPieData('this.props.speciesSelection', this.getCountsList(dataType));
    return (
      <div className="{dataType} pie-chart-welcome col-xs-12 col-sm-5">
        <div className="pie-container">
          <h1 className="count">{this.props.speciesSelection.toUpperCase() === 'ALL SPECIES' ? this.props.pageData[dataType].count : 111 }  Assays</h1>
          <div className="chart-center-stat">
            <h1 alt="count of samples">
              {this.printTotalCounts(this.getCountsList("{dataType}"))}
            </h1>
            <p>Samples</p>
          </div>
          <PieChart 
            data={pieData}
            expandOnHover={false}
            expandSize={0}
            shrinkOnTouchEnd={false}
            strokeColor="#fff"
            strokeLinejoin="round"
            strokeWidth={0}
            viewBoxSize={50}
          />
        </div>
        <div className="pie-counts-list">
          {this.printCountsList(this.getCountsList(dataType))}
        </div>
        <button className="btn">See all {dataType}</button>
      </div>
    )
  }

  componentDidUpdate(){
  }

  render(){
    return (
      <section className="pie-charts-welcome row center-xs">
        <div className="col-xs-12 col-sm-10">
          <div className="row center-xs">

            {this.buildPieSection(this.props.speciesSelection, 'assay')}

            <div className="assays pie-chart-welcome col-xs-12 col-sm-5">
              <div className="pie-container">
                <h1 className="count">{this.props.pageData.assay.count} Assays</h1>
                <div className="chart-center-stat">
                  <h1 alt="count of samples">
                    {this.printTotalCounts(this.getCountsList("assay"))}
                  </h1>
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
              <div className="pie-counts-list">
                {this.printCountsList(this.getCountsList("assay"))}
              </div>
              <button className="btn">See all assays</button>
            </div>



            <div className="tissues pie-chart-welcome col-xs-12 col-sm-5">
              <div className="pie-container">
                <h1 className="count">{this.props.pageData.tissue.count} Tissues</h1>
                <div className="chart-center-stat">
                  <h1 alt="count of samples">
                    {this.printTotalCounts(this.getCountsList("tissue"))}
                  </h1>
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
              <div className="pie-counts-list">{this.printCountsList(this.getCountsList('tissue'))}</div>
              <button className="btn">See all tissues</button>
            </div>
          </div>
        </div>
      </section>
    );
  };
}

PiesBelowHeader.propTypes = {
}

export default PiesBelowHeader;
