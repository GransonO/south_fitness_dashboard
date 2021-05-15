import React, { Component } from "react"
import { Col, Card, CardBody, Table } from "reactstrap"
import ReactApexChart from "react-apexcharts"

class ActiveActivities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      series1: [0],
      series2: [0],
      series3: [0],
      radialoptions1: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#556ee6"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "0%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions2: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#34c38f"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "0%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
      radialoptions3: {
        chart: { sparkline: { enabled: !0 } },
        dataLabels: { enabled: !1 },
        colors: ["#f46a6a"],
        plotOptions: {
          radialBar: {
            hollow: { margin: 0, size: "0%" },
            track: { margin: 0 },
            dataLabels: { show: !1 },
          },
        },
      },
    }
  }

  render() {
    return (
      <React.Fragment>
        <Col xl="6">
          <Card>
            <CardBody>
              <div className="clearfix">
                <h4 className="card-title mb-4">Activity Performance</h4>
              </div>

              <div className="text-muted text-center">
                <p className="mb-2">Aggregated</p>
                <h4>0%</h4>
              </div>
              <div className="table-responsive mt-4">
                <Table className="table-centered mb-0">
                  <tbody>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Movement</h5>
                        <p className="text-muted mb-0">Running, walking & Cycling</p>
                      </td>

                      <td>
                        <div id="radialchart-1" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions1}
                            series={this.state.series1}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <h5 className="mb-0">0 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Video Calls</h5>
                        <p className="text-muted mb-0">Yoga, Aerobics & Dance</p>
                      </td>

                      <td>
                        <div id="radialchart-2" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions2}
                            series={this.state.series2}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <h5 className="mb-0">0 %</h5>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5 className="font-size-14 mb-1">Blogs</h5>
                        <p className="text-muted mb-0">Actively reading and participation</p>
                      </td>

                      <td>
                        <div id="radialchart-3" className="apex-charts">
                          <ReactApexChart
                            options={this.state.radialoptions3}
                            series={this.state.series3}
                            type="radialBar"
                            height={60}
                            width={60}
                          />
                        </div>
                      </td>
                      <td>
                        <h5 className="mb-0">0 %</h5>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default ActiveActivities
