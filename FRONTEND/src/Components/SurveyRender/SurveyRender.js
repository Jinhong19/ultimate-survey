import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import QuestionList from "./QuestionList";
import { Card, CardContent } from "@material-ui/core";

export class SurveyState extends Component {
    state = {
        title: this.props.title,
        items: this.props.survey
    };

    submitResponse = r => {
        console.log(r);
    };

    render() {
        return (
            <div style={margin}>
                <Card>
                    <CardContent>
                        <h3>{this.state.title}</h3>
                    </CardContent>
                </Card>
                <Form style={formStyle} onSubmit={this.submitResponse}>
                    <QuestionList items={this.state.items} />
                    <div className="text-center">
                        <Button variant="success" style={marginBtn}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const margin = {
    marginTop: "4em"
};

const marginBtn = {
    marginTop: "1em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default SurveyState;
