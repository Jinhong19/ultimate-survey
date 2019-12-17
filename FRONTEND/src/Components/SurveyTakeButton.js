import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/core/styles";

const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #27AE60 30%, #27AE60 90%)",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "green",
    height: 48,
    padding: "0 30px",
    size: "small"
});
let newColor = "white";
class SurveyTakeButton extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.over);
        this.state = {
            surveyid: this.props,
            over: this.props.over
        };
    }

    componentDidMount() {
        // console.log(this.props.location.surveyid);
        let temp = {};
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data));
                let surveys = JSON.parse(data);

                for (let i = 0; i < surveys.length; i++) {
                    if (surveys[i]._id.$oid === this.props.surveyid) {
                        this.setState({
                            surveyid: this.props.surveyid
                        });
                        temp = surveys[i].survey;
                        break;
                    }
                }

                // this.setState({ surveys: JSON.parse(data) });
                this.setState({
                    title: temp.title,
                    questions: temp.survey,
                    deadline: temp.deadline
                });

                console.log(this.state);
            });
        this.forceUpdate();
    }

    render() {
        if (this.state.over == true) {
            newColor = "#C0392B";
        } else {
            newColor = "#27AE60";
        }
        return (
            <div className="text-center" style={marginBtn}>
                <Link
                    to={{
                        pathname: "/TakeSurvey",
                        surveyid: this.state.surveyid,
                        questions: this.state.questions,
                        title: this.state.title
                    }}
                >
                    <MyButton background={{ color: newColor }}>Take</MyButton>
                </Link>
            </div>
        );
    }
}

const marginBtn = {
    marginTop: "1em"
};

export default SurveyTakeButton;
