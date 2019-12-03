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
        this.state = {surveyID: "ERROR", user: null};
        this.getSurvey = this.getSurvey.bind(this);
    }

    componentDidMount(){
        if(this.props.location.state !== undefined) {
            let eData = null;
            let receivedSurvey = this.props.location.state.surveyID;

            fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
            {method:'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'})
            .then(response => response.json())
            .then(data => eData);

            console.log(eData);

            this.setState({
                surveyID: receivedSurvey,
                user: eData
            });
        }
    }

    getSurvey(){
        let eData;

        fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(response => response.json())
        .then(data => eData);

        this.setState({
            user: eData
        });
    }

    printSurvey = () => {
        console.log(this.state.user);
    }

    render() {
        return(
            <div className={this.props.classes.root}>
                <h1>Survey {this.state.surveyID}</h1>
                <button onClick={this.printSurvey}>User info</button>
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