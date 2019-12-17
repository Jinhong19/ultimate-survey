import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SurveyTakeButton from "../Components/SurveyTakeButton";
import TableBody from "@material-ui/core/TableBody";
const createData = (name, owner, due, completed, id) => {
    return { name, owner, due, completed, id}
  }
let surveyid = ""
let over  = true
class EmployeeBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            rows: []
        }
    }
    
    componentDidMount() {
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(response => response.json())
        .then(data => {
            this.setState({surveys: JSON.parse(data)})
            // console.log(this.state)
        });
    }
    
    

    render() {
        if(this.state.surveys.length==0){
            this.state.rows = [];
        }
        else{
            var date = new Date();
            for(let i=0; i<this.state.surveys.length; i++){
                const {survey, manager_name} = this.state.surveys[i];
                this.state.rows[i]=createData(
                    survey.title || "Survey", 
                    manager_name || this.state.surveys[i].manager.$oid, 
                    survey.deadline ||"No date", 
                    date.toLocaleDateString().localeCompare("12/8/2019") <= 0, 
                    this.state.surveys[i]._id.$oid
                );
            }
        }
        return (
            <div className={"SurveyMenu"}>
                <Paper className={"Survey Menu"}>
                    <Table
                        className={"Surveys"}
                        size="small"
                        aria-label="a dense table"
                        
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align = "center">Name</TableCell>
                                <TableCell align = "center">Owner</TableCell>
                                <TableCell align = "center">Due</TableCell>
                                <TableCell align = "center">Completed</TableCell> 
                                <TableCell align = "center">Take</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow>
                                    <TableCell align = "center">{row.name}</TableCell>
                                    <TableCell align="center">{row.owner}</TableCell>
                                    <TableCell align="center">{row.due}</TableCell>
                                    <TableCell align="center">{row.completed.toString()}</TableCell>
                                    <TableCell align = "center"><SurveyTakeButton>{{surveyid: row.id}, {over: row.completed}}</SurveyTakeButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}
export default EmployeeBoard;