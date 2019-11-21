import React, { Component, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import StateQuestions from "./StateQuestions";
import SurveyCreateButton from "../Components/SurveyCreateButton";

export class MCOption extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        count: 1
    };

    render() {}
}

const margin = {
    marginTop: "4em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default MCOption;
