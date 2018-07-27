import React, { Component } from "react"
import PropTypes from "prop-types"
import { BarLoader } from "react-spinners"
import update from "immutability-helper"

import { getTable } from "../queries/queryForData"
import {
  waitFor,
  asyncForEach,
  getUserProfileImage,
  getUserProfile,
} from "../queries/getWikiData"

import placeholder from "../images/placeholder_member.png"
import { getColumnNameIndex } from "../controller/PrepRawSynapseData"
import modalX from "../images/modalX.svg"

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true,
      modal: false,
      activeProfile: 0,
    }
  }

  componentDidMount() {
    this.getData()
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
        return users
      })
      .then((users) => {
        this.buildProfileToUsersArray(users)
      })
  };

  getProfileFromState = (profiles, selectedProfile) => {
    return profiles.filter(profile => profile.ownerId === selectedProfile)
  };

  getProfileIndexFromState = (profiles, selectedProfile) => {
    let matchedIndex
    profiles.forEach((profile, index) => {
      if (profile.ownerId === selectedProfile) {
        matchedIndex = index
      }
    })
    return matchedIndex
  };

  setUserProfile = (profile, token) => {
    getUserProfile(profile.ownerId, token).then((profileResponse) => {
      const newState = update(this.state, {
        activeProfile: {
          profile: { $set: profileResponse },
        },
      })
      this.setState(newState)
    })
  };

  modalWindow = (modalState, activeProfile = this.state.activeProfile) => {
    if (modalState) {
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
              <div className="col-xs-12 col-sm-4 profile-image-container">
                <div
                  className="profile-image-large"
                  style={{
                    backgroundImage: `url(${activeProfile.userProfileImage})`,
                  }}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <div className="row">
                  <div className="col-xs-12">
                    <h2>
                      {activeProfile.firstName}
                      {" "}
                      {activeProfile.lastName}
                    </h2>
                    <h3>
                      {activeProfile.institution}
                    </h3>
                    <p className="profile-summary">
                      {activeProfile.profile !== undefined
                        ? activeProfile.profile.summary
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6">
                    <h4>
Consortia
                    </h4>
                    <p>
                      {activeProfile.consortia}
                    </p>
                  </div>
                  <div className="col-xs-6">
                    <h4>
Grant
                    </h4>
                    <p>
                      {activeProfile.grant}
                    </p>
                  </div>
                </div>
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

  toggleProfileModal = (event, modalState) => {
    const body = document.querySelector("html")
    let activeProfile = event.target.getAttribute("name")
    activeProfile = JSON.parse(activeProfile)
    if (activeProfile === null) {
      activeProfile = event.target.getAttribute("user")
      body.classList.remove("noScroll")
      this.setState({
        modal: false,
      })
      return
    }

    if (modalState) {
      body.classList.remove("noScroll")
      this.setState({
        modal: false,
      })
      return
    }

    if (!modalState) {
      body.classList.add("noScroll")
      this.setState(
        {
          modal: true,
          activeProfile,
        },
        () => {
          this.setUserProfile(
            this.state.activeProfile,
            this.props.token.sessionToken,
          )
        },
      )
    }
  };

  buildUserThumbs = (users) => {
    return users.map((user) => {
      const styleConfig = {
        backgroundImage: `url(${user.userProfileImage})`,
      }
      return (
        <div key={user.firstName + user.lastName + user.ownerId}>
          <button
            type="button"
            className="col-xs-12 col-sm-1 headshot-col"
            name={JSON.stringify(user)}
            onClick={event => this.toggleProfileModal(event)}
          >
            <div name={JSON.stringify(user)}>
              <div
                style={styleConfig}
                alt="headshot"
                className="headshot"
                name={JSON.stringify(user)}
              />
            </div>
            <div
              className="row center-xs around-xs"
              name={JSON.stringify(user)}
            >
              <p className="profile-name" name={JSON.stringify(user)}>
                {user.firstName}
                {" "}
                {user.lastName}
              </p>
            </div>
            <div name={JSON.stringify(user)} className="background-highlight" />
          </button>
        </div>
      )
    })
  };

  buildProfileToUsersArray = async (userArray) => {
    return asyncForEach(userArray, async (row) => {
      await waitFor(20)
      this.setState({
        loading: true,
      })
      return getUserProfileImage(row.ownerId).then((result) => {
        if (result.redirected === true) {
          this.setState({
            loading: false,
            users: [
              ...this.state.users,
              {
                firstName: row.firstName,
                lastName: row.lastName,
                ownerId: row.ownerId,
                institution: row.institution,
                consortia: row.consortia,
                grant: row.grant,
                profile: {},
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
                institution: row.institution,
                consortia: row.consortia,
                grant: row.grant,
                profile: {},
                userProfileImage: placeholder,
              },
            ],
          })
        }
      })
    })
  };

  assembleUsers = (tableResponse) => {
    const firstNameIndex = getColumnNameIndex(tableResponse, "firstName")
    const lastNameIndex = getColumnNameIndex(tableResponse, "lastName")
    const ownerIdIndex = getColumnNameIndex(tableResponse, "ownerID")
    const institutionIndex = getColumnNameIndex(tableResponse, "institution")
    const consortiaIndex = getColumnNameIndex(tableResponse, "consortia")
    const grantIndex = getColumnNameIndex(tableResponse, "grant")
    const users = []
    tableResponse.queryResult.queryResults.rows.forEach((row) => {
      users.push({
        firstName: row.values[firstNameIndex],
        lastName: row.values[lastNameIndex],
        ownerId: row.values[ownerIdIndex],
        institution: row.values[institutionIndex],
        consortia: row.values[consortiaIndex],
        grant: row.values[grantIndex],
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
