import React, { Component } from "react"
import {
    Row,
    Col,
    Card,
    CardBody,
    Button,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon, Label, Media, Spinner,
} from "reactstrap"
import { Link } from "react-router-dom"

//Simple bar
import SimpleBar from "simplebar-react"
import {db} from "../../services/firebase";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import swal from "sweetalert";
import ChatModal from "./ChatModal";

class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      chatCreating: false,
      messages: [],
      group:'',
      curMessage: "",
      chatImageUrl: "no image"
    }
  }


  fetchData = async (roomId) => {
    const messageData = await db.collection(roomId).orderBy("epoch_time", "desc").get();
    let list = [];
    messageData.forEach(element => list.push(element.data()));
    console.log("-------fetchData--------- ", list);
    this.setState(
      {
        messages : list,
        loading: false
      }
    )
  }

  //Use For Chat Box
  userChatOpen = (roomId) => {
    console.log("The room ID is: ", roomId);
    this.setState({
      group: roomId
    });
    this.fetchData(roomId);
  }

  addMessage = async () => {
    if(this.state.group === ''){
       swal("Wait!", "Please select a group to post to first", "info");
       return;
    }
    let now = new Date();
    const message = {
     "group_id": this.state.group,
      "user_id":localStorage.getItem("south_fitness_UID"),
      "message":this.state.curMessage,
      "reply_body":"",
      "image": this.state.chatImageUrl,
      "message_id": uuidv4(),
      "username": localStorage.getItem("south_fitness_fullname"),
      "created_at": moment(now).format("YYYY-MM-DD HH:mm:ss"),
      "epoch_time": Math.round(now.getTime() / 1000)
    };
    console.log("-------------------Cur Message---------> ", message);
    await db.collection(this.state.group).add(message);
    this.fetchData(this.state.group);
  }


  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  };

  addChatGroup = (title, slogan, image) => {
      if(title === "" ||  slogan === "" ||  image === ""){
        swal("🤨", "You need to fill all entries", "info");
        return
      }
      this.setState({chatCreating: true});
      let chatObject = {
              "creator_name": localStorage.getItem("south_fitness_fullname"),
              "created_by": localStorage.getItem("south_fitness_email"),
              "user_id":localStorage.getItem("south_fitness_UID"),
              "group_title": title,
              "group_slogan": slogan,
               "group_image": image
          }
          console.log("----------------The Chat-----------------", chatObject);

       fetch("https://southfitness.epitomesoftware.live/chats/groups/", {
          method: "POST",
         headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
           body: JSON.stringify({
              "creator_name": localStorage.getItem("south_fitness_fullname"),
              "user_id":localStorage.getItem("south_fitness_UID"),
              "institution_id":localStorage.getItem("south_fitness_institution_id"),
              "group_title": title,
              "group_slogan": slogan,
              "group_image": image
          })
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------The Members List-----------------", response);
          this.setState({chatCreating: false});
          swal("Success!", "Group added success", "success").then((value) => {
             location.reload();
            });
        })
        .catch((error) => {
          this.setState({chatCreating: false});
          // Code for handling the error
             swal("Failed!", "Group added failed", "info").then((value) => {
             location.reload();
            });
        });
  };

  render() {
    return (
      <React.Fragment>
         <ChatModal
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          addChat={this.addChatGroup}
        />
        <Col xl="12">
          <Card>
            <CardBody className="border-bottom">
              <Row>
                <Col md="6" xs="6">
                  <h5 className="font-size-15 mb-1">Team Chat</h5>
                  <p className="text-muted mb-0">
                    <i className="mdi mdi-circle text-success align-middle mr-1"/>{" "}
                    Active now
                  </p>
                </Col>
                <Col md="6">
                  <Row>
                      <Col md="6">
                      <FormGroup>
                        <select className="custom-select custom-select-sm form-control" onChange={e => this.userChatOpen(e.target.value)}>
                          <option value="">Select Group</option>
                          {this.props.groups.map(item => (
                                <option key={item.group_id} value={item.group_id}>{item.group_title}</option>
                            ))}
                          </select>
                      </FormGroup>
                  </Col>
                      <Col md="6">
                        <Button
                          type="button"
                          color="primary"
                          size="sm"
                          className="chat-send w-md waves-effect waves-light"
                          onClick={this.toggleModal}
                        >
                            Add Chat Group
                        </Button>
                        {this.state.chatCreating ? <Spinner animation="grow" /> : ""}
                      </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardBody className="pb-0">
              <div>
                <div className="chat-conversation">
                  <SimpleBar style={{ maxHeight: "300px" }}>
                    <ul className="list-unstyled">
                      {this.state.messages.map(message => (
                       <li
                          key={"test_k" + message.message_id}
                          className={
                            message.user_id === localStorage.getItem("south_fitness_UID")
                              ? "left"
                              : "right"
                          }
                        >
                          <div className="conversation-list">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="btn nav-btn"
                                tag="i"
                              >
                                <i className="bx bx-dots-vertical-rounded" />
                              </DropdownToggle>
                              <DropdownMenu direction="right">
                                <DropdownItem href="#">
                                  Copy
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Save
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Forward
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                            <div className="ctext-wrap">
                              <div className="conversation-name">
                                {message.username}
                              </div>
                              <p>{message.message}</p>
                              <p className="chat-time mb-0">
                                <i className="bx bx-time-five align-middle mr-1" />
                                {moment(message.created_at).format("DD-MM-YY hh:mm")}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </SimpleBar>
                </div>
              </div>
            </CardBody>

            <div className="p-3 chat-input-section">
              <Row>
                <Col>
                  <div className="position-relative">
                    <input
                      type="text"
                      value={this.state.curMessage}
                      onKeyPress={this.onKeyPress}
                      onChange={e => {
                        this.setState({
                          curMessage: e.target.value,
                        })
                      }}
                      className="form-control rounded chat-input"
                      placeholder="Enter Message..."
                    />
                    <div className="chat-input-links">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
                              className="mdi mdi-emoticon-happy-outline"
                              id="Emojitooltip"
                              />
                            <UncontrolledTooltip
                              placement="top"
                              target="Emojitooltip"
                            >
                              Emojis
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
  className="mdi mdi-file-image-outline"
  id="Imagetooltip"
  />
                            <UncontrolledTooltip
                              placement="top"
                              target="Imagetooltip"
                            >
                              Images
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link to="#">
                            <i
  className="mdi mdi-file-document-outline"
  id="Filetooltip"
  />
                            <UncontrolledTooltip
                              placement="top"
                              target="Filetooltip"
                            >
                              Add Files
                            </UncontrolledTooltip>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
                <div className="col-auto">
                  <Button
                    type="submit"
                    color="primary"
                    className="chat-send w-md waves-effect waves-light"
                    onClick={() => this.addMessage()}>
                    <span className="d-none d-sm-inline-block mr-2">Send</span>{" "}
                    <i className="mdi mdi-send"/>
                  </Button>
                </div>
              </Row>
            </div>
          </Card>
        </Col>
      </React.Fragment>
    )
  }
}

export default ChatBox
