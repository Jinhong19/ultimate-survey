import React from "react";
import { Link } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
    root: {
        textAlign: "center"
    }
});

class TakeSurvey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {surveyName: "ERROR", surveyID: "ERROR", uData: "ERROR"};
        this.findSurvey = this.findSurvey.bind(this);
    }

    componentDidMount(){
        // Get states from other pages
        if(this.props.location.state !== undefined){
            if(this.props.location.state.surveyName !== undefined) {
                let receivedName = this.props.location.state.surveyName;

                this.setState({
                    surveyName: receivedName
                });
            }
            if(this.props.location.state.surveyID !== undefined) {
                let receivedSurvey = this.props.location.state.surveyID;

                this.setState({
                    surveyID: receivedSurvey
                });
            }
        }

        // Fetch user data
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(response => response.json())
        .then(data => this.setState({uData: JSON.parse(data)}));
    }

    findSurvey(){
        if(this.state.surveyID === "ERROR"){
            console.error("Error loading survey");
        }
        else{
            for(let i=0; i < this.state.uData.length; i++){
                if(this.state.uData[i]._id.$oid === this.state.surveyID){
                    console.log("Question 1 id: " + this.state.uData[i].survey[0].id);
                }
            }
        }
    }

    printUInfo = () => {
        console.log(this.state.uData);
    }

    render() {
        return(
            <div className={this.props.classes.root}>
                <h1>Survey {this.state.surveyName}</h1>
                <button onClick={this.printUInfo}>User Info</button>
                <br />
                <button onClick={this.findSurvey}>Survey Info</button>
                <br />
                <Link to={{pathname: "/dashboard", state: {submit: true}}}>
                    <Typography>Submit</Typography>
                </Link>
                <br />
                <Link to={{pathname: "/dashboard", state: {submit: false}}}>
                    <Typography>Back to dashboard</Typography>
                </Link>
            </div>
        );
    }
}

export default withStyles(styles)(TakeSurvey);