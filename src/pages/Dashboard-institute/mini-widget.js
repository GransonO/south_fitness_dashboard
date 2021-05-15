import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Col, Card, CardBody } from "reactstrap"

class MiniWidget extends Component {
  render() {
    console.log("The reports are: -------------- ", this.props.reports);
    return (
      <React.Fragment>
        {this.props.reports.map((report, key) => (
          <Col sm="4" key={key}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-center mb-3">
                  <div className="avatar-xs mr-3">
                    <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-18">
                      <i className={report.icon}/>
                    </span>
                  </div>
                  <h5 className="font-size-14 mb-0">{report.title}</h5>
                </div>
                <div className="text-muted mt-4">
                  <h5>
                    {report.value}
                  </h5>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </React.Fragment>
    )
  }
}

MiniWidget.propTypes = {
  reports: PropTypes.array
}

export default MiniWidget
