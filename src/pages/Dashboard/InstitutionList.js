import React, { Component } from "react"

import {
  Card,
  CardBody,
  CardTitle,
  Badge,
  Button,
  Col,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
} from "reactstrap"
import { Link } from "react-router-dom"
import swal from "sweetalert";
import InstituteModal from "./InstituteModal";

class InstitutionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      allInstitutions: []
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }


   getInstitutions = async() => {

       fetch("https://southfitness.epitomesoftware.live/institution/all/", {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------------", response);
          this.setState({
            allInstitutions: response
          })
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  componentDidMount() {
    this.getInstitutions();
  }

  deleteAccount = (id) => {
    if(id === ""){
        swal("🤨", "You need to enter institution id", "info");
        return
      }

    swal({
        title: "Confirm!",
        text: "This institution will be deleted",
        type: "info",
        buttons: "Okay"
      }).then(okay => {
           if (okay) {
             this.deleteOkay(id)
            }
        });
  };

  deleteOkay = (id) => {
       fetch("https://southfitness.epitomesoftware.live/institution/", {
          method: "PUT",
         headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
             institute_id: id,
             is_active: false
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------The Members List-----------------", response);
          swal("Success!", "Institution deleted success", "success").then((value) => {
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
                    className="chat-send w-md waves-effect waves-light"
                    onClick={ e => window.location.href="/institution" }
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
                  {this.state.allInstitutions.map((transaction, key) => (
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
                          {transaction.institute_name}{" "}
                        </Link>{" "}
                      </td>
                      <td>{transaction.createdAt}</td>
                      <td>{this.props.totalMembers.length === 0 ? "0" : this.props.totalMembers.filter((item) => item.institution_id === transaction.institute_id).length }</td>
                      <td>
                        <Badge
                          className={
                            transaction.is_active ? "font-size-12 badge-soft-success" : "font-size-12 badge-soft-danger"
                          }
                          pill
                        >
                          {transaction.is_active ? "Active" : "InActive"}
                        </Badge>
                      </td>
                      <td>
                        {transaction.institute_admin_name}
                      </td>
                      <td>
                        <UncontrolledDropdown
                            className="dropdown"

                          >
                            <DropdownToggle
                              className="text-muted font-size-16"
                              color="white"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right"  direction="right">
                              <Link className="dropdown-item">
                                <Button
                                    type="button"
                                    color="primary"
                                    size="sm"
                                    className="chat-send w-md waves-effect waves-light"
                                    onClick={e => window.location.href = "/edit-institution?id=" + transaction.institute_id}
                                  >
                                  Update Institution
                                </Button>
                              </Link>
                              <Link className="dropdown-item">
                                <Button
                                    type="button"
                                    color="danger"
                                    size="sm"
                                    className="chat-send w-md waves-effect waves-light"
                                    onClick={e => this.deleteAccount(transaction.institute_id)}
                                  >
                                  Delete Institution
                                </Button>
                              </Link>

                            </DropdownMenu>
                          </UncontrolledDropdown>
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
