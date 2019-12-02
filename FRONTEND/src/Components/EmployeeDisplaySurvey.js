import React, {Component} from "react";
import {TableCell, TableRow} from '@material-ui/core';
import Survey from '../Components/Survey';
import SurveyMenu from '../Components/SurveyMenu';
import SurveyTakeButton from '../Components/SurveyTakeButton';

class EmployeeDisplaySurvey extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			surveys: [],
			pastDate: false
		};
		this.displaySurvey = this.displaySurvey.bind(this);
		this.numSurveys=0;
		this.count=0;
	}

	displaySurvey = (survey) =>{
		<div>
			<TableRow>
				<TableCell align="right">survey.Manager</TableCell>
				<TableCell align = "right">survey.exDate</TableCell>
				<TableCell align = "right">this.state.pastDate</TableCell>
			</TableRow>
			<SurveyTakeButton button= {{json: survey}}></SurveyTakeButton>
		</div>
	}
	componentDidMount(){
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
		if(this.state.survey != undefined){
			var numSurveys = this.state.survey.length;
			var count = 0;
		}
		else{
			var numSurveys = 0;
			var count = 0;
		}
		return(
			getSurveys=>{
				while(numSurveys > count) {
					<div>
						displaySurvey(this.state.surveys[count]);
					</div>
				}
			}	
		);
	}
}

export default EmployeeDisplaySurvey; 