import React from "react";
import { Redirect } from 'react-router-dom'

import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Typography,
    Divider
} from "@material-ui/core";
import axios from "axios";
const styles = theme => ({
    title: {
        marginBottom: "0.5em"
    },
    text: {
        margin: "1em",
        marginTop: "2em",
        marginBottom: "0em"
    },
    card: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        minHeight: "21em",
        width: "40em",
        textAlign: "center"
    },
    entry: {
        marginTop: "0.7em"
    },
    password: {
        marginLeft: "auto",
        marginRight: "auto"
    }
});

class LoginCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            bad: false
        };
        this.userRef = React.createRef();
        this.handleChange_password = this.handleChange_password.bind(this);
        this.handleChange_username = this.handleChange_username.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.badLogin = this.badLogin.bind(this);
    }

    handleChange_username(event) {
        this.setState({ username: event.target.value });
    }

    handleChange_password(event) {
        this.setState({ password: event.target.value });
    }

    handleKeypress(event) {
        if(event.charCode === 13) {
            this.handleSubmit();
        }
    }

    badLogin() {
        this.setState({
            bad: true,
            username: "",
            password: ""
        });
        this.userRef.current.focus();
    }

    handleSubmit(event) {
        if(event !== undefined){
            event.preventDefault();
        }
        
        console.log(this.state)
        fetch("https://ultimate-survey.herokuapp.com/login", 
            {method:'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(this.state),
             credentials: 'include'})
            .then(response => response.json())
            .then(data => {
                const loggedIn = data.message === "success";
                this.setState({loggedIn: loggedIn});
            });

            if(this.state.loggedIn === false) {
                this.badLogin();
            }
    }

    render() {
        return (
            this.state.loggedIn ?
            <Redirect to={{
                    pathname:"/Dashboard",
                }}
            />
            :
            <Card className={this.props.classes.card}>
                <CardContent>
                    <Typography align="center" component="h4" variant="h4" className={this.props.classes.title}>
                        Login
                    </Typography>
                    <Divider />
                    <Typography
                        className={this.props.classes.text}
                        align="center"
                        component="p"
                    >
                        Please login to be directed to your survey center.
                    </Typography>
                    <TextField
                        className={this.props.classes.entry}
                        label="Username"
                        value={this.state.username}
                        fullWidth={true}
                        error={this.state.bad}
                        inputRef={this.userRef}
                        autoFocus
                        onChange={this.handleChange_username}
                        onKeyPress={this.handleKeypress}
                    />
                    <TextField
                        className={this.props.classes.entry}
                        label="Password"
                        type="password"
                        value={this.state.password}
                        fullWidth={true}
                        error={this.state.bad}
                        onChange={this.handleChange_password}
                        onKeyPress={this.handleKeypress}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={this.handleSubmit}
                    >
                        <Typography color="secondary">Login</Typography>
                    </Button>
                </CardActions>
                <CardActions>
                    <Button
                        className={this.props.classes.password}
                        size="small"
                        href="/forgot"
                    >
                        Forgot password
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(LoginCard);
