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
        }
    }
    componentDidMount() {
        fetch("https://ultimate-survey.herokuapp.com/survey/manager",
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ surveys: JSON.parse(data) })
                // console.log('all surveys in state')
                // console.log(this.state.surveys)
            });
    }
    render() {
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
                            {this.state.surveys.map(survey => (
                                <TableRow>
                                    {/* A survey with no title will show its id */}
                                    <TableCell>{survey.survey.title || survey._id.$oid}</TableCell>
                                    <TableCell align="left">
                                        {console.log('each survey')}
                                        {console.log(survey.survey)}
                                        {/* 
                                            survey is {title: surveyTitle, survey: []} when it has title
                                            survey is [] when it has no title
                                        */}
                                        <Link to={{ pathname: '/AnalyticsPage', survey: survey.survey }}>
                                                Analytics
                                        </Link>
                                    </TableCell>
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