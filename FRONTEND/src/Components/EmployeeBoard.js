import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SurveyTakeButton from "../Components/SurveyTakeButton";
import TableBody from "@material-ui/core/TableBody";
const createButton = (id) => {
    return <div><SurveyTakeButton>{id}</SurveyTakeButton></div>
}
const createData = (name, owner, due, completed, id) => {
    return { name, owner, due, completed, id}
  }
class EmployeeBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            rows: []
        }
    }
    
    componentDidMount() {
        console.log("hello")
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", 
        {method:'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'})
        .then(response => response.json())
        .then(data => {
            this.setState({surveys: JSON.parse(data)})
            console.log(this.state)
        });
    }
    

    render() {
        console.log(this.state.surveys);
        if(this.state.surveys.length==0){
            this.state.rows = [];
        }
        else{
            for(let i=0; i<this.state.surveys.length; i++){
                this.state.rows[i]=createData("Survey", this.state.surveys[i].manager.$oid, "12/10/19", true, this.state.surveys[i]._id.$oid);
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
                                <TableCell>Name</TableCell>
                                <TableCell>Owner</TableCell>
                                <TableCell>Due</TableCell>
                                <TableCell>Completed</TableCell> 
                                <TableCell>Take</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow>
                                    <TableCell align = "left">{row.name}</TableCell>
                                    <TableCell align="left">{row.owner}</TableCell>
                                    <TableCell align="left">{row.due}</TableCell>
                                    <TableCell align="left">{row.completed.toString()}</TableCell>
                                    <TableCell align = "left"><SurveyTakeButton>{row.id}</SurveyTakeButton></TableCell>
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