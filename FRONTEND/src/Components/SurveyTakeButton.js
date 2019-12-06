import React, { Component } from "react";
import { Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class SurveyTakeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyid: this.props.surveyid
        };
    }

    render() {
        return (
            <div className="text-center" style={marginBtn}>
            <Link to={{pathname: '/TakeSurvey', surveyid: this.state.surveyid}}>
                <Button size = "small">
                    Take
                </Button>
            </Link>
            </div>
        );
    }
}

const marginBtn = {
    marginTop: "1em"
};

export default SurveyTakeButton;
