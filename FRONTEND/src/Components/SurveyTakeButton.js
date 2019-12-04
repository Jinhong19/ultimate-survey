import React, { Component } from "react";
import { Button} from "react-bootstrap";
import {Link} from "react-router-dom";

class SurveyTakeButton extends React.Component {
    constructor(props) {
        super(props);
        state: {
            json: this.props.json
        }
    }

    render() {
        return (
            <div className="text-center" style={marginBtn}>
            <Link to={{pathname: '/TakeSurvey', json: this.props.json}}>
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
