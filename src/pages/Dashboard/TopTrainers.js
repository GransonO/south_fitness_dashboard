import React, { Component } from "react"
import { Card, CardBody, CardTitle, Progress } from "reactstrap"

class TopTrainers extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Top Trainers</CardTitle>
            <div className="text-center">
              <div className="mb-4">
                <i className="mdi mdi-swim text-primary display-4"/>
              </div>
              <h3>105</h3>
              <p>Granson O</p>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-centered table-nowrap mb-2">
                <tbody>
                  <tr>
                    <td style={{ width: "30%" }}>
                      <p className="mb-0">Granson O</p>
                    </td>
                    <td style={{ width: "25%" }}>
                      <h5 className="mb-0">105</h5>
                    </td>
                    <td>
                      <Progress
                        value="94"
                        color="primary"
                        className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Man Mobutu</p>
                    </td>
                    <td>
                      <h5 className="mb-0">75</h5>
                    </td>
                    <td>
                      <Progress
                        value="82"
                        color="success"
                        className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className="mb-0">Juma Jua</p>
                    </td>
                    <td>
                      <h5 className="mb-0">57</h5>
                    </td>
                    <td>
                      <Progress
                        value="70"
                        color="warning"
                        className="bg-transparent"
                        size="sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default TopTrainers
