import PropTypes from 'prop-types'
import React, { Component } from "react"
import { Alert, Card, CardBody, Col, Container, Row, Input } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm } from "availity-reactstrap-validation"

// action
import { userForgetPassword } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import swal from "sweetalert";

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      reset: false,
      password: null,
      confirm_password: null,
      reset_code: null,
    }
  }

  resetEmail = async () => {
        if(this.state.email === null ){
            swal("Wait!", "Please enter the email", "info");
            return
        }

        this.setState({
          login: true
        });
         fetch('https://southfitness.epitomesoftware.live/auth/reset', {
           method: "POST",
           headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": this.state.email
            })
          })
          .then(response => response.json())
          .then(response => {
            if(response.success){
              swal("Success!", "reset success", "success");
              this.setState({ reset: true });
            }else{
                swal("Fail!", "reset failed", "error");
            }
            // Code for handling the response
          })
          .catch((error) => {
            // Code for handling the error
          });
    };

  resetPassword = async () => {
        if(this.state.password === null || this.state.confirm_password === null  || this.state.reset_code === null){
            swal("Wait!", "Please fill all the details first", "info");
            return
        }
        if(this.state.password !== this.state.confirm_password ){
            swal("Error!", "Passwords dont match", "error");
            return
        }
         fetch('https://southfitness.epitomesoftware.live/auth/reset', {
           method: "PUT",
           headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": this.state.email,
              "code": this.state.reset_code,
              "password": this.state.password,
            })
          })
          .then(response => response.json())
          .then(response => {
            this.setState({
              login: false
            });
            if(response.status === "success"){
              swal("Success!", "Login success", "success");
              window.location.href ="/login";
            }else{
                swal("Fail!", "Reset failed", "error");
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
                          <h5 className="text-primary">Password reset</h5>
                          <p></p>
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
                    { this.state.reset ?  <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={this.resetPassword}
                      >
                        <div className="form-group">
                          <p> Check your email for the reset code </p>
                        </div>
                        <div className="form-group">
                            <Input
                              name="email"
                              label="Email"
                              className="form-control"
                              placeholder="Enter email"
                              type="email"
                              required
                              disabled={true}
                              value={this.state.email}
                            />
                          </div>

                        <div className="form-group">
                          <Input
                            name="reset_code"
                            label="Reset Code"
                            className="form-control"
                            placeholder="Reset Code"
                            type="number"
                            required
                            value={this.state.reset_code}
                            onChange={evt => this.setState({reset_code: evt.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <Input
                            name="password"
                            label="Password"
                            className="form-control"
                            placeholder="New password"
                            type="password"
                            required
                            value={this.state.password}
                            onChange={evt => this.setState({password: evt.target.value})}
                          />
                        </div>

                        <div className="form-group">
                          <Input
                            name="confirm password"
                            label="Confirm Password"
                            className="form-control"
                            placeholder="Confirm Password"
                            type="password"
                            required
                            value={this.state.confirm_password}
                            onChange={evt => this.setState({confirm_password: evt.target.value})}
                          />
                        </div>

                        <Row className="form-group">
                          <Col className="text-right">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Reset
                            </button>
                          </Col>
                        </Row>
                      </AvForm> : <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={this.resetEmail}
                      >
                        <div className="form-group">
                          <Input
                            name="email"
                            label="Email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            required
                            value={this.state.email}
                            onChange={evt => this.setState({email: evt.target.value})}
                          />
                        </div>
                        <Row className="form-group">
                          <Col className="text-right">
                            <button
                              className="btn btn-primary w-md waves-effect waves-light"
                              type="submit"
                            >
                              Submit
                            </button>
                          </Col>
                        </Row>
                      </AvForm> }
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">
                  <p>
                    Go back to{" "}
                    <Link
                      to="login"
                      className="font-weight-medium text-primary"
                    >
                      Login
                    </Link>{" "}
                  </p>
                  <p>
                    © {new Date().getFullYear()} South Fitness
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

ForgetPasswordPage.propTypes = {
  forgetError: PropTypes.func,
  forgetSuccessMsg: PropTypes.func,
  history: PropTypes.object,
  userForgetPassword: PropTypes.any
}

const mapStateToProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword
  return { forgetError, forgetSuccessMsg }
}

export default withRouter(
  connect(mapStateToProps, { userForgetPassword })(ForgetPasswordPage)
)
