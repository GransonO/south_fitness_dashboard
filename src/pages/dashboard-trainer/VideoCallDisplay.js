import React, { Component } from "react"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
} from "reactstrap"
import AgoraVideoCall from "./agora";
import SimpleBar from "simplebar-react";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios";
import swal from "sweetalert";

class VideoCallDisplay extends Component {
  constructor(props) {
    super(props);
    this.videoProfile = "480p_4";
    this.transcode = "interop";
    this.attendeeMode = "video";
    this.baseMode = "avc";
    const urlParams = new URLSearchParams(window.location.search);
    this.videoChannel = urlParams.get("channel");
    this.state = {
        channel: "",
        video_id: "",
        appId: "",
        token: "",
        hasVideo: false,
        uid: null
    }
  }

  startVideo = async (e) => {
    e.preventDefault();
    if(localStorage.getItem('south_fitness_type') !== "TRAINER"){
        swal("Hey 🤣", "Only the trainer can start the video call", "info");
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    let xUID = Math.floor(Math.random() * 1000000) + 1000;

    let objectVideo = {
        channel_name: urlParams.get("channel"),
        username: xUID, // localStorage.getItem("south_fitness_fullname"),
        video_id: urlParams.get("video_id")
      };
      await axios.post("https://south-fitness.herokuapp.com/videos/access_token/", objectVideo, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response);
          const urlParams = new URLSearchParams(window.location.search);
          this.setState({
              channel: urlParams.get("channel"),
              token: response.data.token,
              appId: response.data.appID,
              uid: xUID,
              hasVideo: true,
          })
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data.value);
             swal("Error!", "Could not start Video Call", "error");
           }
       );
  }

    render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Videos" breadcrumbItem="Add Video" />
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody>
                    <CardTitle>Basic Information</CardTitle>
                    <CardSubtitle className="mb-3">
                      Fill all information below
                    </CardSubtitle>
                     <SimpleBar style={{ minHeight: "350px" }}>
                         {this.state.hasVideo ? (
                             <AgoraVideoCall
                               videoProfile={this.videoProfile}
                                channel={this.state.channel}
                                transcode={this.transcode}
                                attendeeMode={this.attendeeMode}
                                baseMode={this.baseMode}
                                appId={this.state.appId}
                                token={this.state.token}
                                uid={this.state.uid}
                              />
                         ) : <h2>{"Joining the " }<strong>{this.videoChannel.replaceAll("_", " ")}</strong>{ " channel"}</h2>}
                      </SimpleBar>
                  </CardBody>
                </Card>

                <Form>
                  {this.state.hasVideo ? "" : (
                        <Button
                            type="button"
                            color="primary"
                            className="mr-1 waves-effect waves-light"
                            onClick={e => this.startVideo(e)}
                          >
                            Start Video call
                          </Button>
                    )}
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default VideoCallDisplay;