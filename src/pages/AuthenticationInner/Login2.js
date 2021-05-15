import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Col, Container, Form, FormGroup, Label, Row, Input } from "reactstrap"

// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import CarouselPage from "./CarouselPage"

export default class Login2 extends Component {
  render() {
    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0">
            <Row className="no-gutters">
              <CarouselPage />

              <Col xl={3}>
                <div className="auth-full-page-content p-md-5 p-4">
                  <div className="w-100">
                    <div className="d-flex flex-column h-100">
                      <div className="mb-4 mb-md-5">
                        <Link to="dashboard" className="d-block auth-logo">
                          <img
                            src={logodark}
                            alt=""
                            height="18"
                            className="auth-logo-dark"
                          />
                          <img
                            src={logolight}
                            alt=""
                            height="18"
                            className="auth-logo-light"
                          />
                        </Link>
                      </div>
                      <div className="my-auto">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to Skote.
                          </p>
                        </div>

                        <div className="mt-4">
                          <Form action="dashboard">
                            <FormGroup>
                              <Label for="username">Username</Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                              />
                            </FormGroup>

                            <FormGroup>
                              <div className="float-right">
                                <Link
                                  to="auth-recoverpw-2"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </Link>
                              </div>
                              <Label for="userpassword">Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                              />
                            </FormGroup>

                            <div className="custom-control custom-checkbox">
                              <Input
                                type="checkbox"
                                className="custom-control-input"
                                id="auth-remember-check"
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-3">
                              <button
                                className="btn btn-primary btn-block waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <h5 className="font-size-14 mb-3">
                                Sign in with
                              </h5>

                              <ul className="list-inline">
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-primary text-white border-primary"
                                  >
                                    <i className="mdi mdi-facebook"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-info text-white border-info"
                                  >
                                    <i className="mdi mdi-twitter"></i>
                                  </Link>
                                </li>
                                <li className="list-inline-item">
                                  <Link
                                    to="#"
                                    className="social-list-item bg-danger text-white border-danger"
                                  >
                                    <i className="mdi mdi-google"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </Form>
                          <div className="mt-5 text-center">
                            <p>
                              Don't have an account ?{" "}
                              <Link
                                to="page-register-2"
                                className="font-weight-medium text-primary"
                              >
                                {" "}
                                Signup now{" "}
                              </Link>{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mt-md-5 text-center">
                        <p className="mb-0">
                          © {new Date().getFullYear()} Skote. Crafted with{" "}
                          <i className="mdi mdi-heart text-danger"></i> by
                          Themesbrand
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}
