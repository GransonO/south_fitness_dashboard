import React, { Component } from "react"
import {Container, Row, Col, FormGroup, Button, Spinner} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import TeamPerformance from "./teamPerformance"
// import TeamsAnalytics from "./teams-analytics"
import ActiveActivities from "./active-activities"
// import Tasks from "./tasks"
import ChatBox from "./chat-box"
import UpcomingActivity from "./upcomingActivities";
import MembersList from "./membersList";

class Institute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allGroups: [],
      allMembers: [],
      reports: [],
      allVideos: [],
      institutions: [],
      institute_id: localStorage.getItem("south_fitness_institution_id"),
    }
  }

   getInstitutions = async() => {
       fetch("https://southfitness.epitomesoftware.live/institution/all/", {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          this.setState({
          institutions: response,
          })
        })
        .catch((error) => {
          // Code for handling the error
        });
  };

  componentDidMount = async () =>  {
    this.instituteChange(localStorage.getItem("south_fitness_institution_id"),);
  }

  getChatGroups = async () => {
       return fetch("https://southfitness.epitomesoftware.live/chats/groups/all/" + this.state.institute_id, {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------getChatGroups-----------------", response);
          this.setState({
            allGroups: response
          });
          return response.length;
        })
        .catch((error) => {

          // Code for handling the error
          return 0;
        });

  };

  getInstitutionMembers = async () => {
      return fetch("https://southfitness.epitomesoftware.live/profiles/institution/" + this.state.institute_id, {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log("This -------------------------->", response);
          this.setState({
            allMembers: response
          });
          return response.length;
        })
        .catch((error) => {

          // Code for handling the error
          return 0;
        });

  };

  getAllVideos = async() => {

       fetch("https://southfitness.epitomesoftware.live/videos/trainer/" + localStorage.getItem("south_fitness_UID"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          this.setState({
            allVideos: response
          })
        })
        .catch((error) => {
          // Code for handling the error
        });
  };

  instituteChange = async (value) =>{
      this.setState({
          institute_id: value
      });
      let groupCount = await this.getChatGroups();
      let membersCount = await this.getInstitutionMembers();
      console.log("membersCount===== ", membersCount);
      this.getAllVideos();
      this.getInstitutions();
      this.setState({
        reports: [
        {
          icon: "bx bx-copy-alt",
          title: "Members",
          value: membersCount,
        },
        {
          icon: "bx bx-archive-in",
          title: "Groups",
          value: groupCount,
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "General Performance",
          value: "0 %",
        },
      ],
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Institute" />

            {/* Card User */}
              {
                  localStorage.getItem("south_fitness_type") === "OVERVIEWER" ?
                      <Col md="6">
                          <Row>
                              <Col md="6">
                              <FormGroup>
                                <select className="custom-select custom-select-sm form-control" onChange={e => this.instituteChange(e.target.value)}>
                                  <option value="">Select Institution</option>
                                  {this.state.institutions.map(item => (
                                        <option key={item.id} value={item.institute_id}>{item.institute_name}</option>
                                    ))}
                                  </select>
                              </FormGroup>
                              </Col>
                           </Row>
                       </Col> : ""
              }

            <Row>
              {/* welcome card */}
              <CardWelcome name={localStorage.getItem("south_fitness_institution")}/>

              <Col xl="8">
                <Row>
                  {/*mimi widgets */}
                  <MiniWidget reports={this.state.reports} />
                </Row>
              </Col>
            </Row>

            {/*<Row>*/}
              {/*<TeamPerformance />*/}
            {/*</Row>*/}

            {/* chat box */}
            <ChatBox groups={this.state.allGroups}/>

            <Row>
              {/* total selling product */}
              <ActiveActivities />

              {/* tasks */}
              <UpcomingActivity videos={this.state.allVideos}/>
            </Row>

            <Row>
              <Col xl="12">
                <MembersList members={this.state.allMembers}  level={"standard"}/>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Institute
