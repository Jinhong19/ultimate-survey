import React, { Component, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import StateQuestions from "./StateQuestions";
import SurveyCreateButton from "../Components/SurveyCreateButton";
import MCOption from "./MCOption";

export class MCMaker extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        count: 1
    };

    render() {
        return (
            <div style={margin}>
                <Form style={formStyle}>
                    <MCOption count={this.state.count} />
                </Form>
            </div>
        );
    }
}

const margin = {
    marginTop: "4em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default MCMaker;
