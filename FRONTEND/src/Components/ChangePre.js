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

class ChangePre extends Component {
    render() {
        return (
            <div>
                <CardContent>
                    <Typography className={this.props.classes.text} variant="p" color='error'>
                    * indicates required field 
                    </Typography>
                    <TextField                        
                        required
                        className={this.props.classes.entry}
                        name="username"
                        label="Username"
                        placeholder="Please enter your email"
                        fullWidth="true"
                        error={this.props.invalid}
                        onChange={this.props.onUpdateUsername}
                    />
                    <TextField                        
                        required
                        className={this.props.classes.entry}
                        name="password"
                        label="Current Password"
                        placeholder="Please enter your current password"
                        fullWidth="true"
                        error={this.props.invalid}
                        onChange={this.props.onUpdatePassword}
                    />
                    <TextField
                        required
                        className={this.props.classes.entry}
                        name="newPassword1"
                        label="New Password"
                        placeholder="Please enter the new password"
                        fullWidth="true"
                        error={this.props.invalid}
                        onChange={this.props.onUpdatePassword1}
                    />
                    <TextField
                        required
                        className={this.props.classes.entry}
                        name="newPassword2"
                        label="Conform New Password"
                        placeholder="Conform your new password"
                        fullWidth="true"
                        error={this.props.invalid}
                        onChange={this.props.onUpdatePassword2}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        className={this.props.classes.submit}
                        variant="contained"
                        color="primary"
                        //fullWidth="false"
                        size="lg"
                        onClick={this.props.ChangeP}
                        href="#"
                    >
                        Change
                    </Button>
                    <div style={{ display: "flex"}, { marginLeft: "auto" }}>
                        <Button
                            variant="contained"
                            size="lg" 
                            href="?"
                            //onclick={window.location.reload(true)}
                        >
                            Clear
                        </Button>
                    </div>
                    <div style={{display: 'flex'}, { marginLeft: "auto" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="lg"
                            href="./Dashboard"
                        >
                            Cancel
                        </Button>
                    </div>
                </CardActions>
            </div>
        );
    }
}
export default withStyles(styles)(ChangePre);