import React, { Component } from "react"
import PropTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap"
import { Link } from "react-router-dom"

//import Charts
import StackedColumnChart from "./StackedColumnChart"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyPerformance from "./MonthlyPerformance"
import ActivitySource from "./ActivitySource"
import ActivityComp from "./ActivityComp"
import TopTrainers from "./TopTrainers"
import InstitutionList from "./InstitutionList"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"
import Comments from "./Comments";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      modal: false,
    }
    this.togglemodal.bind(this)
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  };

  getAllMembers = async() => {

       fetch("https://southfitness.epitomesoftware.live/profiles/all/", {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            reports: [
                ...this.state.reports,
               { title: "Trainers", iconClass: "bx-copy-alt", description: response.filter((item) => item.user_type === "TRAINER").length },
               {
                title: "Total Members",
                iconClass: "bx-purchase-tag-alt",
                description: response.filter((item) => item.user_type !== "TRAINER").length,
              },
            ]
          })
        })
        .catch((error) => {
          console.log("----------- ", error)
          // Code for handling the error
        });
  };


   getInstitutions = async() => {
       fetch("https://southfitness.epitomesoftware.live/institution/all/", {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            reports: [
                ...this.state.reports,
                {
                title: "Institutions",
                iconClass: "bx-archive-in",
                description: response.length,
              }
            ],
          })
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  componentDidMount() {
    this.getInstitutions();
    this.getAllMembers();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title={this.props.t("Admin")}
              breadcrumbItem={this.props.t("Dashboard")}
            />

            <Row>
              <Col xl="4">
                <WelcomeComp name={"South-Fitness"}/>
                {/*<MonthlyPerformance />*/}
              </Col>
              <Col xl="8">
                <Row>
                  {/* Reports Render */}
                  {this.state.reports.map((report, key) => (
                    <Col md="4" key={"_col_" + key}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <Media>
                            <Media body>
                              <p className="text-muted font-weight-medium">
                                {report.title}
                              </p>
                              <h4 className="mb-0">{report.description}</h4>
                            </Media>
                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                              <span className="avatar-title">
                                <i
                                  className={
                                    "bx " + report.iconClass + " font-size-24"
                                  }
                                />
                              </span>
                            </div>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <Card>
                  <CardBody>
                    <CardTitle className="mb-4 float-sm-left">
                      Institutions Performance
                    </CardTitle>
                    <div className="clearfix"/>
                    <StackedColumnChart />
                  </CardBody>
                </Card>

            {/*<Row>*/}
              {/*<Col xl="4">*/}
                {/*<ActivitySource />*/}
              {/*</Col>*/}
              {/*<Comments />*/}
              {/*<Col xl="4">*/}
                {/*<TopTrainers />*/}
              {/*</Col>*/}
            {/*</Row>*/}

            <Row>
              <Col lg="12">
                <InstitutionList />
              </Col>
            </Row>
          </Container>
        </div>
        <Modal
          isOpen={this.state.modal}
          role="dialog"
          autoFocus={true}
          centered={true}
          className="exampleModal"
          tabindex="-1"
          toggle={this.togglemodal}
        >
          <div className="modal-content">
            <ModalHeader toggle={this.togglemodal}>Order Details</ModalHeader>
            <ModalBody>
              <p className="mb-2">
                Product id: <span className="text-primary">#SK2540</span>
              </p>
              <p className="mb-4">
                Billing Name:{" "}
                <span className="text-primary">Neal Matthews</span>
              </p>

              <div className="table-responsive">
                <Table className="table table-centered table-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage1} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Wireless Headphone (Black)
                          </h5>
                          <p className="text-muted mb-0">$ 225 x 1</p>
                        </div>
                      </td>
                      <td>$ 255</td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <div>
                          <img src={modalimage2} alt="" className="avatar-sm" />
                        </div>
                      </th>
                      <td>
                        <div>
                          <h5 className="text-truncate font-size-14">
                            Hoodie (Blue)
                          </h5>
                          <p className="text-muted mb-0">$ 145 x 1</p>
                        </div>
                      </td>
                      <td>$ 145</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Sub Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Shipping:</h6>
                      </td>
                      <td>Free</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <h6 className="m-0 text-right">Total:</h6>
                      </td>
                      <td>$ 400</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={this.togglemodal}
              >
                Close
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(Dashboard)
