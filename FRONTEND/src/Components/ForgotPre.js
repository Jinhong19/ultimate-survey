import React, { Component } from "react";
import {
    CardContent,
    Typography,
    CardActions,
    Button,
    TextField,
    withStyles
} from "@material-ui/core";

const styles = theme => ({
    text: {
        margin: "1em",
        marginBottom: "0em"
    },
    entry: {
        marginTop: "0.7em"
    },
    submit: {
        color: "white"
    }
});

class ForgotPre extends Component {
    render() {
        return (
            <div>
                <CardContent>
                    <Typography className={this.props.classes.text} variant="p">
                        Enter your email below to reset your password
                    </Typography>
                    <TextField
                        required
                        className={this.props.classes.entry}
                        name="emailInput"
                        label="Email"
                        placeholder="Please enter your email"
                        fullWidth="true"
                        error={this.props.invalid}
                        onChange={this.props.onUpdate}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        className={this.props.classes.submit}
                        variant="contained"
                        color="primary"
                        fullWidth="true"
                        onClick={this.props.sub}
                        href="#"
                    >
                        Submit
                    </Button>
                </CardActions>
            </div>
        );
    }
}

export default withStyles(styles)(ForgotPre);
