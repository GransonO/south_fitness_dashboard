import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

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
    }
  }


  //https://south-fitness.herokuapp.com/chats/groups/all/SOUTH_FITNESS
  componentDidMount = async () =>  {
      let groupCount = await this.getChatGroups();
      let membersCount = await this.getInstitutionMembers();
      console.log("membersCount===== ", membersCount);
      this.getAllVideos();
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
          value: "66.2 %",
        },
      ],
      })
  }

  getChatGroups = async () => {
       return fetch("https://south-fitness.herokuapp.com/chats/groups/all/" + localStorage.getItem("south_fitness_institution"), {
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
      return fetch("https://south-fitness.herokuapp.com/profiles/institution/" + localStorage.getItem("south_fitness_institution"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
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

       fetch("https://south-fitness.herokuapp.com/videos/trainer/" + localStorage.getItem("south_fitness_UID"), {
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

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Institute" />

            {/* Card User */}
            <CardUser name={localStorage.getItem("south_fitness_fullname")} institute={localStorage.getItem("south_fitness_institution")}/>

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

            <Row>
              <TeamPerformance />
            </Row>

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
                <MembersList members={this.state.allMembers}/>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Institute
