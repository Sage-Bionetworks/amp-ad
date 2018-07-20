import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

import * as SynapseClient from "synapse-react-client"
import * as SynapseConstants from "synapse-react-client"
import { getTable } from "../queries/queryForData"
import {
  getMarkdownSegment,
  waitFor,
  getWikiKey,
  getEntityHeader,
  asyncForEach,
  getUserProfileImage,
} from "../queries/getWikiData"
import ShowHideSection from "../ShowHideSection"
import placeholder from "../images/placeholder_member.png"

import { getColumnNameIndex } from "../controller/PrepRawSynapseData"

const ReactMarkdown = require("react-markdown")

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: {},
      users: [],
      loading: true,
      modal: false,
      activeProfile: 0,
    }
  }

  componentDidMount() {
    this.getData().then(() => {})
  }

  componentDidUpdate() {}

  getData = async () => {
    return getTable(
      "syn13897207",
      this.props.token,
      "SELECT * FROM syn13897207",
    )
      .then((response) => {
        const users = this.assembleUsers(response)
        //const payloadAssay = this.assembleEntityHeaderPayload(response, 5)
        //this.setState({ users, tableData: response })
        return users
      })
      .then((users) => {
        this.buildProfileImagesToUsersArray(users)
      })
    //.then(() => {
    //console.log(this.state.users)
    //})
  };

  openProfileModal = (event) => {
    console.log(event.target.getAttribute("name"))
  };

  buildUserThumbs = (users) => {
    return users.map((user) => {
      const styleConfig = {
        backgroundImage: `url(${user.userProfileImage})`,
      }
      return (
        <div
          className="col-xs-12 col-sm-1 headshot-col"
          key={user.firstName + user.lastName}
          name={user.ownerId}
          onClick={event => this.openProfileModal(event)}
        >
          <div>
            <div
              style={styleConfig}
              alt="headshot"
              className="headshot"
              name={user.ownerId}
            />
          </div>
          <div className="row center-xs around-xs" name={user.ownerId}>
            <p className="profile-name" name={user.ownerId}>
              {user.firstName}
              {" "}
              {user.lastName}
            </p>
          </div>
        </div>
      )
    })
  };

  buildProfileImagesToUsersArray = async (userArray) => {
    return asyncForEach(userArray, async (row) => {
      await waitFor(20)
      this.setState({
        loading: true,
      })
      return getUserProfileImage(row.ownerId).then((result) => {
        console.log(result)
        if (result.redirected === true) {
          //row.userProfileImage = result.url
          this.setState({
            loading: false,
            users: [
              ...this.state.users,
              {
                firstName: row.firstName,
                lastName: row.lastName,
                ownerId: row.ownerId,
                userProfileImage: result.url,
              },
            ],
          })
        } else {
          this.setState({
            loading: false,
            users: [
              ...this.state.users,
              {
                firstName: row.firstName,
                lastName: row.lastName,
                ownerId: row.ownerId,
                userProfileImage: placeholder,
              },
            ],
          })
        }
      })
    })
  };

  assembleUsers = (tableResponse) => {
    //console.log(tableResponse)
    const firstNameIndex = getColumnNameIndex(tableResponse, "firstName")
    const lastNameIndex = getColumnNameIndex(tableResponse, "lastName")
    const ownerIdIndex = getColumnNameIndex(tableResponse, "ownerID")
    const users = []
    tableResponse.queryResult.queryResults.rows.forEach((row) => {
      users.push({
        firstName: row.values[firstNameIndex],
        lastName: row.values[lastNameIndex],
        ownerId: row.values[ownerIdIndex],
        userProfileImage: "",
      })
    })
    return users
  };

  render() {
    return (
      <div className="row about">
        <div className="col-xs-12">
          <section className="row child-page-hero">
            <div className="col-xs-12 col-sm-9 content">
              <h2>
People
              </h2>
              <p />
            </div>
          </section>
          <section className="row center-xs researchers-content">
            {this.buildUserThumbs(this.state.users)}
          </section>
          <div className="row center-xs">
            <BarLoader color="#47357B" loading={this.state.loading} />
          </div>
        </div>
      </div>
    )
  }
}

People.propTypes = {
  token: PropTypes.object.isRequired,
}

export default People
