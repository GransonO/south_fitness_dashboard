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
    Table, FormGroup, Spinner,
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
import MembersList from "../Dashboard-institute/membersList";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [],
      modal: false,
      totalMembers: [],
      totalTrainers: [],
    }
    this.togglemodal.bind(this)
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  };

  getAllMembers = async () => {

       fetch("https://southfitness.epitomesoftware.live/profiles/all/", {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            totalMembers: response,
            totalTrainers: response.filter((item) => item.user_type === "TRAINER"),
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
          console.log(response);
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
                <WelcomeComp name={"South Fitness"}/>
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

            {/*<Card>*/}
                  {/*<CardBody>*/}
                    {/*<CardTitle className="mb-4 float-sm-left">*/}
                      {/*Institutions Performance*/}
                    {/*</CardTitle>*/}
                    {/*<div className="clearfix"/>*/}
                    {/*<StackedColumnChart />*/}
                  {/*</CardBody>*/}
                {/*</Card>*/}

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
                <InstitutionList totalMembers={this.state.totalMembers}/>
              </Col>
            </Row>


            <Row>
              <Col xl="12">
                <MembersList members={this.state.totalTrainers} level={"main"}/>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  t: PropTypes.any
}

export default withTranslation()(Dashboard)
