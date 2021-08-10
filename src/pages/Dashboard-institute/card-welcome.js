import React, { Component } from "react"
import { Row, Col, Card } from "reactstrap"

//Import Images
import profileImg from "../../assets/images/profile-img.png"

const CardWelcome = props => {
  return (
      <React.Fragment>
        <Col xl="4">
          <Card className="bg-soft-primary">
            <div>
              <Row>
                <Col xs="7">
                  <div className="text-primary p-3">
                    <h5 className="text-primary">{localStorage.getItem("south_fitness_fullname")}</h5>
                    <p>{props.name} Dashboard</p>
                  </div>
                </Col>
                <Col xs="5" className="align-self-end">
                  <img src={profileImg} alt="" className="img-fluid" />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </React.Fragment>
    )
};

export default CardWelcome
