import React, { Component } from 'react';
import { withStyles, Typography, AppBar } from '@material-ui/core';
import LoginCard from '../Components/LoginCard';
import Background from '../Media/back.jpeg';

const styles = theme => ({
  logo: {
    display: 'block',
    width: '20em',
    height: '9em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '3em',
  },
  background: {
    backgroundImage: 'url(' + Background + ')',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
});

class LandingPage extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className={this.props.classes.background}>
        <AppBar color="primary" position="static">
          <Typography align="center" variant="h3" color="secondary" style={{padding: '0.6em'}}>Ultimate Survey</Typography>
        </AppBar>
        <img className={this.props.classes.logo} src={require("../Media/logo.png")} alt="company logo" />
        <LoginCard user="Login" />
        <Typography align='center' variant='h4'>For development: <a href='/ManagerDashboard'>Manager</a>|<a href='/EmployeeDashboard'>Employee</a></Typography>
      </div>
    );
  }
}

export default withStyles(styles)(LandingPage);
