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
      blogImageUrl: "",
      blog: "",
      title:"",
      type:"",
      category:"",
      duration:0,
      loading:false,
      checked:false,
      allBlogs: [],
      allComments: [],
    }
  }

  postBlog = async () => {

    if(this.state.title === "" || this.state.body === "" || this.state.image_url === "" || this.state.blog_category === ""){
        swal("Error!", "Please fill all entries", "info");
        return
    }
    this.setState({
        loading: true
    });
    let blogObject = {
      blog_id: uuidv4(),
      uploaded_by: localStorage.getItem("south_fitness_fullname"),
      uploader_id: localStorage.getItem("south_fitness_UID"),
      title: this.state.title,
      body: this.state.blog,
      image_url: this.state.blogImageUrl,
      blog_category:  this.state.type,
      views_count:0,
      reading_duration: this.state.duration + "mins"
    };
      await axios.post("https://southfitness.epitomesoftware.live/blog/", blogObject, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response.data);
          swal("Success!", "Blog Posted Success", "success")
              this.setState({
                  checked:false,
              })
              this.getAllBlogs();
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data);
             swal("Error!", "Blog Posted error", "error");
           }
       );
    console.log("The passed Blog is: > ", blogObject);
  };

  handleEditorChange = (e) => {
    this.setState({blog: e});
  }

  imageUpload = async (files) => {
    this.setState({
      loading: true
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

            this.setState({ selectedImageFiles: files, blogImageUrl: response.data.secure_url})
          });
        }
    );

    this.setState({
      loading: false
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

  getAllBlogs = async() => {
        this.setState({
                loading: true
            });
       fetch("https://southfitness.epitomesoftware.live/blog/trainer/" + localStorage.getItem("south_fitness_UID"), {
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
            allComments: leCome,
            loading: false
          })
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  componentDidMount() {
    this.getAllBlogs();
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Trainer" breadcrumbItem="Blogs" />

            <Col sm="2">
              <Card>
               <CardBody>
                   <Row>
                     <div className="float-left">
                      <Button type="button" color={this.state.checked ? "danger" : "primary"} onClick={ e => {
                              this.setState({checked: !this.state.checked})
                          }
                        }
                      >
                        {this.state.checked ? "Cancel" : "Add A Blog" }
                      </Button>
                  </div>
                  </Row>
               </CardBody>
             </Card>
            </Col>

            {this.state.checked ?  <Card>
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
                          value={this.state.duration}
                          onChange={e => this.setState({duration: e.target.value}) }
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="6">
                     <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Blog Image</CardTitle>
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
                        {this.state.loading ? <Spinner animation="grow" /> : ""}
                      </Form>
                       </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card> : ""}

            {this.state.checked ?  <Row>
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
                         onEditorChange={this.handleEditorChange}
                       />
                    </Form>

                  </CardBody>
                  <CardFooter>
                    <Button
                      type="button"
                      color="primary"
                      onClick={this.postBlog}
                      className="btn-rounded chat-send w-md waves-effect waves-light"
                    >
                      <span className="d-none d-sm-inline-block mr-2">
                        Post Blog
                      </span>{" "}
                      <i className="mdi mdi-send"></i>
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row> : ""}

            <Row>
              <PopularPost blogs={this.state.allBlogs}/>
            </Row>

          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default NewBlog
