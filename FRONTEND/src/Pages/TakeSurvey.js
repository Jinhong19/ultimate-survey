// Components
import React, { Component } from "react";
import Nav from "../Components/Nav";
import SurveyRender from "../Components/SurveyRender/SurveyRender";
import { Container } from "react-bootstrap";

// CSS
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

class TakeSurvey extends Component {
    state = {
        surveyid: "nothing",
        survey: {},
        questions: []
    };

    // resp = `{"title":"Testing for display","deadline":"2020-01-23T22:10:49.000Z","survey":[{"question":"Quest 1","type":"Yes or No","id":1575583872241},{"question":"Q2","type":"Short Answer","id":1575583876816},{"question":"Q Three","type":"Long Answer","id":1575583886517}]}`;

    // state = JSON.parse(`{"title":"Test Survey with Multi Choiceed Survey","deadline":"2019-12-07T23:44:39.505Z","survey":[{"question":"A","type":"Yes or No","options":[],"id":1575762659532},{"question":"B","type":"Multiple Choice","options":["P","Q","R","S"],"id":1575762671660},{"question":"C","type":"Short Answer","options":[],"id":1575762677273},{"question":"D","type":"Long Answer","options":[],"id":1575762681537}]}`);

    onValueChanged(result) {
        console.log("value changed!");
    }

    onComplete(result) {
        console.log("Complete! " + result);
    }

    onLoad = () => {
        console.log("Hello");
        console.log(this.state);
    };

    componentDidMount() {
        console.log(this.props.location.surveyid);
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(JSON.parse(data));
                let surveys = JSON.parse(data);
                for (let i = 0; i < surveys.length; i++) {
                    if (surveys[i]._id.$oid === this.props.location.surveyid) {
                        this.setState({
                            survey: surveys[i],
                            questions: surveys[i].survey.survey
                        });
                        break;
                    }
                }

                // this.setState({ surveys: JSON.parse(data) });
                console.log(this.state.questions);
            });
    }

    render() {
        /*
            Ideally, after clicking on Survey ID, make GET req to the backend with the ID and it should return something like this-

            {"title":"Testing for display","deadline":"2020-01-23T22:10:49.000Z","survey":[{"question":"Quest 1","type":"Yes or No","id":1575583872241},{"question":"Q2","type":"Short Answer","id":1575583876816},{"question":"Q Three","type":"Long Answer","id":1575583886517}]}

            Which contains the entire information about the survey.

            Simply, parse the survey and then pass in the info to Survey Render

        */
        return (
            <div className="App" onLoad={this.onLoad}>
                <Nav words="Survey Taker" />
                <div className="App-header">
                    <Container style={cardStyle}>
                        <SurveyRender
                            title={this.state.title}
                            survey={this.state.survey}
                        />
                    </Container>
                </div>
            </div>
        );
    }
}

const cardStyle = {
    display: "block",
    maxWidth: "55em",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "1em"
};

export default TakeSurvey;
