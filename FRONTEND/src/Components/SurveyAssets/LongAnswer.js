import React, { Component } from "react";
import { Form, FormLabel, FormControl, Button } from "react-bootstrap";
import { Card } from "@material-ui/core";

export class LongAnswer extends Component {
    render() {
        if (this.props.edit) {
            return (
                <div className="shortQ" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}.{" "}
                                        {this.props.question}
                                    </h4>
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
                                            this.props.id
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
                <div className="shortQ" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}.{" "}
                                        {this.props.question}
                                    </h4>
                                </FormLabel>
                                <div key="short-response" style={textBoxMargin}>
                                    <FormControl
                                        as="textarea"
                                        aria-label="With textarea"
                                        placeholder="Long Response"
                                        rows="4"
                                    />
                                </div>
                            </Form.Group>
                        </div>
                    </Card>
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
    maxWidth: "55em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "3em",
    background: "f5f5f5"
};

export default LongAnswer;
