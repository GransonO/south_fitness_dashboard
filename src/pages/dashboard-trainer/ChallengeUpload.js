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

class ChallengeVideos extends Component {
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
      duration_ext: '',
      scheduledTime: '',
      scheduledDate: '',
      rewards: 0,
      imageUploading: false,
      posting: false,
      points: 0
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
    this.setState({
          posting: true
      });
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
          duration_ext: this.state.duration_ext,
          level: this.state.level,
          points:this.state.rewards
      };
      console.log("=================== > ", objectVideo);
      await axios.post("https://southfitness.epitomesoftware.live/challenge/listed/", objectVideo, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response.data);
          swal("Success!", "Video Posted Success", "success")
          this.setState({
            posting: false
          });
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data);
             swal("Error!", "Video Posted error", "error");
            this.setState({
              posting: false
            });
           }
       );
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Challenge" breadcrumbItem="Add Challenge" />

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
                            <Label htmlFor="productname">Challenge Title</Label>
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
                              <Row>
                                  <Col sm="6">
                                      <FormGroup>
                                       <Label htmlFor="manufacturerbrand">
                              Uploader Name
                            </Label>
                                        <Input
                              id="manufacturerbrand"
                              name="manufacturerbrand"
                              type="text"
                              value={this.state.instructor}
                              onChange={e => this.setState({instructor: e.target.value}) }
                              className="form-control"
                            />
                                      </FormGroup>
                                  </Col>
                                  <Col sm="6">
                              <FormGroup>
                                <Label className="control-label">Challenge Category</Label>
                                <select
                                    className="form-control select2"
                                    onChange={e => this.setState({type: e.target.value}) }
                                >
                                  <option>Select</option>
                                  <option value="DANCE" >BASIC</option>
                                  <option value="PHYSICAL">PHYSICAL</option>
                                  <option value="MUSCLE BUILDING">MUSCLE BUILDING</option>
                                </select>
                              </FormGroup>
                            </Col>
                              </Row>
                          </FormGroup>
                          <FormGroup>
                              <Row>
                                  <Col sm="6">
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
                                  </Col>
                                  <Col sm="6">
                              <FormGroup>
                                <Label className="control-label">Fitness Level</Label>
                                <select
                                    className="form-control select2"
                                    onChange={e => this.setState({level: e.target.value}) }
                                >
                                  <option>Select</option>
                                  <option value="BASIC" >BASIC</option>
                                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                                  <option value="ADVANCED">ADVANCED</option>
                                </select>
                              </FormGroup>
                            </Col>
                              </Row>
                          </FormGroup>
                        </Col>

                        <Col sm="6">
                            <FormGroup>
                                <Row>
                                    <Col sm="6">
                                          <Row>
                                          <Col sm="6">
                                              <Label htmlFor="price">Rewards</Label>
                                              <Input
                                                  id="price"
                                                  name="price"
                                                  type="number"
                                                  className="form-control"
                                                  value={this.state.rewards}
                                                  onChange={e => this.setState({rewards: e.target.value}) }
                                                />
                                          </Col>
                                          <Col sm="6">
                                              <Label htmlFor="price">Duration</Label>
                                              <Input
                                      id="price"
                                      name="price"
                                      type="number"
                                      className="form-control"
                                      value={this.state.duration}
                                      onChange={e => this.setState({duration: e.target.value}) }
                                    />
                                          </Col>
                                      </Row>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                <Label className="control-label">Duration Ext</Label>
                                <select
                                    className="form-control select2"
                                    onChange={e => this.setState({duration_ext: e.target.value}) }
                                >
                                  <option>Select</option>
                                  <option value="DAYS" >Days</option>
                                  <option value="WEEKS">Weeks</option>
                                  <option value="MONTHS">Months</option>
                                </select>
                              </FormGroup>
                                    </Col>
                                </Row>
                            </FormGroup>
                          <FormGroup>
                            <Label htmlFor="productdesc">
                              Challenge Description
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
                      <CardTitle className="mb-3">Challenge Image</CardTitle>
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
                  {this.state.posting ? <Spinner animation="grow" /> : ""}
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default ChallengeVideos
