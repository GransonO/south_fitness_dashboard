import React, { Component } from "react"
import { Container, Row } from "reactstrap"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import CardUser from "./CardUser"
import Posts from "./Posts"
import Settings from "./Settings"
import Comments from "./Comments"
import TapVisitors from "./TopVisitors"
import Activity from "./Activity"
import PopularPost from "./PopularPost"

const series = [
  {
    name: "Blogs",
    data: [18, 21, 45, 36, 65, 47, 51, 32, 40, 28, 31, 26],
  },
  {
    name: "Videos",
    data: [30, 11, 22, 18, 32, 23, 58, 45, 30, 36, 15, 34],
  },
]

const options = {
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  colors: ["#556ee6", "#f1b44c"],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [20, 100, 100, 100],
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },

  markers: {
    size: 3,
    strokeWidth: 3,

    hover: {
      size: 4,
      sizeOffset: 2,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
}

export default class Trainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_count: 0,
      allBlogs: [],
      allComments: [],
      allVideos: [],
      cardreport: {
        options: options,
        series: series,
      },
    }
  }

  getAllBlogs = async() => {

       fetch("https://south-fitness.herokuapp.com/blog/trainer/" + localStorage.getItem("south_fitness_UID"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          let com = 0;
          let leCome = [];
              response.map((element) => {
                    com = element.comments.length + com;
                    leCome = leCome.concat(element.comments)
                 });
          this.setState({
            total_count: com,
            allBlogs: response,
            allComments: leCome
          })
        })
        .catch((error) => {

          // Code for handling the error
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

  componentDidMount() {
    this.getAllBlogs();
    this.getAllVideos();
  }


  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Dashboards" breadcrumbItem="Trainer" />
            <Row>
              {/* card user */}
              <CardUser posts={this.state.allBlogs} commentsCount={this.state.total_count} videosCount={this.state.allVideos.length} cardreport={this.state.cardreport}  name={localStorage.getItem("south_fitness_fullname")} trainer={localStorage.getItem("south_fitness_type")}/>
            </Row>
            <Row>
              <Posts videos={this.state.allVideos}/>
              <Comments allComments={this.state.allComments}/>
              <Activity videos={this.state.allVideos}/>
            </Row>
          </Container>
          <Row>
            <PopularPost blogs={this.state.allBlogs}/>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}
