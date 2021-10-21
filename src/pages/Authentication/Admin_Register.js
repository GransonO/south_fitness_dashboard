import React, { Component } from "react"
import PropTypes from 'prop-types'

import {Alert, Card, CardBody, Col, Container, FormGroup, Row, Spinner} from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import swal from "sweetalert";

class Admin_Register extends Component {
  constructor(props) {
    super(props);
     this.state = {
      email: null,
      password: null,
      login: false,
      name:"",
      code:"",
      gender: "",
      currentPassword: null,
      confirmPassword: "",
    }
  }

  componentDidMount() {
    let param = new URL(window.location.href);
    this.setState(
        {
            email: param.searchParams.get("email"),
            name: param.searchParams.get("name"),
            code: param.searchParams.get("passed_code")
        }
    );
  }

  loginTheUser = async() => {

        if(this.state.email === null ||this.state.password === null || this.state.currentPassword === null  ){
            swal("Wait!", "Please fill all the details first", "info");
            return
        }

        if(this.state.password !== this.state.confirmPassword){
            swal("Wait!", "Passwords dont match", "error");
            return
        }

        this.setState({
          login: true
        });

        let profileData = {
          "gender": this.state.gender,
          "fullname": this.state.name,
          "email": this.state.email,
          "activation_code": this.state.code,
          "password": this.state.password
        };

        console.log("---------------> ", profileData);
         fetch('https://southfitness.epitomesoftware.live/institution/admin/', {
           method: "POST",
           headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify(profileData)
          })
          .then(response => response.json())
          .then(response => {
            this.setState({
              login: false
            });
            if(response.status === "success"){
              swal("Success!", "Account created success", "success");
              window.location.href ="/login";
            }else{
                swal("Fail!", "Account creation failed", "error");
            }
            // Code for handling the response
          })
          .catch((error) => {

            // Code for handling the error
          });
    };

  render() {
    return (
      <React.Fragment>
        <div className="home-btn d-none d-sm-block">
          <Link to="/" className="text-dark">
            <i className="bx bx-home h2" />
          </Link>
        </div>
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <div className="bg-soft-primary">
                    <Row>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary">Welcome Admin</h5>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div>
                      <Link to="/">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={logo}
                              alt=""
                              className="rounded-circle"
                              height="34"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="p-2">
                      <AvForm
                        className="form-horizontal"
                        onValidSubmit={this.handleValidSubmit}
                      >
                        {this.props.error && this.props.error ? (
                          <Alert color="danger">{this.props.error}</Alert>
                        ) : null}

                        <div className="form-group">
                          <AvField
                            name="Your Name"
                            className="form-control"
                            placeholder= "Your Name"
                            type="text"
                            disabled={true}
                            value={this.state.name}
                            onChange={evt => this.setState({currentPassword: evt.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            disabled={true}
                            value={this.state.email}
                          />
                        </div>

                        <select className="custom-select custom-select-sm form-control form-group" onChange={e => this.state.gender = e.target.value}>
                          <option value="">Select Gender</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>

                        <div className="form-group">
                          <AvField
                            name="current_pass"
                            type="password"
                            required
                            placeholder="Current Password"
                            value={this.state.currentPassword}
                            onChange={evt => this.setState({currentPassword: evt.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={evt => this.setState({password: evt.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <AvField
                            name="confirm password"
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={this.state.confirmPassword}
                            onChange={evt => this.setState({confirmPassword: evt.target.value})}
                          />
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            onClick = { e => this.loginTheUser()}
                          >
                            Submit
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <br/>
                          {this.state.login ? <Spinner animation="grow" /> : ""}
                        </div>

                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Admin_Register.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
};
export default withRouter(
 Admin_Register
)
