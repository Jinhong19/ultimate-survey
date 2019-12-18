import React, { Component } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import SurveyTakeButton from "../Components/SurveyTakeButton";

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: this.props.surveys,
            i: this.props.index,
            pastDate: this.props.pastDate
        };
    }

    render() {
        return (
            <div>
                <TableRow>
                    <TableCell align="right">
                        this.state.surveys[this.state.i].Manager
                    </TableCell>
                    <TableCell align="right">
                        this.state.surveys[this.state.i].exDate
                    </TableCell>
                    <TableCell align="right">this.state.pastDate</TableCell>
                </TableRow>
                <SurveyTakeButton
                    button={{ json: this.state.surveys[this.state.i] }}
                ></SurveyTakeButton>
            </div>
        );
    }
}
export default DashboardComponent;
