import React, { Component } from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import LoginCard from '../Components/LoginCard'

// Creates the website theme
const theme = createMuiTheme({
  palette: {
    primary: green, // should be #509e2f
    secondary: {
      main: '#FFFFFF'
    }
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar color="primary" position="static">
          <Typography align="center" variant="h3" color="secondary" id="title">Ultimate Survey</Typography>
        </AppBar>
        <img class="logo" id="landing" src={require("./logo.png")} alt="company logo" />
        <Typography class="text">Please login to access your survey software.</Typography>
        <Grid container spacing={9} justify="center">
          <LoginCard user="Manager" redir="managerdashboard" />
          <LoginCard user="Employee" redir="employeedashboard" />
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
