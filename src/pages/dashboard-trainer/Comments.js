import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

//SimpleBar
import SimpleBar from "simplebar-react"
import moment from "moment";
import Loader from "react-loader-spinner";

export default class Comments extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <React.Fragment>
        <Col xl={4} lg={6}>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="mr-2">
                  <h5 className="card-title mb-3">Members Comments</h5>
                </div>
              </div>
              <SimpleBar style={{ maxHeight: "310px" }}>
                <div>
                  <ul className="list-group list-group-flush">
                    {this.props.allComments.length > 0 ? this.props.allComments.map((element, key) => ( <li key={key} className="list-group-item py-3">
                            <div className="media">
                              <div className="avatar-xs mr-3">
                                <img
                                  src={element.profile_image}
                                  alt=""
                                  className="img-fluid d-block rounded-circle"
                                />
                              </div>
                              <div className="media-body">
                                <h5 className="font-size-14 mb-1">
                                  {element.username}
                                  <small className="text-muted float-right">
                                    {moment(element.createdAt).format("DD-MM-YY hh:mm")}
                                  </small>
                                </h5>
                                <p className="text-muted">
                                  {element.body}
                                </p>
                                <div>
                                  <Link to="#" className="text-success">
                                    <i className="mdi mdi-reply"></i> Reply
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </li> )) : (
                       <div className="text-center mt-4">
                        <Loader
                          type="ThreeDots"
                          color="#00BFFF"
                          height={20}
                          width={100}
                          timeout={5000} // 5 secs
                        />
                    </div>
                    )
                    }
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
