import React, { Component } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import { withRouter, Link } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

class ProfileMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: false,
      name: "Admin",
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu,
    }))
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={localStorage.getItem("south_fitness_image")}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ml-2 mr-1">
              {localStorage.getItem("south_fitness_fullname")}
            </span>
            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
          </DropdownToggle>
          <DropdownMenu right>
            {/*<div className="dropdown-divider"/>*/}
            <Link to="/logout" className="dropdown-item">
              <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"/>
              <span>{this.props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    )
  }
}

ProfileMenu.propTypes = {
  t: PropTypes.any
}

export default withRouter(withTranslation()(ProfileMenu))
