import React from "react";
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
            password: ""
        };
        this.handleChange_password = this.handleChange_password.bind(this);
        this.handleChange_username = this.handleChange_username.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange_username(event) {
        this.setState({ username: event.target.value });
    }

    handleChange_password(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const username = this.state.username;
        var sha256crypt = require('sha256crypt');
        const password = sha256crypt.hash(this.state.password, 535000, 'helloworld');
        
        console.log(this.state)
        fetch("http://127.0.0.1:5000/login", 
            {method:'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(this.state),
             credentials: 'include'})
            .then(response => response.json())
            .then(data => console.log(data));

        // TODO - implement redirect to /Dashboard upon {message:'success'} return
        
    }


    render() {
        return (
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
                        fullWidth="true"
                        onChange={this.handleChange_username}
                    />
                    <TextField
                        className={this.props.classes.entry}
                        label="Password"
                        type="password"
                        fullWidth="true"
                        onChange={this.handleChange_password}
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
