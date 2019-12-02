import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import '../App.css';
import SurveyTakeButton from '../Components/SurveyTakeButton';
import Nav from './Nav';
import


class DashboardComponent extends React.Component{
	constructor(props){
		super(props);
	// 	state: {
	// 		userid: this.props.userid,
	// 		surveyid: this.props.surveyid
	// 	};
	}

	render(){
		return(
			<div className="App">
      		<Nav words="Employee" />
      		<h1>Hello, employees!</h1>
      		<h3>Surveys</h3>
      		<SurveyMenu/>
          <EmployeeDisplaySurvey/>
    </div>
		);
	}
}

const marginBtn = {
    marginTop: "1em"
};

export default DashboardComponent;
