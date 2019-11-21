import React, { Component } from "react";
import QuestionCard from "../Components/QuestionCard";
import SurveyTitle from "../Components/SurveyTitle";
import SurveyState from "../Components/SurveyState";
import SurveyCreateButton from "../Components/SurveyCreateButton";

export class Survey extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        survey: []
    };

    addItem = o => {
        const newSurvey = {
            question: o.title,
            type: o.type,
            id: Date.now()
        };
        this.setState({ survey: [...this.state.survey, newSurvey] });
        console.log(this.state);
        // axios.post('https://jsonplaceholder.typicode.com/todos', {
        //   title: title,
        //   completed: false
        // })
        //   .then(res => this.setState({
        //     todos: [...this.state.todos, res.data]
        //   }));
    };

    removeItem = id => {
        this.setState({
            survey: [...this.state.survey.filter(s => s.id !== id)]
        });
    };

    clearSurvey = () => {
        this.setState({
            survey: []
        });
    };

    handleInput = e => {
        console.log("Hello Input");
    };

    render() {
        return (
            <div style={margin}>
                <SurveyTitle />
                <QuestionCard
                    addItem={this.addItem}
                    clearSurvey={this.clearSurvey}
                />
                <SurveyState
                    items={this.state.survey}
                    removeItem={this.removeItem}
                />
            </div>
        );
    }
}

const margin = {
    marginBottom: "2em"
};

export default Survey;
