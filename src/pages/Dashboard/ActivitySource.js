import React, { Component } from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

class ActivitySource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socials: [
        {
          title: "Motion",
          bgColor: "bg-primary",
          iconClass: "mdi-run-fast",
          description: "125",
        },
        {
          title: "Video",
          bgColor: "bg-info",
          iconClass: "mdi-message-video",
          description: "112",
        },
        {
          title: "Blogs",
          bgColor: "bg-pink",
          iconClass: "mdi-blogger",
          description: "104",
        },
      ],
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">Activities Break Down</CardTitle>
            <div className="text-center mb-4">
              <div className="avatar-sm mx-auto mb-4">
                <span className="avatar-title rounded-circle bg-soft-primary font-size-18">
                  <i className="mdi mdi-run-fast text-primary"/>
                </span>
              </div>
              <p className="font-16 text-muted mb-2"/>
              <h5>
                <Link to="#" className="text-dark">
                  Motion -{" "}
                  <span className="text-muted font-16">125 events</span>{" "}
                </Link>
              </h5>
              <p className="text-muted">
                This constitutes all activities performed on the platform. Movement activities rank highest among the current offers
              </p>
            </div>
            <Row className="mb-1">
              {this.state.socials.map((social, key) => (
                <Col xs="4" key={"_li_" + key}>
                  <div className="social-source text-center mt-3">
                    <div className="avatar-xs mx-auto mb-3">
                      <span
                        className={
                          "avatar-title rounded-circle " +
                          social.bgColor +
                          " font-size-16"
                        }
                      >
                        <i
  className={"mdi " + social.iconClass + " text-white"}
  />
                      </span>
                    </div>
                    <h5 className="font-size-15">{social.title}</h5>
                    <p className="text-muted mb-0">
                      {social.description} events
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default ActivitySource
