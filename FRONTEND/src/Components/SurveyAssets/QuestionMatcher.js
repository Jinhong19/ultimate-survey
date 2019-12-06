import React, { Component } from "react";
import { Form, FormLabel, Button } from "react-bootstrap";
import { Card } from "@material-ui/core";
import Boolean from "./Boolean";
import ShortAnswer from "./ShortAnswer";
import LongAnswer from "./LongAnswer";

export class QuestionMatcher extends Component {

    render() {
        const { question, type, id } = this.props.question;

        console.log(this.props.question);

        if (type === "Yes or No") {
            return (
                <Boolean question={this.question} qNumber={this.props.qNumber} />
            );
        } else if (type === "Short Answer") {
            return (
                <ShortAnswer question={this.question} qNumber={this.props.qNumber} />
            );
        } else if (type === "Long Answer") {
            return (
                <LongAnswer question={this.question} qNumber={this.props.qNumber} />
            );
        } else if (type === "Multiple Choice") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}. {question}
                                    </h4>
                                </FormLabel>
                                <div key="inline-radio" className="mb-3">
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value1}
                                                onChange={this.handleChange1.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="radio"
                                        id="inline-radio-1"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value2}
                                                onChange={this.handleChange2.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="radio"
                                        id="inline-radio-2"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value3}
                                                onChange={this.handleChange3.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="radio"
                                        id="inline-radio-3"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value4}
                                                onChange={this.handleChange4.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="radio"
                                        id="inline-radio-4"
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
        } else if (type === "Checkbox") {
            return (
                <div className="addQuestion" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}. {question}
                                    </h4>
                                </FormLabel>
                                <div key="inline-radio" className="mb-3">
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value1}
                                                onChange={this.handleChange1.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="checkbox"
                                        id="inline-checkbox-1"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value2}
                                                onChange={this.handleChange2.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="checkbox"
                                        id="inline-checkbox-2"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value3}
                                                onChange={this.handleChange3.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="checkbox"
                                        id="inline-checkbox-3"
                                    />
                                    <Form.Check
                                        inline
                                        name="qCheck"
                                        label={
                                            <textarea
                                                value={this.state.value4}
                                                onChange={this.handleChange4.bind(
                                                    this
                                                )}
                                            />
                                        }
                                        type="checkbox"
                                        id="inline-checkbox-4"
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
    maxWidth: "55em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3em",
    background: "f5f5f5"
};

export default QuestionMatcher;
