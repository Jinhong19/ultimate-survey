import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

class SurveyMenu extends React.Component{
	constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className={'SurveyMenu'}>
      	<Paper className={'Survey Menu'}>
      		<Table className={'Surveys'} size="small" aria-label="a dense table">
      			<TableHead>
      				<TableRow>
      					<TableCell>Name</TableCell>
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