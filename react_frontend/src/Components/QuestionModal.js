import React, { Component } from "react";
import { Container, Button, Modal, Row, Col, Form } from "react-bootstrap";

export class QuestionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        console.log(e);
    }

    render() {
        return (
            <div className="addQuestion" style={margin}>
                <Form onSubmit={this.props.addItem}>
                    <Form.Group controlId="surveyQuestion">
                        <Form.Label>
                            <h3>What would you like to ask?</h3>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter new question for survey"
                        />
                    </Form.Group>

                    <Form.Group controlId="responseType">
                        <Form.Label>
                            <h3>Select response type</h3>
                        </Form.Label>
                        <Form.Control as="select">
                            <option>Yes or No</option>
                            <option>Multiple Choice</option>
                            <option>Short Answer</option>
                            <option>Long Answer</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="success" type="submit">
                        Add
                    </Button>
                </Form>
            </div>
        );
    }
}

const margin = {
    marginTop: "1em"
};

export default QuestionModal;
