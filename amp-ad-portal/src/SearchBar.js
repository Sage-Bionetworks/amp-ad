import React, { Component } from "react"

class SearchBar extends Component {
 generateSelectionDropdown = (props, name) => {
    if(props !== undefined){
      let options = props.map( (element, index) => {
        return (
          <option key={index} value={element}>{element}</option>
        ); 
      });
      return <select name={name} value={this.props[name]} onChange={this.props.handleChange}>{options}</select>;
    }
  }

  render(){
    return (
      <section className="row searchbar">
          <form className="searchbar-form col-sm-10 col-md-10">
            <div className="row between-xs">
              <div className="col-xs-3 col-sm-2">
                <h2 className="dropdown-description">View data by</h2> 
              </div>
              <div className="col-xs-3 col-sm-3">
                {this.generateSelectionDropdown(this.props.speciesSelectionOptions, "speciesDropdownSelection")}
              </div>
              <div className="col-xs-3 col-sm-3">
                {this.generateSelectionDropdown(this.props.diagnoseseSelectionOptions, "diagnosesDropdownSelection")}
							</div>
              <div className="col-xs-3 col-sm-1 search-icon-box">
                <img src={require('./images/search.svg')} alt="search magnifying glass icon" className="svg-small-icon" /> 
                <a className="search-box" value="search" type="text">Search</a>
              </div>
              <div className="col-xs-3 col-sm-1 search-icon-box">
                <img src={require('./images/filter.svg')} alt="coffee filter icon" className="svg-small-icon" /> 
                <a className="search-box" value="filter" type="text">Filter</a>
              </div>
             </div>
          </form>
      </section>
    ) 
  }
}

export default SearchBar;
