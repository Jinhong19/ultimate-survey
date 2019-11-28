import React from 'react';
import { Button } from 'react-bootstrap';

class TakeSurvey extends React.Component {
    constructor(props){
        super(props);
        this.state = {surveyID: "0000"};
        this.updateState = this.updateState.bind(this);
    }

    componentDidMount = () => {
        let receivedID = this.props.location.state.surveyID;
        this.updateState(receivedID);
    }

    updateState(prevState) {
        this.setState({
            surveyID: prevState
        });
    }

    render() {
        return(
            <div style={{textAlign: "center"}}>
                <Button style={{float: "left", margin: "0.7em", marginTop: "0em"}} href="/dashboard">Back to dashboard</Button>
                <h1>{this.props.surveyName}</h1>
                <p>The survey you clicked: {this.state.surveyID}</p>
                <Button>Submit</Button>
            </div>
        );
    }
}

export default TakeSurvey;

TakeSurvey.defaultProps = {
    surveyName: "ERROR LOADING SURVEY"
  }