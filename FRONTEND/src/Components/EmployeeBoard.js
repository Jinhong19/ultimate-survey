import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withStyles, Typography } from "@material-ui/core";
import { getDynamicStyles } from "jss";
class ManagerBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            surveyIds:[],
            surveyOwners: [],
            surveyDueDates: [],
            surveyOver: []
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
        const surveyIds = []
        const surveyOwners = []
        const surveyDueDates = []
        const surveyOver = []
        var date = new Date()
        for(let i = 0; i < this.state.surveys.length; i++){
            surveyIds.push(this.state.surveys[i]._id.$oid)
            surveyOwners.push(this.state.surveys[i].Manager.$oid)
            surveyDueDates.push(this.state.surveys[i].exDate.$oid)
            if(date.toString().equals(surveyDueDates[i])||date.toString().localeCompare(surveyDueDates[i])>0){
                surveyOver.push(true);
            }
            else{
                surveyOver.push(false);
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
                        {surveyIds.map(id => (
                            <TableHead>
                              <TableRow>
                                    <TableCell align = "right">{id}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        ))}
                        {surveyOwners.map(owner => (
                            <TableHead>
                              <TableRow>
                                    <TableCell align = "right">{owner}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        ))}
                        <TableHead>
                              <TableRow>
                                    <TableCell align = "right">{"12/4/19"}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        {surveyDueDates.map(due => (
                            <TableHead>
                              <TableRow>
                                    <TableCell align = "right">{due}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        ))}
                        {surveyOver.map(over => (
                            <TableHead>
                              <TableRow>
                                    <TableCell align = "right">{over}</TableCell>                        
                                </TableRow>
                            </TableHead>
                        ))}
                        <TableHead>
                              <TableRow>
                                   <SurveyTakeButton/>                        
                                </TableRow>
                            </TableHead>
                    </Table>
                </Paper>
            </div>
        );
    }
}
export default ManagerBoard;