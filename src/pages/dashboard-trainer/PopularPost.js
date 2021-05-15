import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"

// import images
import moment from "moment";

export default class PopularPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popularpost: this.props.blogs,
    }
  }
  render() {
    return (
      <React.Fragment>
        <Col xl={12}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="mr-2">
                  <h5 className="card-title mb-4">Post engagement levels</h5>
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-centered table-nowrap mb-0">
                  <tr>
                    <th scope="col" colSpan="2">
                      Post
                    </th>
                    <th scope="col">Comments</th>
                    <th scope="col">Action</th>
                  </tr>
                  <tbody>
                    {this.props.blogs.map((popularpost, key) => (
                      <tr key={key}>
                        <td style={{ width: "100px" }}>
                          <img
                            src={popularpost.image_url}
                            alt=""
                            className="avatar-md h-auto d-block rounded"
                          />
                        </td>
                        <td>
                          <h5 className="font-size-13 text-truncate mb-1">
                            <Link to="#" className="text-dark">
                              {popularpost.title}
                            </Link>
                          </h5>
                          <p className="text-muted mb-0">
                              {moment(popularpost.updatedAt).format("dddd, MMM Do YYYY, h:mm a")}
                          </p>
                        </td>
                        <td>
                          <i className="bx bx-comment-dots align-middle mr-1"></i>{" "}
                          {popularpost.comments.length}
                        </td>
                        <td>
                          <UncontrolledDropdown
                            className="dropdown"
                           
                          >
                            <DropdownToggle
                              className="text-muted font-size-16"
                              color="white"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-right"  direction="right">
                              <Link className="dropdown-item" to="#">
                                Action
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Another action
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Something else
                              </Link>
                              <div className="dropdown-divider"></div>
                              <Link className="dropdown-item" to="#">
                                Separated link
                              </Link>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}
