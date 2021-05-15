import React, { Component } from "react"

import {
  Card,
  CardBody,
  Col,
} from "reactstrap"

//SimpleBar
import SimpleBar from "simplebar-react"
import moment from "moment";

class Activity extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Col xl={4}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="mr-2">
                  <h5 className="card-title mb-4">Scheduled Activities</h5>
                </div>
              </div>
              <SimpleBar style={{ maxHeight: "280px" }}>
                <div className="mt-2">
                  <ul className="verti-timeline list-unstyled">
                    {this.props.videos.length > 0 ? this.props.videos.map(item => ( <li className={this.props.videos.indexOf(item) === 0 ? "event-list active" : "event-list"}>
                      <div className="event-timeline-dot">
                        <i className="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                      </div>
                      <div className="media">
                        <div className="mr-1">
                          <h5 className="font-size-11">
                             {moment(item.scheduledDate + " "+ item.scheduledTime).format("MMMM Do, h:mm a") + " "}
                            <i className="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i>
                          </h5>
                        </div>
                        <div className="media-body">
                          <div>
                            <a href={"/video-call?video_id=" + item.video_id + "&channel=" + item.title.replaceAll(" ", "_")}>
                              <span className="font-weight-semibold">
                                {item.title}
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </li> )) : <div className="text-center mt-4">
                <div
                  className="btn btn-primary waves-effect waves-light btn-sm"
                >
                  No Scheduled Activity
                </div>
              </div>}
                  </ul>
                </div>
              </SimpleBar>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default Activity;
