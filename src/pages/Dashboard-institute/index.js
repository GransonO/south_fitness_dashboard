import React, { Component } from "react"
import { Container, Row, Col } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Components
import CardUser from "./card-user"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
import TeamPerformance from "./teamPerformance"
import TeamsAnalytics from "./teams-analytics"
import ActiveActivities from "./active-activities"
import Tasks from "./tasks"
import ChatBox from "./chat-box"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reports: [
        {
          icon: "bx bx-copy-alt",
          title: "Orders",
          value: "1,452",
          badgeValue: "+ 0.2%",
          color: "success",
          desc: "From previous period",
        },
        {
          icon: "bx bx-archive-in",
          title: "Revenue",
          value: "$ 28,452",
          badgeValue: "+ 0.2%",
          color: "success",
          desc: "From previous period",
        },
        {
          icon: "bx bx-purchase-tag-alt",
          title: "Average Price",
          value: "$ 16.2",
          badgeValue: "0%",
          color: "warning",
          desc: "From previous period",
        },
      ],
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Saas" />

            {/* Card User */}
            <CardUser />

            <Row>
              {/* welcome card */}
              <CardWelcome />

              <Col xl="8">
                <Row>
                  {/*mimi widgets */}
                  <MiniWidget reports={this.state.reports} />
                </Row>
              </Col>
            </Row>

            <Row>
              {/* earning */}
              <TeamPerformance />

              {/* sales anytics */}
              <TeamsAnalytics />
            </Row>

            <Row>
              {/* total selling product */}
              <ActiveActivities />

              {/* tasks */}
              <Tasks />

              {/* chat box */}
              <ChatBox />
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard