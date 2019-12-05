// Components
import React, { Component } from "react";
import Nav from "../Components/Nav";
import SurveyRender from "../Components/SurveyRender";
import { Container } from "react-bootstrap"

// CSS
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

class TakeSurvey extends Component {

    state = {

    }

    // resp = `{"title":"Testing for display","deadline":"2020-01-23T22:10:49.000Z","survey":[{"question":"Quest 1","type":"Yes or No","id":1575583872241},{"question":"Q2","type":"Short Answer","id":1575583876816},{"question":"Q Three","type":"Long Answer","id":1575583886517}]}`;

    state = JSON.parse(`{"title":"Testing for display","deadline":"2020-01-23T22:10:49.000Z","survey":[{"question":"Quest 1","type":"Yes or No","id":1575583872241},{"question":"Q2","type":"Short Answer","id":1575583876816},{"question":"Q Three","type":"Long Answer","id":1575583886517}]}`);

    render() {

        /*
            Ideally, after clicking on Survey ID, make GET req to the backend with the ID and it should return something like this-

            {"title":"Testing for display","deadline":"2020-01-23T22:10:49.000Z","survey":[{"question":"Quest 1","type":"Yes or No","id":1575583872241},{"question":"Q2","type":"Short Answer","id":1575583876816},{"question":"Q Three","type":"Long Answer","id":1575583886517}]}

            Which contains the entire information about the survey.

            Simply, parse the survey and then pass in the info to Survey Render

        */

        
        
        return (
            <div className="App">
                <Nav words="Survey Taker" />
                <div className="App-header">
                    <Container style={cardStyle}>
                        <SurveyRender title={this.state.title} survey={this.state.survey} />
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
}

export default TakeSurvey;