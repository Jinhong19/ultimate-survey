import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";
class ManagerBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            rows:[]
        }
    }
    componentDidMount() {
        console.log("hello")
        fetch("https://ultimate-survey.herokuapp.com/survey/manager", 
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
        for(let i = 0; i < this.state.surveys.length; i++){
            this.state.rows.push(this.state.surveys[i]._id.$oid)
        }
        console.log(this.state.rows);
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
                                <TableCell>Survey Name</TableCell>
                                <TableCell>Analytics</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(id => (
                                <TableRow>
                                    <TableCell>{id}</TableCell>  
                                    <TableCell align = "left"> <Button>Analytics</Button></TableCell>
                                    <TableCell> <Button> Delete </Button></TableCell>      
                                </TableRow>
                            ))} 
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}
export default ManagerBoard;