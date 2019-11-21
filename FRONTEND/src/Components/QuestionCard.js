import React, { Component, useState } from "react";
import { Container, Button, Modal, Row, Col, Form } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import QuestionModal from "./QuestionModal";

const styles = theme => ({
    card: {
        display: "block",
        width: "55em",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "1em"
    }
});

class QuestionCard extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        title: "",
        type: "-1"
    };

    // hi

    options = ["Yes or No", "Multiple Choice", "Short Answer", "Long Answer"];

    onSubmit = e => {
        if (this.state.type !== "-1") {
            e.preventDefault();
            this.props.addItem(this.state);
            this.logState();
            this.setState({ title: "", type: "-1" });
        } else {
            // Show warning to select an option
        }
    };

    onChangeQ = e => {
        this.setState({ title: e.target.value });
        this.logState();
    };

    onChangeT = e => {
        this.logState();
        this.setState({ type: e.target.value });
        this.logState();

        // Add a box to create multiple choice
    };

    // Use this function to debug. Uncomment the console.log below
    logState = () => {
        // console.log(this.state);
    };

    render() {
        return (
            <div onLoad={this.onLoad}>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <h2>Add Question</h2>
                        <div className="addQuestion" style={margin}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="surveyQuestion">
                                    <Form.Label>
                                        <h3>What would you like to ask?</h3>
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter new question for survey"
                                        onChange={this.onChangeQ}
                                        value={this.state.title}
                                    />
                                </Form.Group>

                                <Form.Group controlId="responseType">
                                    <Form.Label>
                                        <h3>Select response type</h3>
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={this.onChangeT}
                                        value={this.state.type}
                                    >
                                        <option>Select</option>
                                        {this.options.map(o => {
                                            return <option>{o}</option>;
                                        })}
                                    </Form.Control>
                                </Form.Group>

                                <Button
                                    variant="success"
                                    style={margin}
                                    type="submit"
                                >
                                    Add
                                </Button>
                                <Button
                                    variant="warning"
                                    style={margin}
                                    type="reset"
                                    onClick={this.props.clearSurvey.bind(this)}
                                >
                                    Clear
                                </Button>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

const margin = {
    marginTop: "1em",
    marginRight: "1em"
};

export default withStyles(styles)(QuestionCard);
