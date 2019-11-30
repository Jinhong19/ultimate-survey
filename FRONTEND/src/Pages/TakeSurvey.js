import React from 'react';
import Link from 'react-router-dom/Link';
import { Button } from 'react-bootstrap';

class TakeSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {surveyID: "0000", surveyName: ""};
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount = () => {
        if(this.props.location.state === undefined){
            this.updateState("BAD");
        }
        else {
            let receivedID = this.props.location.state.surveyID;
            this.updateState(receivedID);
        }
    }

    updateState(prevState) {
        this.setState({
            surveyID: prevState,
            surveyName: "Survey " + prevState // for testing
        });
    }

    render() {
        if(this.state.surveyID === "BAD"){  // This should only trigger if user types in the URL rather than picking a survey
            return(
                <div style={{textAlign: "center"}}>
                    <h1>ERROR: PLEASE PICK A SURVEY</h1>
                    <a href="/dashboard">Back to dashboard</a>
                </div>
            );
        }
        return(
            <div style={{textAlign: "center"}}>
                <Link to={{pathname: "/dashboard", state: {submit: false}}}>Back to Dashboard</Link>
                <h1>{this.state.surveyName}</h1>
                <Link to={{pathname: "/dashboard", state: {submit: true}}}>Submit</Link>
            </div>
        );
    }
}

export default TakeSurvey;

TakeSurvey.defaultProps = {
    surveyName: "ERROR LOADING SURVEY"
}