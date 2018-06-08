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
      <section className="searchbar row center-xs">
        <div className="col-xs-12 col-sm-10">
          <form className="searchbar-form">
            <p className="dropdown-description">View data sets and analyses by {this.generateSelectionDropdown(this.props.speciesSelection)} </p>
            <a className="search-box" value="search" type="text">Search</a>
          </form>
        </div>
      </section>
    ) 
  }
}

export default SearchBar;
