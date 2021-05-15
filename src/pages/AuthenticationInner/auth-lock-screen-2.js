import React, { Component } from "react"
import CarouselPage from "./CarouselPage"
// import images
import logodark from "../../assets/images/logo-dark.png"
import logolight from "../../assets/images/logo-light.png"
import user from "../../assets/images/users/avatar-1.jpg"
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { Link } from "react-router-dom"

export default class LockScreen2 extends Component {
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
                        <Link to="dashboard"
                         className="d-block auth-logo">
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
                          <h5 className="text-primary">Lock screen</h5>
                          <p className="text-muted">
                            Enter your password to unlock the screen!
                          </p>
                        </div>

                        <div className="mt-4">
                          <Form className="form-horizontal" action="dashboard">
                            <div className="user-thumb text-center mb-4">
                              <img
                                src={user}
                                className="rounded-circle img-thumbnail avatar-md"
                                alt="thumbnail"
                              />
                              <h5 className="font-size-15 mt-3">Maria Laird</h5>
                            </div>

                            <FormGroup>
                              <Label for="userpassword">Password</Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="userpassword"
                                placeholder="Enter password"
                              />
                            </FormGroup>

                            <FormGroup className="row mb-0">
                              <Col xs={12} className="text-right">
                                <button
                                  className="btn btn-primary w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  Unlock
                                </button>
                              </Col>
                            </FormGroup>
                          </Form>
                          <div className="mt-5 text-center">
                            <p>
                              Not you ? return{" "}
                              <Link
                                to="page-login-2"
                                className="font-weight-medium text-primary"
                              >
                                {" "}
                                Sign In{" "}
                              </Link>{" "}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mt-md-5 text-center">
                        <p className="mb-0">
                          ©{" "}
                          {new Date().getFullYear()}{" "}
                          Skote. Crafted with{" "}
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
