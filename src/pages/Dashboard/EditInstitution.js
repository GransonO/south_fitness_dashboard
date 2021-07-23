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
import swal from "sweetalert";
import {HuePicker } from 'react-color';

class EditInstitution extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImageFiles: [],
      instituteImageUrl: "",
      institute_name:"",
      institute_id:"",
      admin_name:"",
      first_name:"",
      last_name:"",
      admin_email:"",
      primary_color:"#fff",
      secondary_color:"#fff",
      login:false,
      posting:false,
      loading:false,
    }
  }

  addInstitution = async () => {

      if(this.state.first_name === "" ||  this.state.institute_name === "" ||  this.state.last_name === "" ||  this.state.admin_email === "" ){
        swal("🤨", "You need to fill all entries", "info");
        return
      }

    this.setState({posting: true})
    let instituteObject = {
        institute_id: this.state.institute_id,
        institute_name: this.state.institute_name,
        institute_admin_name: this.state.first_name + " " + this.state.last_name,
        institute_admin_email:this.state.admin_email,
        institute_primary_color:this.state.primary_color,
        institute_secondary_color:this.state.secondary_color,
        institute_logo:this.state.instituteImageUrl,
        is_active: true
    };

       fetch("https://southfitness.epitomesoftware.live/institution/", {
           method: "PUT",
           headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify(instituteObject)
          })
          .then(response => response.json())
          .then(response => {
             console.log("=================== > ", response.data);
              swal("Success!", "Institution Updated Successfully", "success")
              window.location.href = "/admin"
            // Code for handling the response
          })
          .catch((error) => {
            console.log("================= > The object is : ", error.toString());
            this.setState({posting: false})
             swal("Error!", "Institution Update error", "error");
            // Code for handling the error
          });
  };

  imageUpload = async (files) => {
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

            this.setState({ selectedImageFiles: files, instituteImageUrl: response.data.secure_url})
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

  handleChangePrimary = (color) => {
    this.setState({ primary_color: color.hex });
  };

  handleChangeSecondary = (color) => {
    this.setState({ secondary_color: color.hex });
  };

  getInstitution = async () => {
        let param = new URL(window.location.href);
        console.log(param.searchParams.get("id"));

      fetch("https://southfitness.epitomesoftware.live/institution/" + param.searchParams.get("id"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          let result = response[0];
          this.setState({
              institute_id: param.searchParams.get("id"),
              instituteImageUrl: result.institute_logo,
              institute_name: result.institute_name,
              admin_name: result.institute_admin_name,
              first_name: result.institute_admin_name.split(" ")[0],
              last_name: result.institute_admin_name.split(" ")[1],
              admin_email: result.institute_admin_email,
              primary_color: result.institute_primary_color,
              secondary_color: result.institute_secondary_color,
          });
          return response.length;
        })
        .catch((error) => {

          // Code for handling the error
          return 0;
        });
  }

  componentDidMount() {
      this.getInstitution()
  }

    render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Admin" breadcrumbItem="Edit Institutions" />
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
                        <CardTitle className="mb-3">Institution Logo</CardTitle>
                        {this.state.loading ? <Spinner animation="grow" /> : ""}
                        <Form>
                        <div>
                        <Row className="align-items-center">
                        <Col className="col-auto">
                          <img
                            data-dz-thumbnail=""
                            height="100"
                            className="avatar-sm rounded bg-light"
                            alt=""
                            src={this.state.instituteImageUrl}
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
                          onDrop={acceptedFiles => {
                              this.setState({
                                  loading: true
                                });
                               this.imageUpload(acceptedFiles)
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
                               Update Entry
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

export default EditInstitution
