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
        });
    }
    
    

    render() {
        if(this.state.surveys.length==0){
            this.state.rows = [];
        }
        else{
            var date = new Date();
            for(let i=0; i<this.state.surveys.length; i++){
                this.state.rows[i]=createData("Survey", this.state.surveys[i].manager.$oid, "12/8/2019", date.toLocaleDateString().localeCompare("12/8/2019") <= 0, this.state.surveys[i]._id.$oid);
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
                                    <TableCell align = "left"><SurveyTakeButton button = {row.id, row.completed}/></TableCell>
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