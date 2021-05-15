import React, { Component } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import ReactApexChart from "react-apexcharts"

class TeamPerformance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [
        {
          name: "CEO OFFICE",
          data: [0,0,0,0,0],
        },
        {
          name: "TECHNOLOGY",
          data: [0,0,0,0,50],
        },
        {
          name: "SALES",
          data: [0,0,0,0,0],
        },
        {
          name: "FINANCE",
          data: [0,0,0,0,0],
        },
      ],
      options: {
        chart: {
          toolbar: "false",
          dropShadow: {
            enabled: !0,
            color: "#000",
            top: 18,
            left: 7,
            blur: 8,
            opacity: 0.2,
          },
        },
        dataLabels: {
          enabled: !1,
        },
        colors: ["#556ee6", "#4CA64C", "#FFA500", "#FF0000"],
        stroke: {
          curve: "smooth",
          width: 3,
        },
      },
    }
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="12">
          <Card>
            <CardBody>
              <div className="clearfix">
                <h4 className="card-title mb-4">Teams Performance</h4>
              </div>

              <Row>
                <Col lg="4">
                  <div className="text-muted">
                    <div className="mb-4">
                      <p>This month</p>
                      <span className="badge badge-soft-success font-size-12 mr-1">
                        <h4>0%</h4>
                      </span>
                    </div>

                    <div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2">Last month</p>
                      <span className="badge badge-soft-danger font-size-12 mr-1">
                        <h4>0%</h4>
                      </span>
                    </div>
                  </div>
                </Col>
                <Col lg="8">
                  <div id="line-chart" className="apex-charts" dir="ltr">
                    <ReactApexChart
                      series={this.state.series}
                      options={this.state.options}
                      type="line"
                      height={320}
                    />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default TeamPerformance
