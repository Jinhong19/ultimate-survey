import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SurveyTakeButton from "../Components/SurveyTakeButton";
import TableBody from "@material-ui/core/TableBody";
const createData = (name, owner, due, completed, id) => {
    return { name, owner, due, completed, id };
};
let surveyid = "";
let over = true;
class EmployeeBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            surveys: [],
            rows: []
        };
    }

    componentDidMount() {
        fetch("https://ultimate-survey.herokuapp.com/survey/employee", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ surveys: JSON.parse(data) });
            });
    }

    render() {
        if (this.state.surveys.length == 0) {
            this.state.rows = [];
        } else {
            var curDate = new Date();
            for (let i = 0; i < this.state.surveys.length; i++) {
                const { survey, manager_name } = this.state.surveys[i];
                const deadline = new Date(survey.deadline);
                this.state.rows[i] = createData(
                    survey.title || "Survey",
                    manager_name || this.state.surveys[i].manager.$oid,
                    survey.deadline
                        ? curDate.getTime() <= deadline.getTime()
                            ? deadline.toDateString()
                            : "Survey Over"
                        : "no date",
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
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Owner</TableCell>
                                <TableCell align="center">Due</TableCell>
                                <TableCell align="center">Take</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map(row => (
                                <TableRow>
                                    <TableCell align="left">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.owner}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.due}
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.completed.toString()}
                                    </TableCell>
                                    <TableCell align="left">
                                        <SurveyTakeButton surveyid={row.id}>
                                            {
                                                ({ surveyid: row.id },
                                                { over: row.completed })
                                            }
                                        </SurveyTakeButton>
                                    </TableCell>
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
