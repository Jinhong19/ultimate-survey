import React, { Component } from "react";
import { Form, FormLabel, Button } from "react-bootstrap";
import { Card } from "@material-ui/core";

export class Boolean extends Component {
    render() {
        // console.log(this.props);
        if (this.props.edit) {
            return (
                <div className="booleanQ" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}.{" "}
                                        {this.props.question}
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
                                        onClick={
                                            this.props.removeItem.bind(this, this.props.id)
                                        }
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
                <div className="booleanQ" style={margin}>
                    <Card style={cardStyle}>
                        <div className="wrapper" style={padding}>
                            <Form.Group controlId="surveyQuestion">
                                <FormLabel>
                                    <h4>
                                        {this.props.qNumber}.{" "}
                                        {this.props.question}
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

export default Boolean;
