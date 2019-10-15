import React, { Component } from 'react';
import '../App.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';

// Creates the website theme
const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#FFFFFF'
      }
    },
  });
  
  // Styles the login cards
  const useStyles = makeStyles({
    card: {
      width: 500,
      maxHeight: 350,
    },
  });
  
  class LoginCard extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <Grid item>
          <Card className={this.props.style}>
            <CardContent>
              <Typography align="center" component='h4' variant='h4'>{this.props.user}</Typography>
              <Divider />
              <Typography align="center" component="p" variant="p" class="text">Click Login to be directed to the {this.props.user} login page.</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" fullWidth="true" href={this.props.redir}><Typography color="secondary">Login</Typography></Button>
            </CardActions>
          </Card>
        </Grid>
      );
    }
  }
  
  function App() {
    const classes = useStyles();
    return (
      <div>
        <ThemeProvider theme={theme}>
          <AppBar color="primary" position="static">
            <Typography align="center" variant="h3" color="secondary" id="title">Ultimate Survey</Typography>
          </AppBar>
          <img class="logo" src={require("./logo.png")} alt="company logo" />
          <Typography class="text">Please login to access your survey software.</Typography>
          <Grid container spacing={9} justify="center">
            <LoginCard user="Manager" style={classes.card} redir="/managerpage" />
            <LoginCard user="Employee" style={classes.card} redir="/employeepage"/>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
  
  export default App;