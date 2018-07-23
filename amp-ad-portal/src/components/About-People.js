import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"

//import * as SynapseClient from "synapse-react-client"
//import * as SynapseConstants from "synapse-react-client"
import { getTable } from "../queries/queryForData"
import {
  //getMarkdownSegment,
  waitFor,
  //getWikiKey,
  //getEntityHeader,
  asyncForEach,
  getUserProfileImage,
} from "../queries/getWikiData"
//import ShowHideSection from "../ShowHideSection"
import placeholder from "../images/placeholder_member.png"

import { getColumnNameIndex } from "../controller/PrepRawSynapseData"
import modalX from "../images/modalX.svg"

//const ReactMarkdown = require("react-markdown")

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

  modalWindow = (modalState, profile = this.state.activeProfile) => {
    if (modalState) {
      const activeProfile = this.getProfile(this.state.users, profile)[0]
      return (
        <div className="modal-container">
          <button
            style={{ backgroundImage: `url(${modalX})` }}
            className="modal-x"
            type="button"
            onClick={event => this.toggleProfileModal(event, this.state.modal)}
          />
          <div className="profile">
            <div className="row">
              <div className="col-xs-4">
                <div
                  className="profile-image-large"
                  style={{
                    backgroundImage: `url(${activeProfile.userProfileImage})`,
                  }}
                />
              </div>
              <div className="col-xs-8">
                <h2>
                  {activeProfile.firstName}
                  {" "}
                  {activeProfile.lastName}
                </h2>
              </div>
            </div>
          </div>
          <button
            className="modal-lightbox"
            type="button"
            onClick={event => this.toggleProfileModal(event, this.state.modal)}
          />
        </div>
      )
    }
    return ""
  };

  getProfile = (profiles, selectedProfile) => {
    return profiles.filter(profile => profile.ownerId === selectedProfile)
  };

  toggleProfileModal = (event, modalState) => {
    const body = document.querySelector("html")
    const activeProfile = event.target.getAttribute("name")

    if (modalState) {
      body.classList.remove("noScroll")
      this.setState({
        modal: false,
      })
      return ""
    }

    if (!modalState) {
      body.classList.add("noScroll")
      this.setState({
        modal: true,
        activeProfile,
      })
    }
    return ""
  };

  buildUserThumbs = (users) => {
    return users.map((user) => {
      const styleConfig = {
        backgroundImage: `url(${user.userProfileImage})`,
      }
      return (
        <div>
          <button
            type="button"
            className="col-xs-12 col-sm-1 headshot-col"
            key={user.firstName + user.lastName}
            name={user.ownerId}
            onClick={event => this.toggleProfileModal(event)}
          >
            <div name={user.ownerId}>
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
            <div name={user.ownerId} className="background-highlight" />
          </button>
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
            {this.modalWindow(this.state.modal, this.state.activeProfile)}
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
