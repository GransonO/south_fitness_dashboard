import React, { Component } from "react"
import { Link } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap"

export default class TopVisitors extends Component {
  render() {
    return (
      <React.Fragment>
        <Col xl={4}>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="mr-2">
                  <h5 className="card-title mb-3">Top Uploads</h5>
                </div>
              </div>
              <Row className="text-center">
                <Col xs={6}>
                  <div className="mt-3">
                    <p className="text-muted mb-1">Today</p>
                    <h5>94</h5>
                  </div>
                </Col>

                <Col xs={6}>
                  <div className="mt-3">
                    <p className="text-muted mb-1">This Month</p>
                    <h5>
                      356{" "}
                      <span className="text-success font-size-13">
                        0.2 % <i className="mdi mdi-arrow-up ml-1"></i>
                      </span>
                    </h5>
                  </div>
                </Col>
              </Row>

              <hr />

              <div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="py-2">
                      <h5 className="font-size-14">
                        Rumba Dance <span className="float-right">78%</span>
                      </h5>
                      <div className="progress animated-progess progress-sm">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "78%" }}
                          aria-valuenow="78"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="py-2">
                      <h5 className="font-size-14">
                        Bendy yoga <span className="float-right">69%</span>
                      </h5>
                      <div className="progress animated-progess progress-sm">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "69%" }}
                          aria-valuenow="69"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="py-2">
                      <h5 className="font-size-14">
                        Stretchy Yoga <span className="float-right">61%</span>
                      </h5>
                      <div className="progress animated-progess progress-sm">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "61%" }}
                          aria-valuenow="61"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}
