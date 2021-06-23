import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"
import classnames from "classnames"
import img1 from "../../assets/images/small/img-6.jpg"
import img2 from "../../assets/images/small/img-2.jpg"
import img3 from "../../assets/images/small/img-1.jpg"

//SimpleBar
import SimpleBar from "simplebar-react"
import moment from "moment";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Posts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "1",
      dropdownOpen: false,
      displayLoader: true
    }
    this.toggleTab = this.toggleTab.bind(this)
    this.toggledropdown = this.toggledropdown.bind(this)
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
    }
  }
  toggledropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }
  componentDidMount() {
    if(this.props.videos === []){
      this.setState({
        displayLoader: true
      })
    }else{
      this.setState({
        displayLoader: true
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Col xl={4} lg={6}>
          <Card>
            <CardHeader className="bg-transparent border-bottom">
              <div className="d-flex flex-wrap">
                <div className="mr-2">
                    <h5 className="card-title mt-1 mb-0">Your Videos</h5>
                </div>
              </div>
            </CardHeader>

            <CardBody>
              <SimpleBar style={{ maxHeight: "295px" }}>
                <div>
                  <TabContent activeTab={this.state.activeTab}>
                      <TabPane className="show" tabId="1">
                        {this.props.videos.length < 0 ? (<div className="text-center mt-4">
                            <Loader
                              type="ThreeDots"
                              color="#00BFFF"
                              height={20}
                              width={100}
                              timeout={5000} // 5 secs
                            />
                          </div>) : ""}
                        <ul className="list-group list-group-flush">
                            {
                            this.props.videos.length > 0 ? this.props.videos.map((post, key) => (<li className="list-group-item py-3" key={key}>
                            <div className="d-flex">
                              <div className="mr-3">
                                <img
                                  src={post.image_url}
                                  alt=""
                                  className="avatar-md h-auto d-block rounded"
                                />
                              </div>

                              <div className="align-self-center overflow-hidden mr-auto">
                                <div>
                                  <h5 className="font-size-14 text-truncate">
                                    <Link to={"/video-call?video_id=" + post.video_id + "&channel=" + post.title.replaceAll(" ", "_")} className="text-dark">
                                      {post.title}
                                    </Link>
                                  </h5>
                                  <p className="text-muted mb-0">
                                     {moment(post.updatedAt).format("dddd, MMM Do YYYY, h:mm a")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>)) : (
                              <div className="text-center mt-4">
                                <Link to="/video-upload"
                                  className="btn btn-primary waves-effect waves-light btn-sm"
                                >
                                  Upload a Video <i className="mdi mdi-arrow-right ml-1"></i>
                                </Link>
                              </div>
                                )
                            }
                        </ul>
                      </TabPane>
                  </TabContent>
                </div>
              </SimpleBar>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}
