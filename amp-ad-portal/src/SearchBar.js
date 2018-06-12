import React, { Component } from "react"

class SearchBar extends Component {
 generateSelectionDropdown = props => {
    if(props !== undefined){
      let options = props.map( (element, index) => {
        return (
          <option key={index} value={element}>{element}</option>
        ); 
      });
      return <select name="speciesDropdownSelection" value={this.props.dropdownSelection} onChange={this.props.handleChange}>{options}</select>;
    }
  }

  render(){
    return (
      <section className="searchbar">
          <form className="searchbar-form">
            <div className="row between-xs">
              <div className="col-xs-12 col-sm-3">
                <h2 className="dropdown-description">View data by</h2> 
              </div>
              <div className="col-xs-12 col-sm-3">
                {this.generateSelectionDropdown(this.props.speciesSelection)}
              </div>
              <div className="col-xs-12 col-sm-3">
                <img src={require('./images/search.svg')} alt="search magnifying glass icon" className="svg-small-icon" /> 
                <a className="search-box" value="search" type="text">Search</a>
              </div>
              <div className="col-xs-12 col-sm-3">
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
