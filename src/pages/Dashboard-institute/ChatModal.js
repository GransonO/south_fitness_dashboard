import {Component} from "react";
import {
  Button,
  Card,
  CardBody, CardTitle,
  Col, Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row, Spinner
} from "reactstrap";
import PropTypes from "prop-types";
import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import {Link} from "react-router-dom";

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      slogan:'',
      image: '',
      imageUploading: false,
      selectedImageFiles: [],
    }
  }


  imageUpload = async (files) => {
    this.setState({
          imageUploading: true
      });
    files.map( async (file) => {
      let data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "South_Fitness_Groups");
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

            this.setState({ imageUploading: false, selectedImageFiles: files, image: response.data.secure_url})
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

  render() {
    const { isOpen, toggle, addChat } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        role="dialog"
        autoFocus={true}
        centered={true}
        className="exampleModal"
        tabIndex="-1"
        toggle={toggle}
      >
        <div className="modal-content">
          <ModalHeader toggle={toggle}>New Chat Group</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label htmlFor="productname">Group Title</Label>
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
                Group slogan
              </Label>
              <Input
                id="manufacturerbrand"
                name="manufacturerbrand"
                type="text"
                value={this.state.slogan}
                onChange={e => this.setState({slogan: e.target.value}) }
                className="form-control"
              />
            </FormGroup>
            <Card>
              <CardBody>
                <CardTitle className="mb-3">Chat Group Image</CardTitle>
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

          </ModalBody>
          <ModalFooter>
            <Button type="button" color="secondary" onClick={e => toggle()}>
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={e => addChat(
                this.state.title,
                this.state.slogan,
                this.state.image
            )}>
              Add Group
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    )
  }
}

ChatModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ChatModal;