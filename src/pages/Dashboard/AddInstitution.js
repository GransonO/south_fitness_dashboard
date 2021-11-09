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
import axios from "axios";
import swal from "sweetalert";
import {HuePicker } from 'react-color';

class AddInstitution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageFiles: [],
      selectedImageFiles1: [],
      selectedImageFiles2: [],
      selectedImageFiles3: [],
      instituteImageUrl: "",
      institute_name:"",
      admin_name:"",
      first_name:"",
      last_name:"",
      admin_email:"",
      primary_color:"#fff",
      primary_rgb:"#fff",
      secondary_color:"#fff",
      secondary_rgb:"#fff",
      institute_msg1: "",
      institute_msg2: "",
      institute_msg3: "",
      institute_url1: "",
      institute_url2: "",
      institute_url3: "",
      login:false,
      posting:false,
      loading:false,
      loading1:false,
      loading2:false,
      loading3:false,
    }
  }

  addInstitution = async () => {

      if(
          this.state.first_name === "" ||
          this.state.institute_name === "" ||
          this.state.last_name === "" ||
          this.state.admin_email === "" ||
          this.state.primary_color === "#fff" ||
          this.state.secondary_color === "#fff" ||
          this.state.instituteImageUrl === "" ||
          this.state.institute_msg1 === "" ||
          this.state.institute_msg2 === "" ||
          this.state.institute_msg3 === "" ||
          this.state.institute_url1 === "" ||
          this.state.institute_url2 === "" ||
          this.state.institute_url3 === ""
      ){
        swal("Error", "You need to fill all entries", "info");
        return
      }
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let validate = re.test(this.state.admin_email);
      if(!validate){
          swal("🤨", "Invalid email", "info");
        return
      }

    this.setState({posting: true})
    let instituteObject = {
        institute_name: this.state.institute_name,
        institute_admin_name: this.state.first_name + " " + this.state.last_name,
        institute_admin_email:this.state.admin_email,
        institute_primary_color:this.state.primary_rgb,
        institute_primary_hex:this.state.primary_color,
        institute_secondary_color:this.state.secondary_rgb,
        institute_secondary_hex:this.state.secondary_color,
        institute_logo:this.state.instituteImageUrl,

        institute_message1:this.state.institute_msg1,
        institute_message2:this.state.institute_msg2,
        institute_message3:this.state.institute_msg3,

        institute_img1:this.state.institute_url1,
        institute_img2:this.state.institute_url2,
        institute_img3:this.state.institute_url3,
        is_active: true
    };
    await axios.post("https://southfitness.epitomesoftware.live/institution/", instituteObject, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(
          response => {
          console.log("=================== > ", response.data);
          swal("Success!", "Institution added Successfully", "success");
          window.location.href = "/admin"
        }
        ).catch(
           response => {
             console.log("================= > The object is : ", response.data);
            this.setState({posting: false});
             swal("Error!", "Institution Posting error", "error");
           }
       );
  };

  imageUpload = async (files, status) => {
    files.map( async (file) => {
      let data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "South_Fitness_Institutions");
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

            switch (status) {
                case "logo":
                    this.setState({ selectedImageFiles: files, instituteImageUrl: response.data.secure_url, loading: false})
                    break;
                case "image1":
                    this.setState({ selectedImageFiles1: files, institute_url1: response.data.secure_url, loading1: false})
                    break;
                case "image2":
                    this.setState({ selectedImageFiles2: files, institute_url2: response.data.secure_url, loading2: false})
                    break;
                case "image3":
                    this.setState({ selectedImageFiles3: files, institute_url3: response.data.secure_url, loading3: false})
                    break;
            }
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

  handleChangePrimary = (color) => {
    this.setState({ primary_color: color.hex });
    this.setState({ primary_rgb: color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + ","  + color.rgb.a });
  };

  handleChangeSecondary = (color) => {
    this.setState({ secondary_color: color.hex });
    this.setState({ secondary_rgb: color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + ","  + color.rgb.a });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Admin" breadcrumbItem="Institutions" />
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
                        <Label htmlFor="productname">Institution Name</Label>
                        <Input
                          id="productname"
                          name="productname"
                          type="text"
                          className="form-control"
                          value={this.state.institute_name}
                          onChange={e => this.setState({institute_name: e.target.value}) }
                        />
                      </FormGroup>
                      <Row>
                          <Col sm={"6"}>
                              <FormGroup>
                        <Label htmlFor="manufacturerbrand">
                          Admin Firstname
                        </Label>
                        <Input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          value={this.state.first_name}
                          className="form-control"
                          onChange={e => this.setState({first_name: e.target.value}) }
                        />
                      </FormGroup>
                          </Col>
                          <Col sm={"6"}>
                              <FormGroup>
                        <Label htmlFor="manufacturerbrand">
                          Lastname
                        </Label>
                        <Input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          value={this.state.last_name}
                          className="form-control"
                          onChange={e => this.setState({last_name: e.target.value}) }
                        />
                      </FormGroup>
                          </Col>
                      </Row>
                      <FormGroup>
                        <Label htmlFor="manufacturerbrand">
                          Admin Email
                        </Label>
                        <Input
                          id="manufacturerbrand"
                          name="manufacturerbrand"
                          type="text"
                          value={this.state.admin_email}
                          className="form-control"
                          onChange={e => this.setState({admin_email: e.target.value}) }
                        />
                      </FormGroup>
                      <Row>
                            <Col sm="6">
                                <FormGroup>
                                    <Label htmlFor="price">Institution Primary Theme</Label>
                                    <Input
                                      id="price"
                                      name="price"
                                      disabled={true}
                                      className="form-control"
                                      value={this.state.primary_color}
                                    />
                                  </FormGroup>
                            </Col>
                            <Col sm="6">
                                <FormGroup>
                                    <Label htmlFor="price">Institution Secondary Theme</Label>
                                    <Input
                                      id="price"
                                      name="price"
                                      disabled={true}
                                      className="form-control"
                                      value={this.state.secondary_color}
                                    />
                                  </FormGroup>
                            </Col>
                        </Row>
                      <Row>
                        <Col sm="6">
                            <HuePicker
                                color={ this.state.primary_color }
                                onChangeComplete={ this.handleChangePrimary }
                              />
                        </Col>
                        <Col sm="6">
                            <HuePicker
                            color={ this.state.secondary_color }
                            onChangeComplete={ this.handleChangeSecondary }
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col sm="6">
                     <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Institution Logo (w:600px h:460px) {this.state.loading ? <Spinner animation="grow" /> : ""} </CardTitle>
                        <Form>
                        <Dropzone
                          accept={'image/*'}
                          onDrop={acceptedFiles => {
                              this.setState({
                                  loading: true
                                });
                               this.imageUpload(acceptedFiles, "logo")
                            }
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
                                  <h4>Drop or click to upload the Logo.</h4>
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
                      </Form>
                       </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <FormGroup>
                        <Label htmlFor="productname">Page 1 Message (300 char)</Label>
                        <textarea
                          className="form-control"
                          id="productdesc"
                          rows="5"
                          value={this.state.institute_msg1}
                          onChange={e => {
                              if(this.state.institute_msg1.length > 300){
                                  swal("Info", "The message is too long", "info");
                              }else{
                                  this.setState({institute_msg1: e.target.value})
                              }
                            }
                          }
                         />
                      </FormGroup>
                      <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Entry Image 1 {this.state.loading1 ? <Spinner animation="grow" /> : ""} </CardTitle>
                        <Form>
                        <Dropzone
                          accept={"image/*"}
                          onDrop={acceptedFiles => {
                              this.setState({
                                  loading1: true
                                });
                               this.imageUpload(acceptedFiles, "image1")
                            }
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
                                  <h4>Drop or click to upload the Logo.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {this.state.selectedImageFiles1.map((f, i) => {
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
                      </Form>
                       </CardBody>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <Label htmlFor="productname">Page 2 Message (300 char)</Label>
                        <textarea
                          className="form-control"
                          id="productdesc"
                          rows="5"
                          value={this.state.institute_msg2}
                          onChange={e => {
                              if(this.state.institute_msg2.length > 300){
                                  swal("Info", "The message is too long", "info");
                              }else{
                                  this.setState({institute_msg2: e.target.value})
                              }
                            }  }
                         />
                      </FormGroup>
                      <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Entry Image 2 {this.state.loading2 ? <Spinner animation="grow" /> : ""} </CardTitle>
                        <Form>
                        <Dropzone
                          accept={"image/*"}
                          onDrop={acceptedFiles => {
                              this.setState({
                                  loading2: true
                                });
                               this.imageUpload(acceptedFiles, "image2")
                            }
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
                                  <h4>Drop or click to upload the Logo.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {this.state.selectedImageFiles2.map((f, i) => {
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
                      </Form>
                       </CardBody>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <FormGroup>
                        <Label htmlFor="productname">Page 3 Message (300 char)</Label>
                        <textarea
                          className="form-control"
                          id="productdesc"
                          rows="5"
                          value={this.state.institute_msg3}
                          onChange={e =>  {
                              if(this.state.institute_msg3.length > 300){
                                  swal("Info", "The message is too long", "info");
                                  this.setState({institute_msg3: e.target.value})
                              }else{
                                  this.setState({institute_msg3: e.target.value})
                              }
                            }
                          }
                         />
                      </FormGroup>
                      <Card>
                      <CardBody>
                        <CardTitle className="mb-3">Entry Image 3 {this.state.loading3 ? <Spinner animation="grow" /> : ""}</CardTitle>
                        <Form>
                        <Dropzone
                          accept={"image/*"}
                          onDrop={acceptedFiles => {
                              this.setState({
                                  loading3: true
                                });
                               this.imageUpload(acceptedFiles, "image3")
                            }
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
                                  <h4>Drop or click to upload the Logo.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {this.state.selectedImageFiles3.map((f, i) => {
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
                      </Form>
                       </CardBody>
                      </Card>
                    </Col>
                  </Row>
                   <Col sm="2">
                      <Card>
                       <CardBody>
                           <Row>
                             <div className="float-left">
                              <Button type="button" color="primary"onClick={ e => {
                                      this.addInstitution()
                                  }
                                }
                              >
                               Post Entry
                              </Button>
                              {this.state.posting ? <Spinner animation="grow" /> : ""}
                          </div>
                          </Row>
                       </CardBody>
                     </Card>
                    </Col>
                </Form>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default AddInstitution
