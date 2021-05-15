import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap"

import avatar from "../../assets/images/users/avatar-1.jpg"

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownOpen: false,
    }
    this.toggledropdown = this.toggledropdown.bind(this)
  }

  toggledropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }
  render() {
    return (
      <React.Fragment>
        <Col xl={4}>

        </Col>
      </React.Fragment>
    )
  }
}
