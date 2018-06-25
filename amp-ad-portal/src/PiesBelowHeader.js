import React, { Component } from 'react'
import PieChart from "react-svg-piechart"
//import PropTypes from 'prop-types'

let colorsTissues = [
  '#F27277',
  '#EB8231',
  '#FAD591',
  '#B22D6B',
  '#F47E6C',
  '#FAD591',
  '#CC3F45',
  '#F89C55',
  '#FF9CA0',
  '#DE9A1F',
  '#BD422F',
  '#F7A6CC',
  '#9C141A',
  '#F683B9',
  '#FACFAF',
  '#FCA79A',
  '#C94281',
  '#C25D10',
  '#FFE2AD',
  '#B2242A',
  '#F7E2DF',
  '#D46D1E',
  '#CF8C15',
  '#FFC5BD',
  '#DA614F',
  '#F7C6DD',
  '#F5B33C',
  '#F5B584',
  '#E566A1',
  '#E0585D',
  '#FCCB6F'
  ];
let colorsAssays = [
  '#94C9EB',
  '#93ABE8',
  '#5BB0B5',
  '#109488',
  '#05635B',
  '#C5EDF0',
  '#42C7BB',
  '#47337D',
  '#3C4A63',
  '#3F833F',
  '#B2A5D1',
  '#6279A1',
  '#6DB56D',
  '#407BA0',
  '#3F5EAB',
  '#C0EBC0',
  '#77AFD4',
  '#7692D9',
  '#5BB0B5',
  '#10847A',
  '#C7D6FF',
  '#A6DDE0',
  '#24AB9F',
  '#47337D',
  '#24334F',
  '#A9EBE5',
  '#907FBA',
  '#4A5E81',
  '#58A158',
  '#2B688F',
  '#ABBEE0',
  '#A7DBA7',
  '#5B95BA',
  '#5171C0',
  '#2F8E94',
  '#BCE0F7',
  '#B1C6FA',
  '#7EC8CC',
  '#109488',
  '#332069',
  '#E1F4F5',
  '#63DBD0',
  '#5A478F',
  '#3C4A63',
  '#58A158',
  '#D5CFE3',
  '#849BC4',
  '#87C987',
  '#407BA0',
  '#5171C0'
];

class PiesBelowHeader extends Component{
  getCountsList = columnName => {
    let countsList = this.props.getColumnNameTypeAndCount(columnName, this.props.pageData) 
    countsList
      .sort( (a, b) => {
        return a.count - b.count;
      })
      .reverse()
    return countsList
  }

  printTotalCounts = listArray => {
    let counts = [];
		console.log(listArray)
    listArray.forEach( (element, index) => {
			counts.push(element.count); 
    }) 
    if( counts.length > 0 ){ 
      counts = counts.reduce(this.props.getSum);
    }
    return <div>{counts}</div>;
  }

  printCountsList = (listArray, dataType) => {
    let colors;
    if( dataType === 'tissue' || dataType === 'diagnosesTissue' ){ colors = colorsTissues } 
    else { colors = colorsAssays }

    let list = listArray.map( (element, index) => {
      if(index >= 0 && index < 3){
        return (
          <div className="pie-list row middle-xs" key={index}>
            <div className="pie-circle col-xs" style={{'backgroundColor': colors[index%colors.length]}}></div>
            <p className="pie-list-item col-xs">{element.value} ({element.count} biosamples)</p>
          </div>
        ); 
      }
      return ''
    })  
    return <div className="row"><div className="col-xs-12">{list}</div></div>
  }

  buildPieData = (species = 'All Species', facetsList, dataType ) => {
    let colors;
    if( dataType === 'tissue' || dataType === 'diagnosesTissue'){ colors = colorsTissues }
    else { colors = colorsAssays }
    return (
      facetsList.map( (element, index) => {
        return {title: element.value, value: element.count, color: colors[index%colors.length]}
      })
    )
  } 

  buildLinkToLocation = (event) => {
    event.preventDefault();
    if(event.target.name.includes('Human')){ window.open('https://www.synapse.org/#!Synapse:syn12532774/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjEyNTMyNzc0IiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==', '_blank') } 
    if(event.target.name.includes('Human Cell')){ window.open('https://www.synapse.org/#!Synapse:syn12532774/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjEyNTMyNzc0IiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkh1bWFuIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==', '_blank') } 
    if(event.target.name.includes('Fruit')){ window.open('https://www.synapse.org/#!Synapse:syn12532774/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjEyNTMyNzc0IiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIkZydWl0IGZseSJdfV0sICJpbmNsdWRlRW50aXR5RXRhZyI6dHJ1ZSwgImlzQ29uc2lzdGVudCI6dHJ1ZSwgIm9mZnNldCI6MCwgImxpbWl0IjoyNX0=', '_blank') }
    if(event.target.name.includes('Mouse')){ window.open('https://www.synapse.org/#!Synapse:syn12532774/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjEyNTMyNzc0IiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbIk1vdXNlIl19XSwgImluY2x1ZGVFbnRpdHlFdGFnIjp0cnVlLCAiaXNDb25zaXN0ZW50Ijp0cnVlLCAib2Zmc2V0IjowLCAibGltaXQiOjI1fQ==', '_blank') }
    if(event.target.name.includes('Rat')){ window.open('', '_blank') }
    if(event.target.name.includes('All')){ window.open('https://www.synapse.org/#!Synapse:syn12532774/tables/query/eyJzcWwiOiJTRUxFQ1QgKiBGUk9NIHN5bjEyNTMyNzc0IiwgInNlbGVjdGVkRmFjZXRzIjpbeyJjb25jcmV0ZVR5cGUiOiJvcmcuc2FnZWJpb25ldHdvcmtzLnJlcG8ubW9kZWwudGFibGUuRmFjZXRDb2x1bW5WYWx1ZXNSZXF1ZXN0IiwgImNvbHVtbk5hbWUiOiJzcGVjaWVzIiwgImZhY2V0VmFsdWVzIjpbXX1dLCAiaW5jbHVkZUVudGl0eUV0YWciOnRydWUsICJpc0NvbnNpc3RlbnQiOnRydWUsICJvZmZzZXQiOjAsICJsaW1pdCI6MjV9', '_blank') }
  }

  buildPieSection = (speciesDropdownSelection, dataType, label) => {
    //if(dataType === 'diagnosesTissue' || dataType === 'diagnosesAssay'){
      
    //}
    let pieData = this.buildPieData('this.props.speciesSelection', this.getCountsList(dataType), dataType);
    if(pieData.length > 0){
      return (
        <div className="pie-chart-welcome col-xs-12 col-sm-6">
          <div className="pie-container" >
            <h1 className="count">{this.props.pageData[dataType].count} {label}</h1>
            <div className="pie-circles-container">
              <div className="chart-center-stat">
                <h1 alt="count of samples">
                  {this.printTotalCounts(this.getCountsList(dataType))}
                </h1>
                <p>Biosamples</p>
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
          </div>
          <div className="pie-counts-list" data-value={this.props.buttonState[dataType+"ButtonAll"]} >
            {this.printCountsList(this.getCountsList(dataType), dataType)}
          </div>
          <button className="pie-counts-button btn" 
            name={this.props.speciesSelection} 
            data-value={this.props.buttonState[dataType+"ButtonAll"]} 
            onClick={this.buildLinkToLocation}
          >
              {this.props.speciesSelection === "All species" ? "See all " + label + 's' : "See all " + this.props.speciesSelection + ' ' + label + 's'}
          </button>
        </div>
      )
    }
    else return ''
  }

  componentDidUpdate(){
  }

  render(){
    return (
      <section className="pie-charts-welcome row center-xs">
        <div className="col-xs-12 col-sm-8">
          <div className="row around-xs center-xs">
            {this.buildPieSection(this.props.speciesSelection, 'assay', 'Assay')} 
            {this.buildPieSection(this.props.speciesSelection, 'tissue', 'Tissue')} 
          </div>
        </div>
      </section>
    );
  };
}

export default PiesBelowHeader;
