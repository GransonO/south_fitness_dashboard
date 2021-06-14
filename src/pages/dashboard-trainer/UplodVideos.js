import React, { Component } from "react"
import { Link } from "react-router-dom"
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row, Spinner,
} from "reactstrap"
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import * as moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import Loader from "react-loader-spinner";

class UploadVideos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageFiles: [],
      selectedVideoFiles: [],
      videoUploading: false,
      videoImageUrl:'',
      videoUrl:'',
      title:'',
      instructor:'',
      description: '',
      type: '',
      duration: 0,
      scheduled: '',
      scheduledTime: '',
      scheduledDate: '',
      rewards: 0,
      imageUploading: false,
    }
  }

  imageUpload = async (files) => {
    this.setState({
          imageUploading: true
      });
    files.map( async (file) => {
      let data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "South_Fitness_video_imgs");
      data.append("cloud_name", "dolwj4vkq");

        await axios.post("https://api.cloudinary.com/v1_1/dolwj4vkq/image/upload", data, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            console.log("================================== ", response.data);
            console.log("================================== ", "Image Uploaded");
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              formattedSize: this.formatBytes(file.size),
            });

            this.setState({ imageUploading: false, selectedImageFiles: files, videoImageUrl: response.data.secure_url})
          });
        }
    );
  }

  videoUpload = async (files) => {
    files.map( async (file) => {
      let data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "South_Fitness_videos");
      data.append("cloud_name", "dolwj4vkq");
      this.setState({ videoUploading: true });

        await axios.post("https://api.cloudinary.com/v1_1/dolwj4vkq/video/upload", data, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(response => {
            console.log("================================== ", response.data);
            console.log("================================== ", "Video Uploaded");
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              formattedSize: this.formatBytes(file.size),
            });

            this.setState({ selectedVideoFiles: files, videoUrl: response.data.secure_url, videoUploading: false})
          });
        }
    );
  }

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  postVideo = async (e) => {
    e.preventDefault();
    let objectVideo = {
          uploaded_by: localStorage.getItem("south_fitness_fullname"),
          uploader_id:localStorage.getItem("south_fitness_UID"),
          instructor: this.state.instructor,
          title: this.state.title,
          details: this.state.description,
          video_url: this.state.videoUrl,
          type: this.state.type,
          image_url: this.state.videoImageUrl,
          duration: this.state.duration,
          isScheduled: this.state.scheduled === "True",
          scheduledTime: this.state.scheduledTime,
          scheduledDate: this.state.scheduledDate
      };
      await axios.post("https://south-fitness.herokuapp.com/videos/", objectVideo, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response.data);
          swal("Success!", "Video Posted Success", "success")
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data);
             swal("Error!", "Video Posted error", "error");
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

                    <Form>
                      <Row>
                        <Col sm="6">
                          <FormGroup>
                            <Label htmlFor="productname">Video Title</Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
                              className="form-control"
                              value={this.state.title}
                              onChange={e => this.setState({title: e.target.value}) }
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="manufacturername">
                              Video Instructor
                            </Label>
                            <Input
                              id="manufacturername"
                              name="manufacturername"
                              type="text"
                              className="form-control"
                              value={this.state.instructor}
                              onChange={e => this.setState({instructor: e.target.value}) }
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="manufacturerbrand">
                              Uploader Name
                            </Label>
                            <Input
                              id="manufacturerbrand"
                              name="manufacturerbrand"
                              type="text"
                              disabled={true}
                              value={localStorage.getItem("south_fitness_fullname")}
                              className="form-control"
                            />
                          </FormGroup>
                          <FormGroup>
                              <Row>
                                  <Col sm="6">
                                    <Label htmlFor="price">Duration(in minutes)</Label>
                                    <Input
                                  id="price"
                                  name="price"
                                  type="number"
                                  className="form-control"
                                  value={this.state.duration}
                                  onChange={e => this.setState({duration: e.target.value}) }
                                />
                                  </Col>
                                  <Col sm="6">
                                    <Label htmlFor="price">Rewards(Points per view)</Label>
                                    <Input
                                  id="price"
                                  name="price"
                                  type="number"
                                  className="form-control"
                                  value={this.state.rewards}
                                  onChange={e => this.setState({rewards: e.target.value}) }
                                />
                                  </Col>
                              </Row>
                          </FormGroup>
                        </Col>
                        <Col sm="6">
                          <Row>
                            <Col sm="6">
                              <FormGroup>
                                <Label className="control-label">Video Category</Label>
                                <select
                                    className="form-control select2"
                                    onChange={e => this.setState({type: e.target.value}) }
                                >
                                  <option>Select</option>
                                  <option value="yoga" >Yoga</option>
                                  <option value="dance">Dance</option>
                                  <option value="rumba">Rumba</option>
                                </select>
                              </FormGroup>
                            </Col>

                            <Col sm="6">
                              <FormGroup>
                                <Label className="control-label">Is Scheduled</Label>
                                <select
                                    className="form-control select2"
                                    onChange={e => this.setState({scheduled: e.target.value}) }
                                >
                                  <option>Select</option>
                                  <option value="True" >Is scheduled</option>
                                  <option value="False">Is Not Scheduled</option>
                                </select>
                              </FormGroup>
                            </Col>
                          </Row>

                           {this.state.scheduled === "True" ?
                               <Row>
                                  <Col sm="6">
                                    <FormGroup className="select2-container">
                                    <Label className="control-label">Date</Label>
                                       <input
                                          className="form-control"
                                          type="date"
                                          value={this.state.scheduledDate}
                                          onChange={e => this.setState({scheduledDate: e.target.value}) }
                                          defaultValue={moment()}
                                          id="example-date-input"
                                        />
                                    </FormGroup>
                                  </Col>
                                  <Col sm="6">
                                  <FormGroup className="select2-container">
                                    <Label className="control-label">Time</Label>
                                    <input
                                      className="form-control"
                                      type="time"
                                      value={this.state.scheduledTime}
                                      onChange={e => this.setState({scheduledTime: e.target.value}) }
                                      defaultValue="13:45:00"
                                      id="example-time-input"
                                    />
                                  </FormGroup>
                                </Col>
                                </Row>
                               : ""}

                          <FormGroup>
                            <Label htmlFor="productdesc">
                              Video Description
                            </Label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="5"
                              value={this.state.description}
                              onChange={e => this.setState({description: e.target.value}) }
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

                <Row>
                  <Col sm="6">
                   <Card>
                    <CardBody>
                      <CardTitle className="mb-3">Video Image</CardTitle>
                      <Form>
                      <Dropzone
                        accept={"image/*"}
                        onDrop={acceptedFiles =>
                          this.imageUpload(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="dz-message needsclick">
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Drop or click to upload an image.</h4>
                              </div>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {this.state.selectedImageFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>
                        <br/>
                        {this.state.imageUploading ? <Spinner animation="grow" /> : ""}
                    </Form>
                     </CardBody>
                  </Card>
                  </Col>
                  <Col sm="6">
                       <Card>
                        <CardBody>
                          <CardTitle className="mb-3">Introduction Video</CardTitle>
                              <Form>
                            <Dropzone
                              accept={"video/*"}
                              onDrop={acceptedFiles =>
                                this.videoUpload(acceptedFiles)
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone">
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="dz-message needsclick">
                                      <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                                      </div>
                                      <h4>Drop or click to upload video.</h4>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <br/>
                            {this.state.videoUploading ? <Spinner animation="grow" /> : ""}
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {this.state.selectedVideoFiles.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                )
                              })}
                            </div>
                          </Form>
                             </CardBody>
                      </Card>
                      </Col>
                </Row>
                <Form>
                  <Button
                    type="button"
                    color="primary"
                    className="mr-1 waves-effect waves-light"
                    onClick={e => this.postVideo(e)}
                  >
                    Post Video
                  </Button>
                  <Button
                    type="submit"
                    color="secondary"
                    className="waves-effect"
                  >
                    Cancel Posting
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default UploadVideos
