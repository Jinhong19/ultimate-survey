import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";
class ManagerBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            surveyIds:[]
        }
    }
    state1 = {
        surveys: [{
            name: "Survey1",
            dueDate: "3/07"
        }, 
        {
            name: "Survey2",
            dueDate: "2/10"
        },
        {
            name: "Survey3",
            dueDate: "5/30"
        }]
    };
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
        const surveyIds = []
        for(let i = 0; i < this.state.surveys.length; i++){
            surveyIds.push(this.state.surveys[i]._id.$oid)
        }
        return (
            <div className={"SurveyMenu"}>
                <Paper className={"Survey Menu"}>
                    <Table
                        className={"Surveys"}
                        size="small"
                        aria-label="a dense table"
                    >
                        {surveyIds.map(id => (
                            <TableHead>
                              <TableRow>
                                    <TableCell>{id}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        ))}
                    </Table>
                </Paper>
            </div>
        );
    }
}
export default ManagerBoard;