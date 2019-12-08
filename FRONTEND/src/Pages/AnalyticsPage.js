import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Background from "../Media/back.jpeg";
import Chart from "chart.js"; 


const styles = theme => ({

    background: {
        backgroundImage: "url(" + Background + ")",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    },
    container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
});

class AnlyticsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            responses:[],
            data:[],
            fetchh: "https://ultimate-survey.herokuapp.com/responses/5de94fb92f7f59f86c81530f",
            questionObjects:[],
            questions:[]
        }
    }

    componentDidMount() {
        this.state.fetchh = "https://ultimate-survey.herokuapp.com/responses/" + this.props.location.state.survey._id.$oid;
        console.log(this.props.location.state.survey);
        fetch(this.state.fetchh, 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(responses => responses.json())
        .then(data => {
            this.setState({responses: JSON.parse(data)})
            console.log(this.state)
        }); 
    }

    render() {
        const allQuestions = [];

        //turn this.state.questions into this.props.questions 
        this.state.questions = this.props.location.state.survey.survey;
        for (let i = 0; i < this.state.questions.length; i++){
            var quest = {
                question: this.state.questions[i].question,
                type: this.state.questions[i].type,
                responses: []
            }
            for (let j = 0; j < this.state.responses.length; j++){
                quest.responses.push(this.state.responses[j].body[i]);
            }
            allQuestions.push(quest);
        }
        this.state.questionObjects = allQuestions;
        console.log(this.state.questionObjects);

        return (
            <div className={this.props.classes.background}>
                <div className={this.props.classes.container}>
                    hello
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AnlyticsPage);