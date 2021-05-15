import React, { Component } from "react"
import { Card, CardBody, Col, Row } from "reactstrap"
import ReactApexChart from "react-apexcharts"
import avatar from "../../assets/images/users/avatar-1.jpg";

export default class CardUser extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <Col xl={12}>
          <Row>
            <Col lg={3}>
              <Card>
                <CardBody>
                  <div className="media">
                    <div className="mr-3">
                      <img
                        src={localStorage.getItem("south_fitness_image")}
                        alt=""
                        className="avatar-sm rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="media-body">
                      <div className="media">
                        <div className="media-body">
                          <div className="text-muted">
                            <h5 className="mb-1">{this.props.name}</h5>
                            <p className="mb-0">{this.props.trainer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className="mini-stats-wid">
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="mr-3">
                      <p className="text-muted mb-2">Blog Post</p>
                      <h5 className="mb-0">{this.props.posts.length}</h5>
                    </div>

                    <div className="avatar-sm ml-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="bx bxs-book-bookmark"></i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className="blog-stats-wid">
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="mr-3">
                      <p className="text-muted mb-2">Videos</p>
                      <h5 className="mb-0">{this.props.videosCount}</h5>
                    </div>

                    <div className="avatar-sm ml-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="bx bxs-note"></i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <Card className="blog-stats-wid">
                <CardBody>
                  <div className="d-flex flex-wrap">
                    <div className="mr-3">
                      <p className="text-muted mb-2">Comments</p>
                      <h5 className="mb-0">{this.props.commentsCount}</h5>
                    </div>

                    <div className="avatar-sm ml-auto">
                      <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                        <i className="bx bxs-message-square-dots"></i>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Card>
            <CardBody>
              <div className="d-flex flex-wrap">
                <h5 className="card-title mr-2">Engagement</h5>
              </div>

              <Row className="text-center">
                <Col lg={4}>
                  <div className="mt-4">
                    <p className="text-muted mb-1">Today</p>
                    <h5>74</h5>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mt-4">
                    <p className="text-muted mb-1">This Month</p>
                    <h5>
                      356{" "}
                      <span className="text-success font-size-13">
                        0.2 % <i className="mdi mdi-arrow-up ml-1"></i>
                      </span>
                    </h5>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mt-4">
                    <p className="text-muted mb-1">This Year</p>
                    <h5>
                      2354{" "}
                      <span className="text-success font-size-13">
                        0.1 % <i className="mdi mdi-arrow-up ml-1"></i>
                      </span>
                    </h5>
                  </div>
                </Col>
              </Row>

              <hr className="mb-4" />
              <div className="apex-charts" id="area-chart" dir="ltr">
                <ReactApexChart
                  options={this.props.cardreport.options}
                  series={this.props.cardreport.series}
                  type="area"
                  height={350}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}
