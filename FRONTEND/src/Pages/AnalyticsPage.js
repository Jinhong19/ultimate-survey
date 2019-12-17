import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Background from "../Media/back.jpeg";
import AnalyticsCard from "../Components/BarChart";

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
            fetchedRes: [],
            questsWithResponses: []
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
            }); 
        
    }

    render() {
        //turn this.state.questions into this.props.questions 
        const survey = this.props.location.state.survey;
        console.log(survey)
        const questions = survey.survey.survey || survey.survey;
        //turn this.state.questions into this.props.questions 
        const questionsWithResponses = [];

        console.log(questions)

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
        this.setState({questsWithResponses: questionsWithResponses});
        console.log(this.state.questsWithResponses);

        return (
            <div className={this.props.classes.background}>
                <div className={this.props.classes.container}>
                    {this.state.questsWithResponses.map(questionWithResponses =>
                        <AnalyticsCard questionWithResponse={questionWithResponses}></AnalyticsCard>
                    )}
                    
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AnlyticsPage);