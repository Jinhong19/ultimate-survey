import React from "react";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import { Link } from "react-router-dom";
import DeleteButton from "./SurveyDeleteButton"
import { withStyles, Typography } from "@material-ui/core";
class ManagerBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      surveys: [],
      res: []
    };
  }
  componentDidMount() {
    fetch("https://ultimate-survey.herokuapp.com/survey/manager", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        const newSurveys = JSON.parse(data);
        this.getCompletion(newSurveys);
        this.setState({ surveys: newSurveys });
      });
  }

  getCompletion(surveys) {
    surveys.map(survey => {
      const fetchURL =
        "https://ultimate-survey.herokuapp.com/responses/" + survey._id.$oid;
      fetch(fetchURL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      })
        .then(responses => responses.json())
        .then(data => {
          const resNum = JSON.parse(data).length;
          const newItem = { id: survey._id.$oid, resNum: resNum };
          this.setState(prevState => {
            const newRes = prevState.res;
            newRes.push(newItem);
            return { res: newRes };
          });
        });
    });
  }

  handleDelete = id => {
    // delete survey
    fetch("https://ultimate-survey.herokuapp.com/survey/manager", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        survey_id: id
      }),
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => console.log(data));

    // rerender board
    fetch("https://ultimate-survey.herokuapp.com/survey/manager", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ surveys: JSON.parse(data) });
        // console.log('all surveys in state')
        // console.log(this.state.surveys)
      });
  };

  getCompletionData = id => {
    const res = this.state.res;
    const tupleWithRightId = res.find((tuple) => tuple.id === id);
    const resNum = tupleWithRightId
        ? tupleWithRightId.resNum
        : 0
    return resNum
  };

  render() {
    return (
      <div className={"SurveyMenu"}>
        <Paper className={"Survey Menu"}>
          <Table className={"Surveys"} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Survey Name</TableCell>
                <TableCell align="center">Completion</TableCell>
                <TableCell align="center">Deadline</TableCell>
                <TableCell align="center">Analytics</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.surveys.map(survey => (
                <TableRow>
                  {/*console.log(survey)*/}
                  {/* A survey with no title will show its id */}
                  <TableCell align="center">
                    {survey.survey.title || survey._id.$oid}
                  </TableCell>
                  <TableCell align="center">
                    {this.getCompletionData(survey._id.$oid)}
                  </TableCell>
                  <TableCell align="center">
                    {survey.survey.deadline
                      ? (new Date().getTime() <= new Date(survey.survey.deadline).getTime()
                        ? new Date(survey.survey.deadline).toDateString()
                        : "Survey Over")
                      : "no deadline"}
                      
                  </TableCell>
                  <TableCell align="center">
                    {/* 
                        survey: 
                        {_id:{}, survey: {}, manager:{}, manager_name: "", create_date:""}
                    */}
                    <Link
                      to={{
                        pathname: "/AnalyticsPage",
                        state: { survey: survey }
                      }}
                    >
                      Analytics
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <DeleteButton
                      id={survey._id.$oid}
                      handleDelete={this.handleDelete}
                    />
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
export default ManagerBoard;