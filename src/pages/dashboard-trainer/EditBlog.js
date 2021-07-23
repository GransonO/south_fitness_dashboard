import React, { Component } from "react"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form, FormGroup, Input, Label,
  Row, Spinner,
} from "reactstrap"

// Form Editor
 import { Editor } from '@tinymce/tinymce-react';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import CardFooter from "reactstrap/lib/CardFooter";
import Dropzone from "react-dropzone";
import {Link} from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import swal from "sweetalert";
import PopularPost from "./PopularPost";

class NewBlog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageFiles: [],
      image_url: "",
      title:"",
      reading_duration:0,
      login:false,
      blog_category: "",
      body: ""
    }
  }

  putBlog = async () => {
      let param = new URL(window.location.href);

    let blogObject = {
      blog_id: param.searchParams.get("id"),
      title: this.state.title,
      body: this.state.body,
      image_url: this.state.image_url,
      // blog_category:  this.state.type,
      reading_duration: this.state.reading_duration
    };
      await axios.put("https://southfitness.epitomesoftware.live/blog/", blogObject, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response.data);
          swal("Success!", "Blog Updated Success", "success")
          window.location.href = "/new-blog";
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data);
             swal("Error!", "Blog Updated error", "error");
           }
       );
    console.log("The passed Blog is: > ", blogObject);
  };

  handleEditorChange = (e) => {
    this.setState({body: e});
  }

  imageUpload = async (files) => {
    this.setState({
      login: true
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
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              formattedSize: this.formatBytes(file.size),
            });

            this.setState({ selectedImageFiles: files, image_url: response.data.secure_url})
          });
        }
    );

    this.setState({
      login: false
    });
  }

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  getBlog = async() => {
        let param = new URL(window.location.href);
        console.log(param.searchParams.get("id"))

       fetch("https://southfitness.epitomesoftware.live/blog/" + param.searchParams.get("id"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log("============", response[0])
          this.setState({
            image_url: response[0].image_url,
            title: response[0].title,
            body: response[0].body,
            reading_duration: response[0].reading_duration,
          })
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  componentDidMount() {
    this.getBlog();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Trainer" breadcrumbItem="Blogs" />
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
                                        <Label htmlFor="productname">Blog Title</Label>
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
                                        <Label htmlFor="manufacturerbrand">
                                          Author's Name
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
                                        <Label className="control-label">Blog Category</Label>
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
                                      <FormGroup>
                                        <Label htmlFor="price">Duration(in minutes)</Label>
                                        <Input
                                          id="price"
                                          name="price"
                                          type="number"
                                          className="form-control"
                                          value={this.state.reading_duration}
                                          onChange={e => this.setState({reading_duration: e.target.value}) }
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                     <Card>
                                      <CardBody>
                                        <Form>
                                            <div>
                                                <Row className="align-items-center">
                                                <Col className="col-auto">
                                                  <img
                                                    data-dz-thumbnail=""
                                                    height="100"
                                                    className="avatar-sm rounded bg-light"
                                                    alt=""
                                                    src={this.state.image_url}
                                                  />
                                                </Col>
                                                <Col>
                                                  <p className="mb-0">
                                                    <strong>Current Image</strong>
                                                  </p>
                                                </Col>
                                              </Row>
                                                <br/>
                                            </div>
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
                                                  <h4>Update blog image.</h4>
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
                                        {this.state.login ? <Spinner animation="grow" /> : ""}
                                      </Form>
                                       </CardBody>
                                      </Card>
                                    </Col>
                                  </Row>
                                </Form>
                              </CardBody>
                            </Card>
                <Row>
                              <Col>
                                <Card>
                                  <CardBody>
                                    <CardTitle>South Fitness Blog Editor</CardTitle>
                                    <CardSubtitle className="mb-3">
                                      What would you like to write about today?
                                    </CardSubtitle>

                                    <Form method="post">
                                      <Editor
                                         init={{
                                           height: 500,
                                           menubar: true,
                                           plugins: [
                                             'advlist autolink lists link image charmap print preview anchor',
                                             'searchreplace visualblocks code fullscreen',
                                             'insertdatetime media table paste code help wordcount'
                                           ],
                                           toolbar:
                                             'undo redo | formatselect | bold italic backcolor | \
                                             alignleft aligncenter alignright alignjustify | \
                                             bullist numlist outdent indent | removeformat | help'
                                         }}
                                         initialValue={this.state.body}
                                         onEditorChange={this.handleEditorChange}
                                       />
                                    </Form>

                                  </CardBody>
                                  <CardFooter>
                                    <Button
                                      type="button"
                                      color="primary"
                                      onClick={this.putBlog}
                                      className="btn-rounded chat-send w-md waves-effect waves-light"
                                    >
                                      <span className="d-none d-sm-inline-block mr-2">
                                        Update Blog
                                      </span>{" "}
                                      <i className="mdi mdi-send"></i>
                                    </Button>
                                  </CardFooter>
                                </Card>
                              </Col>
                            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default NewBlog
