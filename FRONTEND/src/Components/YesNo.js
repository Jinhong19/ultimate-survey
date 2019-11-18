import React, { Component } from "react";
import {
    Container,
    Modal,
    Row,
    Col,
    Form,
    FormLabel,
    FormControl,
    Button
} from "react-bootstrap";
import { Card } from "@material-ui/core";

export class YesNo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { question, type, id } = this.props.question;

        console.log(this.props.question);

        if (type === "Yes or No") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    {/* <h3>Question {this.props.qNumber}</h3> */}
                                    <h4>
                                        {this.props.qNumber}. {question}
                                    </h4>
                                </FormLabel>
                                <div key="inline-radio" className="mb-3">
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label="  Yes"
                                        type="radio"
                                        id="inline-radio-1"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label="  No"
                                        type="radio"
                                        id="inline-radio-2"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else if (type === "Short Answer") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4> {this.props.qNumber}. {question}</h4>
                                </FormLabel>
                                <div key="short-response" style={textBoxMargin}>
                                    <FormControl
                                        placeholder="Short Response"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else if (type === "Long Answer") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4> {this.props.qNumber}. {question}</h4>
                                </FormLabel>
                                <div key="short-response" style={textBoxMargin}>
                                    <FormControl
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Long Response"
                                        rows="4"
                                    />
                                </div>
                                <div style={removeBtn}>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={this.props.removeItem.bind(
                                            this,
                                            id
                                        )}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Error</h1>
                </div>
            );
        }
    }
}

const margin = {
    marginBottom: "0.5em"
};

const textBoxMargin = {
    marginBottom: "1em"
};

const removeBtn = {
    marginBottom: "1em",
    textAlign: "right"
};

const padding = {
    paddingLeft: "2em",
    paddingRight: "2em"
};

const cardStyle = {
    display: "block",
    width: "55em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3em",
    background: "f5f5f5"
};

export default YesNo;
