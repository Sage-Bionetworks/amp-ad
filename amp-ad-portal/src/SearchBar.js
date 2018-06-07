import React from "react"

const SearchBar = props => {
  return (
    <section className="searchbar row center-xs">
      <div className="col-xs-12 col-sm-10">
        <form className="searchbar-form">
          <p className="dropdown-description">View data sets and analyses by {props.generateDropdown} </p>
          <input className="search-box" value="search" type="text"></input>
        </form>
      </div>
    </section>
  ) 
}

export default SearchBar;
