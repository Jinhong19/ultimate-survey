import React, { Component } from "react";
import {
    withStyles,
    Button,
    Card,
    CardHeader,
    CardActions
} from "@material-ui/core";
import ChangePre from "./ChangePre.js";
import ChangePost from "./ChangePost.js";

const styles = theme => ({
    container: {
        margin: "1rem",
        height: "100%",
        width: "100%"
    },
    card: {
        display: "block",
        margin: "auto",
        width: "40em",
        textAlign: "center"
    },
    back: {
        marginLeft: "auto",
        marginRight: "auto"
    }
});

class ChangePasswordCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: (
                <ChangePre
                    invalid={false}
                    ChangeP={this.handleChangeP.bind(this)}
                    onUpdateUsername={this.handleChange_username.bind(this)}
                    onUpdatePassword={this.handleChange_password.bind(this)}
                    onUpdatePassword1={this.handleChange_newPassword1.bind(this)}
                    onUpdatePassword2={this.handleChange_newPassword2.bind(this)}
                />
            ),
            username: "",
            password: "",
            newPassword1: "",
            newPassword2: "",
            changed: false
        };
    }

    handleChange_username = newUsername => {
        this.setState({ username: newUsername.target.value });
    }
    handleChange_password = newPassword => {
        this.setState({ password: newPassword.target.value });
    }
    handleChange_newPassword1 = newPassword1 => {
        this.setState({ newPassword1: newPassword1.target.value });
    }
    handleChange_newPassword2 = newPassword2 => {
        this.setState({ newPassword2: newPassword2.target.value });
    }


    handleChangeP = (event) => {

        if(event !== undefined){
            event.preventDefault();
        }
        if (this.state.username.length < 1 || this.state.password.length < 1 || 
            this.state.newPassword1.length < 1 ||this.state.newPassword2.length < 1 ) {
            console.log('inside if: ', this.state);
            this.setState({
                done: (
                    <ChangePre
                        invalid={true}
                        ChangeP={this.handleChangeP.bind(this)}
                        onUpdateUsername={this.handleChange_username.bind(this)}
                        onUpdatePassword={this.handleChange_password.bind(this)}
                        onUpdatePassword1={this.handleChange_newPassword1.bind(this)}
                        onUpdatePassword2={this.handleChange_newPassword2.bind(this)}
                    />
                )
            });
        } 
        else {
            console.log(this.state);
            fetch(
                "http://ultimate-survey.herokuapp.com/changePassword",
                {
                    method: 'POST',
                    //mode: "no-cors",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        username: this.state.username,
                        password: this.state.password,
                        newPassword1: this.state.newPassword1,
                        newPassword2: this.state.newPassword2
                    }),
                    credentials: 'include'
                }
            )
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                const changed = data.message === "Reset Password Success!";
                if(changed === true){
                    this.setState({
                        done: <ChangePost/>
                    });
                }
                else{
                    alert(data.message);
                }
            });
        };
    };

    render() {
        return (
            <div className={this.props.classes.container}>
                <Card className={this.props.classes.card}>
                    <CardHeader title="Change Password" />
                    {this.state.done}
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ChangePasswordCard);