import React, {Component} from "react";
import DashboardComponent from "../Components/DashboardComponent";

class EmployeeDisplaySurvey extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			surveys: [],
			pastDate: false
		};
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

	getSurveys=()=>{
		for(let i=0; i<=this.state.surveys.length; i++){
			console.log("in for loop");
			<DashboardComponent component = {this.state.surveys, i, this.state.pastDate}></DashboardComponent>
		} 
		console.log("existed for loop"); 
	}
	render(){
		return(
			<div>
				{this.getSurveys()}
			</div>
		);
	}
}

export default EmployeeDisplaySurvey; 