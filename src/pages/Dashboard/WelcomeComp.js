import React, { Component } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import profileImg from "../../assets/images/profile-img.png"

class WelcomeComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
    }
  }

  render() {
    return (
      <React.Fragment>
        <Card className="overflow-hidden">
          <div className="bg-soft-primary">
            <Row>
              <Col xs="7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">{this.state.name}</h5>
                  <h5 className="font-size-15 text-truncate">{localStorage.getItem('south_fitness_fullname')}</h5>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </React.Fragment>
    )
  }
}

export default WelcomeComp
