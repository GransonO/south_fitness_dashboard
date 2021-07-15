import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "moment"
import { size } from "lodash"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import { v4 as uuidv4 } from 'uuid';
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import {
  addMessage,
  getChats,
  getContacts,
  getGroups,
  getMessages,
} from "../../store/actions"


import { db } from "../../services/firebase";

class TrainerChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoomId: 1,
      currentUser: {
        name: localStorage.getItem("south_fitness_fullname"),
        email: localStorage.getItem("south_fitness_email"),
        userImage: localStorage.getItem("south_fitness_image"),
        isActive: true,
      },
      allChats: [],
      messages: [],
      notification_Menu: false,
      search_Menu: false,
      settings_Menu: false,
      other_Menu: false,
      activeTab: "1",
      Chat_Box_Username: "",
      Chat_Box_User_Status: "Online",
      Chat_Box_User_isActive: false,
      curMessage: "",
      chatImageUrl: "no image"
    }
    this.messageBox = null
  }

  getChatGroups = async () => {
       fetch("https://southfitness.epitomesoftware.live/chats/groups/all/" + localStorage.getItem("south_fitness_institution"), {
          method: "GET"
        })
        .then(response => response.json())
        .then(response => {
          console.log("----------------The List-----------------", response);
          this.setState({
            allChats: response
          })
        })
        .catch((error) => {

          // Code for handling the error
        });
  };

  componentDidMount() {
    const { onGetChats, onGetGroups, onGetContacts, onGetMessages } = this.props
    const { currentRoomId } = this.state;
    onGetChats();
    onGetGroups();
    onGetContacts();
    onGetMessages(currentRoomId);

    this.getChatGroups();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages } = this.props
    if (size(messages) !== size(prevProps.messages)) {
      this.scrollToBottom()
    }
  }

  toggleNotification = () => {
    this.setState(prevState => ({
      notification_Menu: !prevState.notification_Menu,
    }))
  }

  //Toggle Chat Box Menus
  toggleSearch = () => {
    this.setState(prevState => ({
      search_Menu: !prevState.search_Menu,
    }))
  }

  toggleSettings = () => {
    this.setState(prevState => ({
      settings_Menu: !prevState.settings_Menu,
    }))
  }

  toggleOther = () => {
    this.setState(prevState => ({
      other_Menu: !prevState.other_Menu,
    }))
  }

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      })
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
  userChatOpen = (id, name, status, roomId) => {
    this.setState({ Chat_Box_Username: name, currentRoomId: roomId })
    this.fetchData(roomId)
  }

  addMessage = async (roomId) => {
    let now = new Date();
    const message = {
     "group_id": roomId,
      "user_id":this.state.currentUser.email,
      "message":this.state.curMessage,
      "reply_body":"",
      "image": this.state.chatImageUrl,
      "message_id": uuidv4(),
      "username": this.state.currentUser.name,
      "created_at": moment(now).format("YYYY-MM-DD HH:mm:ss"),
      "epoch_time": Math.round(now.getTime() / 1000)
    };
    console.log("-------------------Cur Message---------> ", message);
    await db.collection(roomId).add(message);
    this.fetchData(roomId);
  }

  scrollToBottom = () => {
    if (this.messageBox) {
      this.messageBox.scrollTop = this.messageBox.scrollHeight + 1000
    }
  }

  onKeyPress = e => {
    const { key, value } = e
    const { currentRoomId, currentUser } = this.state
    if (key === "Enter") {
      this.setState({ curMessage: value })
      this.addMessage(currentRoomId)
      e.tar
    }
  }

  render() {
    const { currentRoomId, currentUser } = this.state;

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="SouthFitness" breadcrumbItem="Chat" />

            <Row>
              <Col lg="12">
                <div className="d-lg-flex">
                  <div className="chat-leftsidebar mr-lg-4">
                    <div className="">
                      <div className="py-4 border-bottom">
                        <Media>
                          <div className="align-self-center mr-3">
                            <img
                              src={currentUser.userImage}
                              className="avatar-xs rounded-circle"
                              alt=""
                            />
                          </div>
                          <Media body>
                            <h5 className="font-size-15 mt-0 mb-1">
                              {currentUser.name}
                            </h5>
                            <p className="text-muted mb-0">
                              <i className="mdi mdi-circle text-success align-middle mr-1" />
                              Active
                            </p>
                          </Media>

                          <div>
                            <Dropdown
                              isOpen={this.state.notification_Menu}
                              toggle={this.toggleNotification}
                              className="chat-noti-dropdown active"
                            >
                              <DropdownToggle className="btn" tag="i">
                                <i className="bx bx-bell bx-tada" />
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">
                                  Another action
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Something else here
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        </Media>
                      </div>

                      <div className="search-box chat-search-box py-4">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>

                      <div className="chat-leftsidebar-nav">
                        <TabContent
                          activeTab={this.state.activeTab}
                          className="py-4"
                        >
                          <TabPane tabId="1">
                            <div>
                              <h5 className="font-size-14 mb-3">Groups</h5>
                              <ul className="list-unstyled chat-list">
                                <PerfectScrollbar style={{ height: "410px" }}>
                                  {this.state.allChats.map(chat => (
                                    <li
                                      key={this.state.allChats.indexOf(chat)}
                                      className={
                                        currentRoomId === chat.group_id
                                          ? "active"
                                          : ""
                                      }
                                    >
                                      <Link
                                        to="#"
                                        onClick={() => {
                                          this.userChatOpen(
                                            chat.group_id,
                                            chat.group_title,
                                            chat.status,
                                            chat.group_id
                                          )
                                        }}
                                      >
                                        <Media>
                                          <div className="align-self-center mr-3">
                                            <i
                                              className={
                                                chat.status === "online"
                                                  ? "mdi mdi-circle text-success font-size-10"
                                                  : chat.status ===
                                                    "intermediate"
                                                  ? "mdi mdi-circle text-warning font-size-10"
                                                  : "mdi mdi-circle font-size-10"
                                              }
                                            />
                                          </div>
                                          <div className="align-self-center mr-3">
                                            <img
                                              src={chat.group_image}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>

                                          <Media
                                            className="overflow-hidden"
                                            body
                                          >
                                            <h5 className="text-truncate font-size-14 mb-1">
                                              {chat.group_title}
                                            </h5>
                                            <p className="text-truncate mb-0">
                                              {chat.group_slogan}
                                            </p>
                                          </Media>
                                          <div className="font-size-11">
                                            {chat.time}
                                          </div>
                                        </Media>
                                      </Link>
                                    </li>
                                  ))}
                                </PerfectScrollbar>
                              </ul>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 user-chat">
                    <Card>
                      <div className="p-4 border-bottom ">
                        <Row>
                          <Col md="4" xs="9">
                            <h5 className="font-size-15 mb-1">
                              {this.state.Chat_Box_Username}
                            </h5>

                            <p className="text-muted mb-0">
                              <i
                                className="mdi mdi-circle text-success align-middle mr-1"
                              />
                              {this.state.Chat_Box_User_Status}
                            </p>
                          </Col>
                          <Col md="8" xs="3">
                            <ul className="list-inline user-chat-nav text-right mb-0">
                              <li className="list-inline-item d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={this.state.search_Menu}
                                  toggle={this.toggleSearch}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-search-alt-2"></i>
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-md"
                                    right
                                  >
                                    <Form className="p-3">
                                      <FormGroup className="m-0">
                                        <InputGroup>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search ..."
                                            aria-label="Recipient's username"
                                          />
                                          <InputGroupAddon addonType="append">
                                            <Button
                                              color="primary"
                                              type="submit"
                                            >
                                              <i className="mdi mdi-magnify"></i>
                                            </Button>
                                          </InputGroupAddon>
                                        </InputGroup>
                                      </FormGroup>
                                    </Form>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                              <li className="list-inline-item  d-none d-sm-inline-block">
                                <Dropdown
                                  isOpen={this.state.settings_Menu}
                                  toggle={this.toggleSettings}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-cog"></i>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem href="#">
                                      View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Clear chat
                                    </DropdownItem>
                                    <DropdownItem href="#">Muted</DropdownItem>
                                    <DropdownItem href="#">Delete</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                              <li className="list-inline-item">
                                <Dropdown
                                  isOpen={this.state.other_Menu}
                                  toggle={this.toggleOther}
                                >
                                  <DropdownToggle
                                    className="btn nav-btn"
                                    tag="i"
                                  >
                                    <i className="bx bx-dots-horizontal-rounded"></i>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem href="#">Action</DropdownItem>
                                    <DropdownItem href="#">
                                      Another Action
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                      Something else
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul>
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <div className="chat-conversation p-3">
                          <ul className="list-unstyled">
                            <PerfectScrollbar
                              style={{ height: "470px" }}
                              containerRef={ref => (this.messageBox = ref)}
                            >
                              {this.state.messages.map(message => (
                                  <li
                                    key={"test_k" + message.message_id}
                                    className={
                                      message.user_id === currentUser.email
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
                            </PerfectScrollbar>
                          </ul>
                        </div>
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
                                  className="form-control chat-input"
                                  placeholder="Enter Message..."
                                />
                                <div className="chat-input-links">
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                      <Link to="#">
                                        <i
                                          className="mdi mdi-emoticon-happy-outline"
                                          id="Emojitooltip"
                                        ></i>
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
                                        ></i>
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
                                        ></i>
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
                            <Col className="col-auto">
                              <Button
                                type="button"
                                color="primary"
                                onClick={() =>
                                  this.addMessage(
                                    currentRoomId,
                                    currentUser.name
                                  )
                                }
                                className="btn-rounded chat-send w-md waves-effect waves-light"
                              >
                                <span className="d-none d-sm-inline-block mr-2">
                                  Send
                                </span>{" "}
                                <i className="mdi mdi-send"></i>
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

TrainerChat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
}

const mapStateToProps = ({ chat }) => ({
  chats: chat.chats,
  groups: chat.groups,
  contacts: chat.contacts,
  messages: chat.messages,
})

const mapDispatchToProps = dispatch => ({
  onGetChats: () => dispatch(getChats()),
  onGetGroups: () => dispatch(getGroups()),
  onGetContacts: () => dispatch(getContacts()),
  onGetMessages: roomId => dispatch(getMessages(roomId)),
  onAddMessage: roomId => dispatch(addMessage(roomId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TrainerChat)
