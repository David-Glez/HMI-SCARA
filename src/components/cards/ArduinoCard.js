import React from 'react';
import {
    Card,
    Row,
    Col
    } from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ArduinoCard = (props) => {
    const arduino = props.arduino

    return(
        <Card className="card-stats">
            <Card.Body>
                <Row>
                    <Col xs="5">
                        <div className="icon-big text-center icon-warning">
                            <FontAwesomeIcon 
                                icon = {['fab', 'usb']} 
                                className =  {arduino.isOpen ? 'text-success' : 'text-danger'}
                            />
                        </div>
                    </Col>
                    <Col xs="7">
                        <div className="numbers">
                        <p className="card-category">{arduino.name}</p>
                        <Card.Title as="h4">{arduino.path}</Card.Title>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Footer>
                <hr></hr>
                <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Mensaje: {(arduino.error == undefined) ? 'OK': arduino.error}
                </div>
            </Card.Footer>
        </Card>
    )
}

export default ArduinoCard;