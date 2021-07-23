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

class MemberModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      firstname:'',
      lastname: '',
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
          <ModalHeader toggle={toggle}>Add new member</ModalHeader>
          <ModalBody>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="productname">Firstname</Label>
                  <Input
                    id="productname"
                    name="productname"
                    type="text"
                    className="form-control"
                    value={this.state.firstname}
                    onChange={e => this.setState({firstname: e.target.value}) }
                  />
                </FormGroup>
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
              <Col sm="6">
                <FormGroup>
                  <Label htmlFor="manufacturername">
                    Lastname
                  </Label>
                  <Input
                    id="manufacturername"
                    name="manufacturername"
                    type="text"
                    className="form-control"
                    value={this.state.lastname}
                    onChange={e => this.setState({lastname: e.target.value}) }
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="manufacturername">
                    User Category
                  </Label>
                  <select className="custom-select custom-select-sm form-control" onChange={e => this.setState({
                    user_type: e.target.value
                  })}>
                      <option value="">Select Type</option>
                      <option value="ADMIN">Admin</option>
                      <option value="TRAINER">Trainer</option>
                      <option value="USER">Member</option>
                    </select>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={e => toggle()}>
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={e => register(
                this.state.email,
                this.state.firstname,
                this.state.lastname,
                this.state.user_type
            )}>
              Register
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    )
  }
}

MemberModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default MemberModal
