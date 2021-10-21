import React, { Component } from "react"

import {Card, CardBody, CardTitle, Badge, Button, Col, Row} from "reactstrap"
import { Link } from "react-router-dom"
import MemberModal from "./MemberModal";
import moment from "moment";
import swal from "sweetalert";

class MembersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      allMembers: [],
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  };

  registerUser = (email, fName, lName, userType) => {
      if(email === "" ||  fName === "" ||  lName === "" ||  userType === "" ){
        swal("🤨", "You need to fill all entries", "info");
        return
      }
      let value = this.props.members.filter(e => e.email === email);
      if(value.length > 0){
       swal("Error!", "User with email exists", "info");
       this.toggleModal();
      return
      }

       fetch("https://southfitness.epitomesoftware.live/auth/register", {
          method: "POST",
         headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": email,
              "firstname": fName,
              "lastname": lName,
              "user_type": userType,
              "institution": localStorage.getItem("south_fitness_institution"),
              "institution_id": localStorage.getItem("south_fitness_institution_id"),
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------The Members List-----------------", response);
          swal("Success!", "Registration success", "success").then((value) => {
             location.reload();
            });
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  deleteUser = (email, state) => {
    if(email === ""){
        swal("🤨", "You need to enter the users email", "info");
        return
      }

    swal({
        title: "Confirm!",
        text: state ? "This User will be activated" : "This User will be deleted",
        type: "info",
        buttons: "Okay"
      }).then(okay => {
           if (okay) {
             this.deleteOkay(email, state)
            }
        });
  };

  deleteOkay = (email, state) => {
       fetch("https://southfitness.epitomesoftware.live/profiles/", {
          method: "PUT",
         headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": email,
              "is_active": state
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------The Members List-----------------", response);
          swal("Success!", "Member updated success", "success").then((value) => {
              location.reload();
            });
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  render() {
    return (
      <React.Fragment>
        <MemberModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          register={this.registerUser}
        />
        <Card>
          <CardBody>
            <CardTitle className="mb-4">
              <Row>
                <Col sm="8">
                  Institution Members
                </Col>
                <Col sm="4">
                  <div className="float-right">
                    <Button
                      type="button"
                      color="primary"
                      size="sm"
                      className="chat-send w-md waves-effect waves-light"
                      onClick={this.toggleModal}
                    >
                        Add Member
                    </Button>
                  </div>
              </Col>
              </Row>
            </CardTitle>
            <div className="table-responsive">
              <table className="table table-centered table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: "20px" }}>

                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined Date</th>
                    <th>Department</th>
                    <th>Member Status</th>
                    <th>.</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.members.map((transaction, key) => (
                    <tr key={"_tr_" + key}>
                      <td>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={transaction.id}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={transaction.id}
                          >
                            &nbsp;
                          </label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="text-body font-weight-bold">
                          {" "}
                          {transaction.fullname}{" "}
                        </Link>{" "}
                      </td>
                      <td>{transaction.email}</td>
                      <td>
                        {moment(transaction.createdAt).format("dddd, MMM Do YYYY, h:mm a")}
                        </td>
                      <td>{transaction.team}</td>
                      <td>
                        <Badge
                          className={ transaction.is_active ?
                            "font-size-12 badge-soft-success": "font-size-12 badge-soft-danger"
                          }
                          pill
                        >
                          {transaction.is_active ? "Active": "In Active"}
                        </Badge>
                      </td>
                      <td>
                        {
                          transaction.is_active ?
                              <Button
                                type="button"
                                color="danger"
                                size="sm"
                                className="chat-send w-md waves-effect waves-light"
                                onClick={e => this.deleteUser(transaction.email, false)}
                              >
                              Deactivate
                              </Button> :
                              <Button
                                type="button"
                                color="success"
                                size="sm"
                                className="chat-send w-md waves-effect waves-light"
                                onClick={e => this.deleteUser(transaction.email, true)}
                              >
                              Activate
                              </Button>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default MembersList
