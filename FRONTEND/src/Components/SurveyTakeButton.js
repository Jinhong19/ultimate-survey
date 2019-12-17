import React, { Component } from "react";
import { Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {styled} from '@material-ui/core/styles';
import {red, green} from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: red,
    },
  });

  let newColor="primary";
class SurveyTakeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveyid: this.props.surveyid,
            over: this.props.over
        };
    }

    render() {
        if(this.state.over){
            newColor="secondary";
            console.log(newColor);
        }
        else{
            newColor="primary";
        }
        return (
            <div className="text-center">
            <Link to={{pathname: '/TakeSurvey', surveyid: this.state.surveyid}}>
                <MuiThemeProvider theme = {theme}>
                <Button color = {newColor}>
                    Take
                </Button>
                </MuiThemeProvider>
                
            </Link>
            </div>
        );
    }
}

const marginBtn = {
    marginTop: "1em"
};

export default SurveyTakeButton;
