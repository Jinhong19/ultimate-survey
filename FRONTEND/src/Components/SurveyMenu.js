import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class SurveyMenu extends React.Component {
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
                                <TableCell>survey id</TableCell>
                                <TableCell align="right">Owner</TableCell>
                                <TableCell align="right">Assigned</TableCell>
                                <TableCell align="right">Due</TableCell>
                                <TableCell align="right">Completed</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default SurveyMenu;
