import React, { Component } from "react"

import {Card, CardBody, CardTitle, Badge, Button, Col} from "reactstrap"
import { Link } from "react-router-dom"
import swal from "sweetalert";
import InstituteModal from "./InstituteModal";

class InstitutionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      transactions: [
         {
          id: "customCheck2",
          name: "Safaricom",
          date: "07 Oct, 2019",
          members: "400",
          badgeClass: "success",
          status: "Active",
          admin: "Mrs Lucy Anny",
          link: "#",
        },
        {
          id: "customCheck3",
          name: "Bata Shoe Company",
          date: "03 Mar, 2020",
          members: "130",
          badgeClass: "success",
          status: "Active",
          admin: "Mr Dominic Son",
          link: "#",
        },
        {
          id: "customCheck4",
          name: "Centum Group",
          date: "05 Aug, 2020",
          members: "40",
          badgeClass: "success",
          status: "Active",
          admin: "Mr Awori Maina",
          link: "#",
        },
      ],
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  registerUser = (object) => {
    console.log("*********", this.state.transactions);
    console.log("*********", typeof(this.state.transactions));
    this.setState({
      transactions: [...this.state.transactions, ...object]
    });
       // fetch("https://south-fitness.herokuapp.com/auth/register", {
       //    method: "POST",
       //   headers: {
       //          'Accept': 'application/json, text/plain',
       //          'Content-Type': 'application/json;charset=UTF-8'
       //      },
       //     body: JSON.stringify({
       //        "email": email,
       //        "firstname": fName,
       //        "lastname": lName,
       //        "password": "12345",
       //        "user_type": userType,
       //        "institution": localStorage.getItem("south_fitness_institution"),
       //    })
       //  })
       //  .then(response => response.json())
       //  .then(response => {
       //    console.log("----------------The Members List-----------------", response);
       //    swal("Success!", "Registration success", "success").then((value) => {
       //       location.reload();
       //      });
       //  })
       //  .catch((error) => {
       //
       //    // Code for handling the error
       //  });
  };

  render() {
    return (
      <React.Fragment>
        <InstituteModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          register={this.registerUser}
        />
        <Card>
          <CardBody>
            <CardTitle className="mb-12">
              <Col sm="6">
                Institution List
              </Col>
              <Col sm="6">
                <Button
                    type="button"
                    color="primary"
                    size="sm"
                    className="btn-rounded waves-effect waves-light"
                    onClick={this.toggleModal}
                  >
                    Add Institution
                </Button>
              </Col>
            </CardTitle>
            <div className="table-responsive">
              <table className="table table-centered table-nowrap mb-0">
                <thead className="thead-light">
                  <tr>
                    <th style={{ width: "20px" }}>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1"
                        >
                          &nbsp;
                        </label>
                      </div>
                    </th>
                    <th>Name</th>
                    <th>Joined Date</th>
                    <th>Total Members</th>
                    <th>Account Status</th>
                    <th>Account Admin</th>
                    <th>View Details</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.transactions.map((transaction, key) => (
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
                          {transaction.name}{" "}
                        </Link>{" "}
                      </td>
                      <td>{transaction.date}</td>
                      <td>{transaction.members}</td>
                      <td>
                        <Badge
                          className={
                            "font-size-12 badge-soft-" + transaction.badgeClass
                          }
                          color={transaction.badgeClass}
                          pill
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                      <td>
                        {transaction.admin}
                      </td>
                      <td>
                        <Button
                          type="button"
                          color="primary"
                          size="sm"
                          className="btn-rounded waves-effect waves-light"
                          onClick={
                            (e) => alert("Still working on this")
                          }
                        >
                          View Details
                        </Button>
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

export default InstitutionList
