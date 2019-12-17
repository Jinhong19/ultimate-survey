
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Background from "../Media/back.jpeg";
import ChangePasswordCard from "../Components/ChangePasswordCard";

const styles = theme => ({
    background: {
        backgroundImage: "url(" + Background + ")",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    },
    container: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
});

class ChangePassword extends Component {
    render() {
        return (
            <div className={this.props.classes.background}>
                <div className={this.props.classes.container}>
                    <ChangePasswordCard />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ChangePassword);