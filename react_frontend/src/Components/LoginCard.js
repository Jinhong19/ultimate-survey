import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'

const styles = theme => ({
  text: {
    padding: '1em',
    paddingTop: '2em',
    paddingBottom: '0em',
  },
  card: {
    height: '20em',
    width: '40em',
    marginTop: "50px",
  },
  entry: {
    paddingTop: "0.7em",
  },
});

class LoginCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username: "",
        password: "",
        };
        this.handleChange_password = this.handleChange_password.bind(this);
        this.handleChange_username = this.handleChange_username.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange_username(event){
    this.setState({username: event.target.value});
    }

    handleChange_password(event){
    this.setState({password: event.target.value});
    }

    handleSubmit(event){
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    axios.post("http://127.0.0.1:5000/login", this.state)
    //TODO enter console.log can check the value submitted
    .then(res => console.log(res))
    }

//    handleClick(){
//    axios.get("http://127.0.0.1:5000/login")
//    .then(response => this.setState({result: response}))
//    }

    render() {
        return (
            <Grid item>
                <Card className={this.props.classes.card}>
                    <CardContent>
                        <Typography align="center" component="h4" variant="h4">
                            {this.props.user}
                        </Typography>
                        <Divider />
                        <Typography
                            className={this.props.classes.text}
                            align="center"
                            component="p"
                            variant="p"
                        >
                            Please login to be directed to your survey center.
                        </Typography>
                        <TextField
                            className={this.props.classes.entry}
                            label="Username"
                            variant="outlined"
                            fullWidth="true"
                            onChange = {this.handleChange_username}
                        />
                        <TextField
                            className={this.props.classes.entry}
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth="true"
                            onChange = {this.handleChange_password}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth="true"
                            href={this.props.redir}
                            onClick={this.handleSubmit}
                        >
                            <Typography color="secondary">Login</Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

export default withStyles(styles)(LoginCard);
