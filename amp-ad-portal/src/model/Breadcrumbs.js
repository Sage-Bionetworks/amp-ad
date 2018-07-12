import React from "react"
import { Route, Link } from "react-router-dom"
import PropTypes from "prop-types"

const BreadcrumbsItem = ({ match, ...rest }) => (
  <span>
    <li className={match.isExact ? "breadcrumb-active" : undefined}>
      <Link to={match.url || ""}>
        {match.url}
      </Link>
    </li>
    <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
  </span>
)

const Breadcrumbs = () => (
  <div className="breadcrumbs">
    <ul className="container">
      <Route path="/:path" component={BreadcrumbsItem} />
    </ul>
  </div>
)

export default Breadcrumbs
