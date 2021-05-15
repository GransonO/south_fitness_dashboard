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
      transactions: [
        {
          id: "members1",
          name: "Martha Smart",
          date: "07 Oct, 2019",
          team: "Speed",
          department: "Sales",
          badgeClass: "success",
          status: "Active",
          link: "#",
        },
        {
          id: "members2",
          name: "Victor Liss",
          date: "07 Oct, 2020",
          team: "Speed",
          department: "UI",
          badgeClass: "success",
          status: "Active",
          link: "#",
        },
        {
          id: "members3",
          name: "Aura Smith",
          date: "09 Jun, 2020",
          team: "Speed",
          department: "Production",
          badgeClass: "success",
          status: "Active",
          link: "#",
        },
      ],
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
       fetch("https://south-fitness.herokuapp.com/auth/register", {
          method: "POST",
         headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": email,
              "firstname": fName,
              "lastname": lName,
              "password": "12345",
              "user_type": userType,
              "institution": localStorage.getItem("south_fitness_institution"),
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
                    {/*<th></th>*/}
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
                          className={
                            "font-size-12 badge-soft-" + "success"
                          }
                          color={"success"}
                          pill
                        >
                          {"Active"}
                        </Badge>
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
