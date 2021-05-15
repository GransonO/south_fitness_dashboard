import React, {Component} from "react"
import PropTypes from "prop-types"
import {
  Button, Col, FormGroup, Input, Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader, Row,
  Table,
} from "reactstrap"
import img7 from "../../assets/images/product/img-7.png"
import img4 from "../../assets/images/product/img-4.png"
import * as moment from "moment";

class InstituteModal extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      email:'',
      name:'',
      adminName: '',
      user_type:''
    }
  }

  render() {
    const { isOpen, toggle, register } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>Add Institution</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="productname">Institution Name</Label>
                  <Input
                    id="productname"
                    name="productname"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={e => this.setState({name: e.target.value}) }
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="manufacturername">
                    Admin Name
                  </Label>
                  <Input
                    id="manufacturername"
                    name="manufacturername"
                    type="text"
                    className="form-control"
                    value={this.state.adminName}
                    onChange={e => this.setState({adminName: e.target.value}) }
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
                <FormGroup>
                  <Label htmlFor="manufacturerbrand">
                    Email Address
                  </Label>
                  <Input
                    id="manufacturerbrand"
                    name="manufacturerbrand"
                    type="text"
                    value={this.state.email}
                    onChange={e => this.setState({email: e.target.value}) }
                    className="form-control"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={e => register(
              [{
                id:  (Math.floor(Math.random() * 1000000) + 1000).toString,
                name: this.state.name,
                date: "03 Mar, 2020",// {moment().format("dddd, MMM Do YYYY, h:mm a")},
                members: "120",
                badgeClass: "success",
                status: "Active",
                admin: this.state.adminName,
                link: "#",
              }]
            )}>
              Add Institution
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    )
  }
}

InstituteModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default InstituteModal
