import React, { Component } from "react";
import QuestionCard from "./QuestionCard";
import SurveyTitle from "./SurveyTitle";
import SurveyState from "./SurveyState";
import { Container } from "react-bootstrap";

export class Survey extends Component {
    state = {
        title: "Untitled Survey",
        deadline: new Date(),
        survey: [],
        edit: true
    };

    addItem = o => {
        const newSurvey = {
            question: o.title,
            type: o.type,
            id: Date.now()
        };
        this.setState({ survey: [...this.state.survey, newSurvey] });
        // console.log(this.state);
    };

    removeItem = id => {
        console.log(id);
        this.setState({
            survey: [...this.state.survey.filter(s => s.id !== id)]
        });
    };

    clearSurvey = () => {
        this.setState({
            survey: []
        });
    };

    updateTitle = t => {
        this.setState({
            title: t
        });
    };

    updateDate = date => {
        this.setState({
            deadline: date
        });
    };

    handleInput = e => {
        console.log("Hello Input");
    };

    render() {
        return (
            <Container>
                <div style={margin}>
                    <SurveyTitle
                        title={this.state.title}
                        updateTitle={this.updateTitle}
                        deadline={this.state.deadline}
                        updateDate={this.updateDate}
                    />
                    <QuestionCard
                        addItem={this.addItem}
                        clearSurvey={this.clearSurvey}
                    />
                    <SurveyState
                        title={this.state.title}
                        deadline={this.state.deadline}
                        items={this.state.survey}
                        removeItem={this.removeItem}
                    />
                </div>
            </Container>
        );
    }
}

const margin = {
    marginBottom: "2em"
};

export default Survey;
