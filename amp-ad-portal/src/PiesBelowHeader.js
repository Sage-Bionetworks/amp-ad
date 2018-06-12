import React, { Component } from 'react'
import PieChart from "react-svg-piechart"
import PropTypes from 'prop-types'

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

class PiesBelowHeader extends Component{
  getCountsList = columnName => {
    return this.props.getColumnNameTypeAndCount(columnName, this.props.pageData)
  }

  printTotalCounts = listArray => {
    let counts = [];
    listArray.forEach( (element, index) => {
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
          <div className="pie-list row middle-xs" key={index}>
            <div className="pie-circle col-xs" 
              style={{'backgroundColor': colors[index%colors.length]}}
            ></div>
            <p className="pie-list-item col-xs">{element.value} ({element.count})</p>
          </div>
        ); 
      }
      return ''
    })  
    return <div className="row"><div className="col-xs-12">{list}</div></div>
  }

  buildPieData = (species = 'All Species', facetsList ) => {
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
        <div className="pie-container" >
          <h1 className="count">{this.props.pageData[dataType].count} {dataType}</h1>
          <div className="chart-center-stat">
            <h1 alt="count of samples">
              {this.printTotalCounts(this.getCountsList(dataType))}
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
        <div className="pie-counts-list" data-value={this.props.buttonState[dataType+"ButtonAll"]} >
          {this.printCountsList(this.getCountsList(dataType))}
        </div>
        <button className="pie-counts-button btn" 
          name={dataType+"ButtonAll"} 
          data-value={this.props.buttonState[dataType+"ButtonAll"]} 
          onClick={this.props.toggleSeeAll}>
            {this.props.buttonState[dataType+"ButtonAll"] === false ? "See all " + dataType + 's' : "Show less " + dataType + 's'}
        </button>
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
            {this.buildPieSection(this.props.speciesSelection, 'tissue')}
          </div>
        </div>
      </section>
    );
  };
}

PiesBelowHeader.propTypes = {
}

export default PiesBelowHeader;
