import React, { Component } from "react"
import PropTypes from 'prop-types'

import {Alert, Card, CardBody, Col, Container, Row, Spinner} from "reactstrap"

// Redux
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// actions
import { apiError } from "../../store/actions"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"
import swal from "sweetalert";

class Login extends Component {
  constructor(props) {
    super(props)
     this.state = {
      email: null,
      password: null,
      login: false
    }
  }

  componentDidMount() {
    this.props.apiError("")
  }

  loginTheUser = async() => {
        if(this.state.email === null ||this.state.password === null  ){
            swal("Wait!", "Please fill all the details first", "info");
            return
        }

        this.setState({
          login: true
        });
         fetch('https://southfitness.epitomesoftware.live/auth/login', {
           method: "POST",
           headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "email": this.state.email,
              "password": this.state.password
          }
          )
          })
          .then(response => response.json())
          .then(response => {
            this.setState({
              login: false
            });
            if(response.status === "success"){
              swal("Success!", "Login success", "success");
              localStorage.setItem('south_fitness_token', response.access_token);
              localStorage.setItem('south_fitness_email', response.profile.email);
              localStorage.setItem('south_fitness_image', response.profile.image);
              localStorage.setItem('south_fitness_type', response.profile.user_type);
              localStorage.setItem('south_fitness_institution', response.profile.institution);
              localStorage.setItem('south_fitness_fullname', response.profile.fullname);
              localStorage.setItem('south_fitness_UID', response.profile.user_id);
              localStorage.setItem('authUser', JSON.stringify(response.profile));
              switch (response.profile.user_type) {
                  case "OVERVIEWER":
                      window.location.href ="/dashboard";
                      break;
                  case "ADMIN":
                      window.location.href ="/admin";
                      break;
                  case "TRAINER":
                      window.location.href ="/trainer";
                      break;
              }// Address to hosted dashboard
            }else{
                swal("Fail!", "Login failed", "error");
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
                          <h5 className="text-primary">Welcome</h5>
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

                        <div className="form-group">
                          <AvField
                            name="password"
                            label="Password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={evt => this.setState({password: evt.target.value})}
                          />
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            onClick = { e => this.loginTheUser()}
                          >
                            Log In
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted">
                            <i className="mdi mdi-lock mr-1" /> Forgot your
                            password?
                          </Link>
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

Login.propTypes = {
  apiError: PropTypes.any,
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
  socialLogin: PropTypes.func
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, {apiError })(Login)
)
