import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Card, CardContent } from "@material-ui/core";
import StateQuestions from "../SurveyAssets/StateQuestions";
import { Link } from "react-router-dom";

export class SurveyState extends Component {
    state = {
        title: this.props.title,
        items: this.props.survey
    };

    submitResponse = r => {
        console.log(r);
    };

    render() {
        // console.log(this.state.items);

        if (this.state.title === undefined) {
            this.setState({ title: "Error! Missing title" });
        }
        if (this.state.items === undefined) {
            this.setState({ items: [] });
        }

        return (
            <div style={margin}>
                <Card>
                    <CardContent>
                        <h3>{this.state.title}</h3>
                    </CardContent>
                </Card>
                <Form style={formStyle} onSubmit={this.submitResponse}>
                    <StateQuestions
                        items={this.state.items}
                        removeItem={null}
                        edit={false}
                    />
                    <div className="text-center">
                        <Link
                            to={{
                                pathname: "/dashboard",
                                state: { submit: true }
                            }}
                        >
                            <input type="submit" value="Submit" />
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const margin = {
    marginTop: "4em",
    marginBottom: "4em"
};

const marginBtn = {
    marginTop: "1em"
};

const formStyle = {
    // textAlign: "center",
    background: "f5f5f5"
};

export default SurveyState;
