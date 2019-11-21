import React, { Component, useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import StateQuestions from "./StateQuestions";
import SurveyCreateButton from "../Components/SurveyCreateButton";
import MCOption from "./MCOption";
import EditableLabel from "react-inline-editing";

export class MCMaker extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        count: 1,
        options: ["1", "2", "3"]
    };

    _handleFocus(text) {
        console.log("Focused with text: " + text);
    }

    _handleFocusOut(text) {
        console.log("Left editor with text: " + text);
    }

    addOption = () => {
        console.log("RECV- addOptions in MCMaker: ");
        this.state.options.push("hello" + this.state.count);
        this.state.count++;
        console.log(this.state.count);
    };

    render() {
        if (this.props.type === "Multiple Choice") {
            return (
                <div style={margin}>
                    <h4>Select options</h4>
                    <Row>
                        <Col xs="10">
                            <EditableLabel
                                text="Type your option"
                                labelClassName="myLabelClass"
                                inputClassName="myInputClass"
                                inputWidth="100%"
                                onFocus={this._handleFocus}
                                onFocusOut={this._handleFocusOut}
                            />
                        </Col>
                        <Col xs="2">
                            <Button
                                onClick={() => {
                                    this.setState({
                                        options: [...this.state.options, "lol"]
                                    });
                                    // this.state.options.push("lol");
                                    console.log(this.state.options);
                                }}
                            >
                                +
                            </Button>
                        </Col>
                    </Row>
                    <div>
                        <MCOption options={this.state.options} />
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

const margin = {
    marginTop: "2em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default MCMaker;
