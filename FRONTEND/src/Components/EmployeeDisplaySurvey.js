import React, {Component} from "react";
import {TableCell, TableRow} from '@material-ui/core';
import Survey from '../Components/Survey';
import SurveyMenu from '../Components/SurveyMenu';
import SurveyTakeButton from '../Components/SurveyTakeButton';

class EmployeeDisplaySurvey extends React.Component{
	constructor(props){
		super(props);
		state: {
			surveys: []
		};
	}

	displaySurvey(survey){
		<TableRow>
		<TableCell align="right">survey.Manager</TableCell>
		<TableCell align = "right">survey.exDate</TableCell>
		if(getDate().toString().localeCompare(survey.exDate)){
			<TableCell align = "right">Yes</TableCell>
		}
		else{
			<TableCell align = "right">No</TableCell>
		}
		<TableRow/>
		<SurveyTakeButton button= {{json: survey}}></SurveyTakeButton>
	}
	componentDidMount() {
		fetch("https://ultimate-survey.herokuapp.com//survey/employee", 
					{
						method: 'get',
						headers: {'Content-Type': 'application/json'},
						credentials: 'include',
					})
		.then(response => response.json())
		.then(data => <div>this.setState({this.state.surveys.push(data)})</div>);
	}
	

	render(){
		const numSurveys=this.state.surveys.length;
				let count=0;
				while(count<numSurveys){
					displaySurvey(this.state.surveys[count]);
				}
		return(
			<div>
				<h3>Your surveys</h3>
				<SurveyMenu></SurveyMenu>
			</div>
		);
	}
}

export default EmployeeDisplaySurvey;