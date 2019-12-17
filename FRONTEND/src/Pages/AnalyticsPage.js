import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Background from "../Media/back.jpeg";
import AnalyticsCard from "../Components/AnalyticsCard";

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
            fetchedRes: []
        }
    }

    componentDidMount() {
        const _id = this.props.location.state.survey._id;
        const fetchURL = "https://ultimate-survey.herokuapp.com/responses/" + _id.$oid;
        fetch(fetchURL, 
            {method:'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'})
            .then(responses => responses.json())
            .then(data => {
                this.setState({
                    fetchedRes: JSON.parse(data)
                })
                console.log(this.state.fetchedRes);
            });
        
    }

    render() {
        //turn this.state.questions into this.props.questions 
        const survey = this.props.location.state.survey;
        console.log(survey)
        const questions = survey.survey.survey || survey.survey;
        //turn this.state.questions into this.props.questions 
        const questionsWithResponses = [];
        console.log(this.state.fetchedRes);

        for (let i = 0; i < questions.length; i++){
            var quest = {
                question: questions[i].question,
                type: questions[i].type,
                options: questions[i].options,
                responses: []
            }
            for (let j = 0; j < this.state.fetchedRes.length; j++){
                quest.responses.push(this.state.fetchedRes[j].body[i]);
            }
            questionsWithResponses.push(quest);
        }
        console.log(questionsWithResponses);

        return (
            <div className={this.props.classes.background}>
                <div className={this.props.classes.container}>
                    {questionsWithResponses.map(questionWithResponse =>
                        <AnalyticsCard questionWithResponses={questionWithResponse}>questionWithResponse.responses</AnalyticsCard>
                    )}
                    
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AnlyticsPage);